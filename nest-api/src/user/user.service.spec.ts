import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const mockUserData = {
  id: 1,
  email: 'test@email',
  password: 'hashedPassword',
};

const mockUserRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;
  let result = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findUserByEmail', () => {
    it('should return a user if found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(mockUserData.email);

      result = await service.findUserByEmail('test@email');
      expect(result).toEqual(mockUserData.email);
    });

    it('should return undefined if a user not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(undefined);

      result = await service.findUserByEmail(undefined);
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: mockUserData.email,
        password: mockUserData.password,
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(createUserDto.password);
      (repository.create as jest.Mock).mockReturnValue(createUserDto);
      (repository.save as jest.Mock).mockResolvedValue(createUserDto);

      result = await service.createUser(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);

      expect(repository.create).toHaveBeenCalledWith(createUserDto);

      expect(repository.save).toHaveBeenCalledWith(createUserDto);

      expect(result).toEqual(createUserDto);
    });
  });

  describe('validateUser', () => {
    it('return true if password is valid', async () => {
      jest.spyOn(service, 'findUserByEmail').mockResolvedValue(mockUserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      result = await service.validateUser({
        email: mockUserData.email,
        password: mockUserData.password,
      });

      expect(service.findUserByEmail).toHaveBeenCalledWith(mockUserData.email);

      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockUserData.password,
        'hashedPassword',
      );

      expect(result).toBe(true);
    });

    it('should return false if password is invakid', async () => {
      jest.spyOn(service, 'findUserByEmail').mockResolvedValue(mockUserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      result = await service.validateUser({
        email: mockUserData.email,
        password: mockUserData.password,
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'hashedPassword',
        mockUserData.password,
      );

      expect(service.findUserByEmail).toHaveBeenCalledWith(mockUserData.email);

      expect(result).toEqual(false);
    });
  });
});
