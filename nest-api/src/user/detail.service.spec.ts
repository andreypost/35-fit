import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from './detail.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { IUserDetails } from '../interfaces/user';
import { CreateUserDetailsDto } from './dto/create-user.dto';

jest.mock('fs/promises');
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));

describe('DetailService', () => {
  let service: DetailService;
  let mockUserCollection: IUserDetails[];
  let newUserDetailsDto: CreateUserDetailsDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailService],
    }).compile();

    service = module.get<DetailService>(DetailService);

    mockUserCollection = [
      { id: 'mock-uuid', name: 'User1', country: 'Country1', earnings: '$100' },
      { id: 'mock-uuid', name: 'User2', country: 'Country1', earnings: '$200' },
      { id: 'mock-uuid', name: 'User3', country: 'Country2', earnings: '$150' },
    ];
    newUserDetailsDto = {
      id: 'mock-uuid',
      name: 'User1',
      country: 'Country1',
      earnings: '$100',
    };
  });

  const mockReadFile = () =>
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );

  it('should load user collection', async () => {
    mockReadFile();
    const users = await service.loadUserCollection();
    expect(users).toEqual(mockUserCollection);
  });

  it('should handle error when loading user collection', async () => {
    (readFile as jest.Mock).mockRejectedValue(new Error('Error loading file'));
    await expect(service.loadUserCollection()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should save user data to file when adding a new user', async () => {
    mockReadFile();

    const expectedNewUser = { ...newUserDetailsDto, id: 'mock-uuid' };

    const result = await service.addNewUser(newUserDetailsDto);
    expect(result).toEqual(expectedNewUser);
    expect(writeFile).toHaveBeenCalledWith(
      service['filePath'],
      JSON.stringify([...mockUserCollection, expectedNewUser], null, 2),
    );
  });

  it('should handle error when saving user data', async () => {
    mockReadFile();
    (writeFile as jest.Mock).mockRejectedValue(new Error('Error saving file'));
    await expect(service.addNewUser(newUserDetailsDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should get user count by country', async () => {
    mockReadFile();
    const result = await service.getUsersCountByCountry();
    expect(result).toEqual({ Country1: 2, Country2: 1 });
  });

  it('should get average earnings by country', async () => {
    mockReadFile();
    const result = await service.getAverageEarningsByCountry();
    expect(result).toEqual({ Country1: 150, Country2: 150 });
  });

  it('should find one user by uuid id', async () => {
    mockReadFile();
    const user = await service.findUserById('mock-uuid');
    expect(user).toEqual(newUserDetailsDto);
    await expect(service.findUserById('uuid999')).rejects.toThrow(
      NotFoundException,
    );
  });
});
