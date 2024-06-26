import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DetailService } from './detail.service';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from 'src/interfaces/user';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('users')
  async getUserDetails(): Promise<IUserDetails[]> {
    return this.detailService.loadUserCollection();
  }

  @Post('add-new-user')
  async addNewUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<IUserDetails> {
    return this.detailService.addNewUser(createUserDetailsDto);
  }

  @Get('count-by-country')
  async getUsersCountByCountry(): Promise<Record<string, number>> {
    return this.detailService.getUsersCountByCountry();
  }

  @Get('average-earnings-by-country')
  async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    return this.detailService.getAverageEarningsByCountry();
  }

  @Get('users/:id')
  async findOneById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IUserDetails | string> {
    return this.detailService.findOneById(id);
  }
}
