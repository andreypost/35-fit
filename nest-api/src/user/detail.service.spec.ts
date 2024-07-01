import { IUserDetails } from 'src/interfaces/user';
import { DetailService } from './detail.service';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { readFile, writeFile } from 'fs/promises';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validateOrReject } from 'class-validator';

jest.mock('fs/promises');
jest.mock('uuid');
jest.mock('class-validator');

describe('DetailService', () => {
  let detailService: DetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailService],
    }).compile();

    detailService = module.get<DetailService>(DetailService);
  });

  const mockUserCollection: IUserDetails[] = [
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

  const mockReadFile = () =>
    (readFile as jest.Mock).mockResolvedValue(
      JSON.stringify(mockUserCollection),
    );

  const createUserDetailsDto: CreateUserDetailsDto = {
    earnings: '$6300',
    country: 'Ukraine',
    name: 'Andrii Postoliuk',
  };

  const mockUuidId = '0fff1a40-078b-4ecd-89a5-bf7bd49e4e63';
  (uuidv4 as jest.Mock).mockReturnValue(mockUuidId);

  const createUserDetailsDtoId = { id: mockUuidId, ...createUserDetailsDto };

  it('should load data from user collection file', async () => {
    mockReadFile();

    expect(await detailService.loadUserCollection()).toEqual(
      mockUserCollection,
    );
  });

  it('should throw InternalServerErrorException when loading data from user collection file', async () => {
    (readFile as jest.Mock).mockRejectedValue(
      new Error('Failed to load data from "user-collection.json" file.'),
    );

    await expect(detailService.loadUserCollection()).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should create and save new user data to user collection file', async () => {
    mockReadFile();

    expect(await detailService.addNewUser(createUserDetailsDtoId)).toEqual(
      createUserDetailsDtoId,
    );

    expect(writeFile).toHaveBeenCalledWith(
      detailService['filePath'],
      JSON.stringify([...mockUserCollection, createUserDetailsDtoId], null, 2),
    );
  });

  it('should throw BadRequestException if user data is malformed', async () => {
    const malformedUserDetailsDto: any = { country: 'Ukraine' };

    (validateOrReject as jest.Mock).mockRejectedValue(
      new Error('User data is malformed.'),
    );

    await expect(
      detailService.addNewUser(malformedUserDetailsDto),
    ).rejects.toThrow(BadRequestException);
  });

  it('should get users count by country', async () => {
    mockReadFile();

    expect(await detailService.getUsersCountByCountry()).toEqual({
      Ukraine: 2,
      Poland: 1,
    });
  });

  it('should get average earnings by country', async () => {
    mockReadFile();

    expect(await detailService.getAverageEarningsByCountry()).toEqual({
      Ukraine: 6400,
      Poland: 6400,
    });
  });

  it('should find user by ID', async () => {
    mockReadFile();

    expect(await detailService.findUserById(mockUuidId)).toEqual(
      createUserDetailsDtoId,
    );

    await expect(detailService.findUserById('uuid999')).rejects.toThrow(
      NotFoundException,
    );
  });
});
