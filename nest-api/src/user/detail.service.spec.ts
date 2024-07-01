import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from './detail.service';
import { readFile, writeFile } from 'fs/promises';
import { IUserDetails } from 'src/interfaces/user';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { validateOrReject } from 'class-validator';

jest.mock('fs/promises');
jest.mock('uuid');
jest.mock('class-validator');

describe('DetailService', () => {
  let detailService: DetailService;

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailService],
    }).compile();

    detailService = module.get<DetailService>(DetailService);
  });

  const mockUserCollection: IUserDetails[] = [
    {
      id: '07deaa69-33e4-4685-88ed-6d2b0ddc59e7',
      earnings: '$5700',
      country: 'United Kingdom',
      name: 'Andrii Postoliuk',
    },
    {
      id: 'fa19b672-2970-416c-8666-02151d77c4a6',
      earnings: '$5800',
      country: 'Ukraine',
      name: 'Andrii Postoliuk',
    },
    {
      id: '22767d9c-e3a5-4fc7-ba79-5e08fcbc8069',
      earnings: '$5900',
      country: 'Chile',
      name: 'Andrii Postoliuk',
    },
  ];

  const mockReadFile = () =>
    (readFile as jest.Mock).mockReturnValue(JSON.stringify(mockUserCollection));

  const createUserDetailsDto: CreateUserDetailsDto = {
    earnings: '$5700',
    country: 'United Kingdom',
    name: 'Andrii Postoliuk',
  };

  const mockUuidId: string = '07deaa69-33e4-4685-88ed-6d2b0ddc59e7';
  (uuidv4 as jest.Mock).mockReturnValue(mockUuidId);

  const createUserDetailsDtoId = {
    id: mockUuidId,
    ...createUserDetailsDto,
  };

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

  it('should throw BadRequestException if user data is malformed', async () => {
    const malformedUserDetailsDto: any = { country: 'Ukraine' };

    (validateOrReject as jest.Mock).mockRejectedValue(
      new Error('User data is malformed.'),
    );

    await expect(
      detailService.addNewUser(malformedUserDetailsDto),
    ).rejects.toThrow(BadRequestException);
  });

  it('should create and add new user detail to user-collection file', async () => {
    mockReadFile();

    expect(await detailService.addNewUser(createUserDetailsDtoId)).toEqual(
      createUserDetailsDtoId,
    );

    expect(writeFile).toHaveBeenCalledWith(
      detailService['filePath'],
      JSON.stringify([...mockUserCollection, createUserDetailsDtoId], null, 2),
    );
  });

  it('should return users count and average earnings by country', async () => {
    mockReadFile();

    expect(await detailService.getUsersCountByCountry()).toEqual({
      Chile: 1,
      Ukraine: 1,
      'United Kingdom': 1,
    });

    expect(await detailService.getAverageEarningsByCountry()).toEqual({
      Chile: 5900,
      Ukraine: 5800,
      'United Kingdom': 5700,
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
