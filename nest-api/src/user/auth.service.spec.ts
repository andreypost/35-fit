import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { User, UserDetails } from '../entities/user';
import { CreateUserDetailsDto, CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const mockUser = {
  id: '0fff1a40-078b-4ecd-89a5-bf7bd49e4e63',
  name: 'Andrii Postoliuk',
  age: 25,
  email: 'test@email.com',
  password: 'hashedPassword',
  created_at: new Date(),
  updated_at: new Date(),
};

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

const mockUserDetailsDto = {
  id: '0fff1a40-078b-4ecd-89a5-bf7bd49e4e63',
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
  // let userRepository: Partial<jest.Mocked<Repository<User>>>;
  // let userDetailsRepository: Partial<jest.Mocked<Repository<UserDetails>>>;

  // const mockRepository = (): Partial<jest.Mocked<Repository<any>>> => ({
  //   findOne: jest.fn(),
  //   create: jest.fn(),
  //   save: jest.fn(),
  //   find: jest.fn(),
  // });

  let userRepository: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };
  let userDetailsRepository: {
    find: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
  };
  let result = null;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       AuthService,
  //       {
  //         provide: 'USER_DETAILS_REPOSITORY',
  //         useValue: mockRepository(),
  //       },
  //       {
  //         provide: 'USER_REPOSITORY',
  //         useValue: mockRepository(),
  //       },
  //       {
  //         provide: getRepositoryToken(User),
  //         useValue: mockRepository as Partial<Repository<User>>,
  //       },
  //       {
  //         provide: getRepositoryToken(UserDetails),
  //         useValue: mockRepository as Partial<Repository<User>>,
  //       },
  //     ],
  //   }).compile();

  //   authService = module.get<AuthService>(AuthService);
  //   userRepository = module.get(getRepositoryToken(User));
  //   userDetailsRepository = module.get(getRepositoryToken(UserDetails));
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'USER_DETAILS_REPOSITORY',
          useValue: mockRepository(),
        },
        {
          provide: 'USER_REPOSITORY',
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(UserDetails),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    userDetailsRepository = module.get(getRepositoryToken(UserDetails));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('authService should be defined', async () => {
    expect(authService).toBeDefined();
  });

  // it('should return an array of user details', async () => {
  //   userDetailsRepository.find.mockResolvedValue(mockUserDetails);
  //   result = await authService.findAllUserDetails();
  //   expect(result).toEqual(mockUserDetails);
  // });

  // it('should create, add and return a new user details', async () => {
  //   const createUserDetailsDto: CreateUserDetailsDto = {
  //     id: mockUserDetailsDto.id,
  //     earnings: mockUserDetailsDto.earnings,
  //     country: mockUserDetailsDto.country,
  //     name: mockUserDetailsDto.name,
  //   };

  //   userDetailsRepository.create.mockReturnValue(createUserDetailsDto);
  //   userDetailsRepository.save.mockResolvedValue(createUserDetailsDto);

  //   result = await authService.addNewUserDetails(createUserDetailsDto);

  //   expect(userDetailsRepository.create).toHaveBeenCalledWith(
  //     createUserDetailsDto,
  //   );
  //   expect(userDetailsRepository.save).toHaveBeenCalledWith(
  //     createUserDetailsDto,
  //   );
  //   expect(result).toEqual(createUserDetailsDto);
  // });

  // it('should return the count by country result', async () => {
  //   userDetailsRepository.find.mockResolvedValue(mockUserDetails);
  //   result = await authService.getUserCountByCountryDetails();

  //   expect(userDetailsRepository.find).toHaveBeenCalled();
  //   expect(result).toEqual({
  //     Ukraine: 2,
  //     Poland: 1,
  //   });
  // });

  // it('should return a user if found', async () => {
  //   userRepository.findOne.mockResolvedValue(mockUser);

  //   result = await authService.findUserByEmail('test@email');
  //   expect(result).toEqual(mockUser.email);
  // });

  // it('should return undefined if a user not found', async () => {
  //   userRepository.findOne.mockResolvedValue(undefined);

  //   result = await authService.findUserByEmail('nonexistent@email');
  //   expect(result).toBeUndefined();
  // });

  // it('create and return a new user', async () => {
  //   const createUserDto: CreateUserDto = {
  //     id: mockUser.id,
  //     name: mockUser.name,
  //     age: mockUser.age,
  //     email: mockUser.email,
  //     password: mockUser.password,
  //   };

  //   jest.spyOn(bcrypt, 'hash').mockResolvedValue(createUserDto.password);
  //   userRepository.create.mockReturnValue(mockUser);
  //   userRepository.save.mockResolvedValue(mockUser);

  //   result = await authService.createUser(createUserDto);

  //   expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
  //   expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
  //   expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
  //   expect(result).toEqual(createUserDto);
  // });

  // it('should return true if password is valid', async () => {
  //   jest.spyOn(authService, 'findUserByEmail').mockResolvedValue(mockUser);
  //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

  //   result = await authService.validateUser({
  //     email: mockUser.email,
  //     password: mockUser.password,
  //   });

  //   expect(authService.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
  //   expect(bcrypt.compare).toHaveBeenCalledWith(
  //     mockUser.password,
  //     'hashedPassword',
  //   );
  //   expect(result).toBe(true);
  // });

  // it('should return false if password is invalid', async () => {
  //   jest.spyOn(authService, 'findUserByEmail').mockResolvedValue(mockUser);
  //   jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

  //   result = await authService.validateUser({
  //     email: mockUser.email,
  //     password: mockUser.password,
  //   });

  //   expect(authService.findUserByEmail).toHaveBeenCalledWith(mockUser.email);
  //   expect(bcrypt.compare).toHaveBeenCalledWith(
  //     mockUser.password,
  //     'hashedPassword',
  //   );
  //   expect(result).toBe(false);
  // });
});
