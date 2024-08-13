import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DetailService } from './detail.service';
import { UserDetails } from '../entities/user.details';
import { CreateUserDetailsDto } from './dto/create-user-details.dto';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('users')
  async loadUserCollection(): Promise<UserDetails[]> {
    return this.detailService.loadUserCollection();
  }

  @Post('add-new-user')
  async addNewUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<UserDetails> {
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
  async findUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDetails> {
    return this.detailService.findUserById(id);
  }
}
