import { IUserDetails } from 'src/interfaces/user';
import { DetailService } from './detail.service';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { readFile, writeFile } from 'fs/promises';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';

jest.mock('fs/promises');
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid'),
}));
jest.mock('class-validator');

describe('DetailService', () => {
  let service: DetailService;
  let mockUserCollection: IUserDetails[];
  let createUserDetailsDto: CreateUserDetailsDto;

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

    createUserDetailsDto = {
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
    expect(await service.loadUserCollection()).toEqual(mockUserCollection);
  });

  it('should handle error when loading user collection', async () => {
    (readFile as jest.Mock).mockRejectedValue(new Error('Error loading file'));
    await expect(service.loadUserCollection()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should save new user to user collection', async () => {
    mockReadFile();
    expect(await service.addNewUser(createUserDetailsDto)).toEqual(
      createUserDetailsDto,
    );
    expect(writeFile).toHaveBeenCalledWith(
      service['filePath'],
      JSON.stringify([...mockUserCollection, createUserDetailsDto], null, 2),
    );
  });

  it('should throw InternalServerErrorException when user data is malformed', async () => {
    mockReadFile();

    const malformedUserDetailsDto: any = { country: 'Country3' };

    (validateOrReject as jest.Mock).mockImplementation(() => {
      throw new InternalServerErrorException('Validation failed');
    });
    await expect(service.addNewUser(malformedUserDetailsDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should get users count by country', async () => {
    mockReadFile();
    expect(await service.getUsersCountByCountry()).toEqual({
      Country1: 2,
      Country2: 1,
    });
  });

  it('should get average earnings by country', async () => {
    mockReadFile();
    expect(await service.getAverageEarningsByCountry()).toEqual({
      Country1: 150,
      Country2: 150,
    });
  });

  it('should find user by ID', async () => {
    mockReadFile();
    expect(await service.findUserById('mock-uuid')).toEqual(
      createUserDetailsDto,
    );

    await expect(service.findUserById('uuid999')).rejects.toThrow(
      NotFoundException,
    );
  });
});
