import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { UserDetails } from '../entities/user.details';
import { User } from '../entities/user';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';

const mockUserDetails = [
  {
    id: '0fff1a40-078b-4ecd-89a5-bf7bd49e4e63',
    earnings: '$6300',
    country: 'Ukraine',
    name: 'Andrii Postoliuk',
  },
  {
    id: '32838264-888a-49df-b15a-39386b7dc107',
    earnings: '$6400',
    country: 'Poland',
    name: 'Andrii Postoliuk',
  },
  {
    id: '39b4e5d5-5b94-4f1e-839e-d8a831320042',
    earnings: '$6500',
    country: 'Ukraine',
    name: 'Andrii Postoliuk',
  },
];

const mockUser = {
  id: undefined,
  name: 'Andrii Postoliuk',
  age: 25,
  email: 'test@email.com',
  password: 'hashedPassword',
  created_at: new Date(),
  updated_at: new Date(),
};

const mockUserDetailsDto = {
  id: undefined,
  earnings: '$6300',
  country: 'Chile',
  name: 'Andrii Postoliuk',
};

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userDetailsRepository: Repository<UserDetails>;
  let userRepository: Repository<User>;
  let result = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserDetails),
          useValue: mockRepository(),
        },
        {
          provide: 'USER_DETAILS_REPOSITORY',
          useExisting: getRepositoryToken(UserDetails),
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: 'USER_REPOSITORY',
          useExisting: getRepositoryToken(User),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userDetailsRepository = module.get<Repository<UserDetails>>(
      getRepositoryToken(UserDetails),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('authService should be defined', async () => {
    expect(authService).toBeDefined();
  });

  it('should return an array of user details', async () => {
    jest
      .spyOn(userDetailsRepository, 'find')
      .mockResolvedValue(mockUserDetails);

    result = await authService.findAllUserDetails();
    expect(result).toEqual(mockUserDetails);
  });

  it('should create, add and return a new user details', async () => {
    const createUserDetailsDto: CreateUserDetailsDto = {
      id: mockUserDetailsDto.id,
      earnings: mockUserDetailsDto.earnings,
      country: mockUserDetailsDto.country,
      name: mockUserDetailsDto.name,
    };

    jest
      .spyOn(userDetailsRepository, 'create')
      .mockReturnValue(createUserDetailsDto);
    jest
      .spyOn(userDetailsRepository, 'save')
      .mockResolvedValue(createUserDetailsDto);

    result = await authService.addNewUserDetails(createUserDetailsDto);

    expect(userDetailsRepository.create).toHaveBeenCalledWith(
      createUserDetailsDto,
    );
    expect(userDetailsRepository.save).toHaveBeenCalledWith(
      createUserDetailsDto,
    );
    expect(result).toEqual(createUserDetailsDto);
  });

  it('should return the count by country result', async () => {
    jest
      .spyOn(userDetailsRepository, 'find')
      .mockResolvedValue(mockUserDetails);

    result = await authService.getUserCountByCountryDetails();

    expect(userDetailsRepository.find).toHaveBeenCalled();
    expect(result).toEqual({
      Ukraine: 2,
      Poland: 1,
    });
  });

  it('should return a user if found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

    result = await authService.findUserByEmail('test@email');
    expect(result).toEqual(mockUser);
  });

  it('should return undefined if a user not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    result = await authService.findUserByEmail('nonexistent@email');
    expect(result).toBeUndefined();
  });

  it('create and return a new user', async () => {
    const hashedPassword: string =
      '$2b$10$jk.fioHt2nkg37hOD6nUtelKvq5nfoVn3je2xFSyIQqu5qPq/tCfO';

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

    const createUserDto: CreateUserDto = {
      id: mockUser.id,
      name: mockUser.name,
      age: mockUser.age,
      email: mockUser.email,
      password: mockUser.password,
    };

    jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue({
      ...mockUser,
      password: hashedPassword,
    });

    result = await authService.createUser(createUserDto);

    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);

    expect(userRepository.create).toHaveBeenCalledWith({
      ...createUserDto,
      password: hashedPassword,
    });
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);

    expect(result).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('should return true if password is valid', async () => {
    jest.spyOn(authService, 'findUserByEmail').mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    result = await authService.validateUser(mockUser);

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

    result = await authService.validateUser(mockUser);

    expect(authService.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockUser.password,
      'hashedPassword',
    );
    expect(result).toBe(false);
  });
});
