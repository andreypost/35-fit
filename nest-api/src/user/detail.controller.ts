import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DetailService } from './detail.service';
import { IUserDetails } from 'src/interfaces/user';
import { CreateUserDetailsDto } from './dto/create-user.dto';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('users')
  async loadUserCollection(): Promise<IUserDetails[]> {
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
  async findUserById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IUserDetails> {
    return this.detailService.findUserById(id);
  }
}
