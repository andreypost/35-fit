import { Test, TestingModule } from '@nestjs/testing';
import { DetailsService } from './details.service';
import { InternalServerErrorException } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { IUserDetails } from '../interfaces/user';

jest.mock('fs/promises');
jest.mock('fs', () => ({
  createReadStream: jest.fn(),
}));

describe('DetailsService', () => {
  let service: DetailsService;
  let mockUserCollection: IUserDetails[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailsService],
    }).compile();

    service = module.get<DetailsService>(DetailsService);
    mockUserCollection = [
      { id: 1, name: 'User1', country: 'Country1', earnings: '$100' },
      { id: 2, name: 'User2', country: 'Country1', earnings: '$200' },
      { id: 3, name: 'User3', country: 'Country2', earnings: '$150' },
    ];
  });

  it('should load user collection', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const users = await service['loadUserCollection']();
    expect(users).toEqual(mockUserCollection);
  });

  it('should handle error when loading user collection', async () => {
    (readFile as jest.Mock).mockRejectedValue(new Error('Error loading file'));
    await expect(service['loadUserCollection']()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should save user data to file', async () => {
    service['userCollection'] = mockUserCollection;
    await service['saveUserDataToFile']();
    expect(writeFile).toHaveBeenCalledWith(
      service['filePath'],
      JSON.stringify(mockUserCollection, null, 2),
    );
  });

  it('should handle error when saving user data', async () => {
    (writeFile as jest.Mock).mockRejectedValue(new Error('Error saving file'));
    await expect(service['saveUserDataToFile']()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should add a new user', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const newUser = { name: 'User4', country: 'Country3', earnings: '$300' };
    const result = await service.addNewUser({
      id: 1,
      name: 'User1',
      country: 'Country1',
      earnings: '$100',
    });
    expect(result).toEqual({ id: 4, ...newUser });
  });

  it('should get user count by country', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const result = await service.getUserCountByCountry();
    expect(result).toEqual({ Country1: 2, Country2: 1 });
  });

  it('should get average earnings by country', async () => {
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );
    const result = await service.getAverageEarnsByCountry();
    expect(result).toEqual({ Country1: 150, Country2: 150 });
  });
});
