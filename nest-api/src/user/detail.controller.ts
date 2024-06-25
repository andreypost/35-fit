import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { DetailService } from './detail.service';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from 'src/interfaces/user';

@Controller('detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('users')
  async getUserDetails(@Res() res): Promise<IUserDetails[]> {
    return this.detailService.getUserDetails(res);
  }

  @Post('add-new-user')
  async addNewUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<void> {
    if (!createUserDetailsDto) {
      throw new BadRequestException('Invalid user data');
    }
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
  async findOneById(@Param('id') id: number): Promise<string> {
    return this.detailService.findOneById(id);
  }
}
