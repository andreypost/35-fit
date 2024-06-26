import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from './detail.service';
import { InternalServerErrorException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { IUserDetails } from '../interfaces/user';
import { CreateUserDetailsDto } from './dto/create-user.dto';

jest.mock('fs/promises');

describe('DetailsService', () => {
  let service: DetailService;
  let mockUserCollection: IUserDetails[];
  let newUserDetailsDto: CreateUserDetailsDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailService],
    }).compile();

    service = module.get<DetailService>(DetailService);
    mockUserCollection = [
      { id: 'uuid1', name: 'User1', country: 'Country1', earnings: '$100' },
      { id: 'uuid2', name: 'User2', country: 'Country1', earnings: '$200' },
      { id: 'uuid3', name: 'User3', country: 'Country2', earnings: '$150' },
    ];
    newUserDetailsDto = {
      id: 'uuid1',
      name: 'User1',
      country: 'Country1',
      earnings: '$100',
    };
  });

  it('should load user collection', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
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
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );

    const result = await service.addNewUser(newUserDetailsDto);
    expect(result).toEqual(newUserDetailsDto);
    expect(writeFile).toHaveBeenCalledWith(
      service['filePath'],
      JSON.stringify([...mockUserCollection, newUserDetailsDto], null, 2),
    );
  });

  it('should handle error when saving user data', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    (writeFile as jest.Mock).mockRejectedValue(new Error('Error saving file'));

    await expect(service.addNewUser(newUserDetailsDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should get user count by country', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const result = await service.getUsersCountByCountry();
    expect(result).toEqual({ Country1: 2, Country2: 1 });
  });

  it('should get average earnings by country', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const result = await service.getAverageEarningsByCountry();
    expect(result).toEqual({ Country1: 150, Country2: 150 });
  });

  it('should find one user by uuid id', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const userName = await service.findOneById('uuid1');
    expect(userName).toEqual(newUserDetailsDto);
    const userNameNotFound = await service.findOneById('uuid999');
    expect(userNameNotFound).toEqual('User with id uuid999 not found.');
  });
});
