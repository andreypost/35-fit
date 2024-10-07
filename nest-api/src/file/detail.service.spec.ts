import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from './detail.service';
import { readFile, writeFile } from 'fs/promises';
import { UserDetails } from '../entities/user.details';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { validateOrReject } from 'class-validator';
import { CreateUserDetailsDto } from 'src/user/dto/create-user-details.dto';
import { AuthService } from '../user/auth.service';

jest.mock('fs/promises');
jest.mock('uuid');
jest.mock('class-validator');

describe('DetailService', () => {
  let detailService: DetailService;
  let authService: AuthService;
  let res: any;

  const mockResponse = () => {
    const res = {} as any;
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [DetailService],
    // }).compile();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DetailService,
        {
          provide: AuthService,
          useValue: {
            validateAuthToken: jest.fn(),
          },
        },
      ],
    }).compile();

    detailService = module.get<DetailService>(DetailService);
    authService = module.get<AuthService>(AuthService);
    res = mockResponse();
  });

  const mockUserCollection: UserDetails[] = [
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

  const mockUuidId: string = '07deaa69-33e4-4685-88ed-6d2b0ddc59e7';
  (uuidv4 as jest.Mock).mockReturnValue(mockUuidId);

  const createUserDetailsDto: CreateUserDetailsDto = {
    id: mockUuidId,
    earnings: '$5700',
    country: 'United Kingdom',
    name: 'Andrii Postoliuk',
  };

  // it('should load data from user collection file', async () => {
  //   mockReadFile();

  //   expect(await detailService.loadUserCollection(res)).toEqual(
  //     mockUserCollection,
  //   );
  // });

  it('should throw InternalServerErrorException when loading data from user collection file', async () => {
    (readFile as jest.Mock).mockRejectedValue(
      new Error('Failed to load data from "user-collection.json" file.'),
    );

    await expect(detailService.loadUserCollection(res)).rejects.toThrow(
      InternalServerErrorException,
    );
  });

  it('should throw BadRequestException if user data is malformed', async () => {
    const malformedUserDetailsDto: any = { country: 'Ukraine' };

    (validateOrReject as jest.Mock).mockRejectedValue(
      new Error('User data is malformed.'),
    );

    await expect(
      detailService.addNewUser(res, malformedUserDetailsDto),
    ).rejects.toThrow(BadRequestException);
  });

  // it('should create and add new user detail to user-collection file', async () => {
  //   mockReadFile();

  //   expect(await detailService.addNewUser(res, createUserDetailsDto)).toEqual(
  //     createUserDetailsDto,
  //   );

  //   expect(writeFile).toHaveBeenCalledWith(
  //     detailService['filePath'],
  //     JSON.stringify([...mockUserCollection, createUserDetailsDto], null, 2),
  //   );
  // });

  // it('should return users count and average earnings by country', async () => {
  //   mockReadFile();

  //   expect(await detailService.getUsersCountByCountry(res)).toEqual({
  //     Chile: 1,
  //     Ukraine: 1,
  //     'United Kingdom': 1,
  //   });

  //   expect(await detailService.getAverageEarningsByCountry(res)).toEqual({
  //     Chile: 5900,
  //     Ukraine: 5800,
  //     'United Kingdom': 5700,
  //   });
  // });

  // it('should find user by ID', async () => {
  //   mockReadFile();

  //   expect(await detailService.findUserById(res, mockUuidId)).toEqual(
  //     createUserDetailsDto,
  //   );

  //   await expect(detailService.findUserById(res, 'uuid999')).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });
});
