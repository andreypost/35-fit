import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

const mockUser = {
  id: undefined,
  name: 'Andrii',
  surname: 'Postoliuk',
  gender: 'nonBinary',
  age: 25,
  country: 'Ukraine',
  city: 'Kyiv',
  email: 'test@email.com',
  password: 'hashedPassword',
  phone: '1234567890',
  emergencyName: '',
  emergencyPhone: '',
  created_at: new Date(),
  updated_at: new Date(),
  hashPassword: jest.fn().mockResolvedValue(Promise.resolve()),
  checkPassword: jest.fn().mockResolvedValue(true),
};

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let result = null;
  let res: any;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    verify: jest.fn().mockReturnValue({}),
  };

  const mockResponse = () => {
    const res = {} as any;
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: 'USER_REPOSITORY',
          useExisting: getRepositoryToken(User),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('authService should be defined', async () => {
    expect(authService).toBeDefined();
  });

  // it('should return a user if found', async () => {
  //   jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

  //   result = await authService.findUserByEmail('test@email');
  //   expect(result).toEqual(mockUser);
  // });

  // it('should return undefined if a user not found', async () => {
  //   jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

  //   result = await authService.findUserByEmail('nonexistent@email');
  //   expect(result).toBeUndefined();
  // });

  it('create and return a new user', async () => {
    const hashedPassword: string =
      '$2b$10$jk.fioHt2nkg37hOD6nUtelKvq5nfoVn3je2xFSyIQqu5qPq/tCfO';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

    const createUserDto: CreateUserDto = { ...mockUser };

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      ...mockUser,
      password: hashedPassword,
    });

    result = await authService.createNewUser(createUserDto, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);

    expect(userRepository.save).toHaveBeenCalledWith({
      ...mockUser,
      password: hashedPassword,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully!',
    });
  });

  /*   it('should return true if password is valid', async () => {
    jest.spyOn(authService, 'findUserByEmail').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    // result = await authService.validateUser(mockUser);

    expect(authService.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockUser.password,
      'hashedPassword',
    );
    expect(result).toBe(true);
  });

  it('should return false if password is invalid', async () => {
    jest.spyOn(authService, 'findUserByEmail').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

    // result = await authService.validateUser(mockUser);

    expect(authService.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockUser.password,
      'hashedPassword',
    );
    expect(result).toBe(false);
  }); */
});
