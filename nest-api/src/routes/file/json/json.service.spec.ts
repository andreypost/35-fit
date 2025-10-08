import {
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { Request } from 'express';
import { JsonService } from './json.service';
import { msg } from '../../../constants/messages';
import { validateAuthToken } from '../../../guards/auth.token';
import { nextError } from '../../../utils/handle.error';
import { CreateUserDetailsDto } from './dto/json.dto';
// import { Test, TestingModule } from '@nestjs/testing';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('../utils/validate.token');
jest.mock('../helpers/next.error');

// jest.mock('../utils/validate.token', () => ({
//   validateAuthToken: jest.fn(),
// }));

// jest.mock('../helpers/next.error', () => ({
//   nextError: jest.fn(),
// }));

describe('DetailService', () => {
  let detailService: JsonService;
  // const path = '../../../../jsonData/user-collection.json';

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [DetailService],
    // }).compile();
    // detailService = module.get<DetailService>(DetailService);
    detailService = new JsonService();
    // (detailService as any).filePath = path;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate auth token and throw InternalServerErrorException if file does not exist', async () => {
    const req: Partial<Request> = { cookies: { authToken: 'valid-token' } };

    (validateAuthToken as jest.Mock).mockResolvedValueOnce(true);

    (existsSync as jest.Mock).mockReturnValueOnce(false);

    (nextError as unknown as jest.Mock).mockImplementation((error: any) => {
      throw error;
    });

    await expect(detailService.getStreamFile(req as Request)).rejects.toThrow(
      new InternalServerErrorException(
        detailService['filePath'],
        msg.FILE_DOES_NOT_EXIST,
      ),
    );

    expect(validateAuthToken).toHaveBeenCalledWith(req.cookies.authToken);
    expect(existsSync).toHaveBeenCalledWith(detailService['filePath']);
    expect(nextError).toHaveBeenCalled();
  });

  it('should return user collection if file exists', async () => {
    const req: Partial<Request> = { cookies: { authToken: 'valid-token' } };
    const mockUserCollection: CreateUserDetailsDto[] = [
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

    (validateAuthToken as jest.Mock).mockResolvedValueOnce(true);

    (existsSync as jest.Mock).mockReturnValueOnce(true);

    (readFile as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(mockUserCollection),
    );

    const result = await detailService.getStreamFile(req as Request);

    expect(result).toEqual(mockUserCollection);
    expect(validateAuthToken).toHaveBeenCalledWith(req.cookies.authToken);
    expect(readFile).toHaveBeenCalledWith(detailService['filePath'], 'utf8');
  });

  it('should call nextError on any exception thrown during execution', async () => {
    const req: Partial<Request> = { cookies: { authToken: 'valid-token' } };
    const mockError = new ServiceUnavailableException(msg.UNEXPECTED_ERROR);

    (validateAuthToken as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(detailService.getStreamFile(req as Request)).rejects.toThrow(
      mockError,
    );

    expect(nextError).toHaveBeenCalledWith(mockError);
  });
});

/*
import { Test, TestingModule } from '@nestjs/testing';
import { DetailService } from './detail.service';
import { readFile, writeFile } from 'fs/promises';
import { UserDetails } from '../entities/user.details';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateOrReject } from 'class-validator';
import { CreateUserDetailsDto } from '../user/dto/create-user-details.dto';
import { AuthService } from '../user/auth.service';
import { msg } from '../constants/messages';

jest.mock('fs/promises');
jest.mock('uuid');
jest.mock('class-validator');

describe('DetailService', () => {
  let detailService: DetailService;
  let authService: AuthService;
  let req: any;
  let res: any;

  const mockRequest = () => {
    const req = {} as any;
    return req;
  };

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
    req = mockRequest();
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

  it('should throw an InternalServerErrorException if file does not exist', async () => {
    const req: Partial<Request> = { cookies: { authToken: 'valid-token' } };

    // (readFile as jest.Mock).mockRejectedValue(
    //   new Error('Failed to load data from "user-collection.json" file.'),
    // );

    // await expect(detailService.loadUserCollection(res)).rejects.toThrow(
    //   InternalServerErrorException,
    // );
  });

  // it('should throw BadRequestException if user data is malformed', async () => {
  //   const malformedUserDetailsDto: any = { country: 'Ukraine' };

  //   (validateOrReject as jest.Mock).mockRejectedValue(
  //     new Error('User data is malformed.'),
  //   );

  //   await expect(
  //     detailService.addNewDetailsUser(req, malformedUserDetailsDto, res),
  //   ).rejects.toThrow(BadRequestException);
  // });

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
*/
