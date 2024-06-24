import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { DetailsService } from './details.service';
import { CreateUserDetailsDto } from './dto/create-user.dto';
import { IUserDetails } from 'src/interfaces/user';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get('users')
  async getUserDetails(@Res() res): Promise<IUserDetails[]> {
    return this.detailsService.getUserDetails(res);
  }

  @Post('add-new-user')
  async addNewUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<IUserDetails> {
    if (!createUserDetailsDto) {
      throw new BadRequestException('Invalid user data');
    }
    return this.detailsService.addNewUser(createUserDetailsDto);
  }

  @Get('count-by-country')
  async getUserCountByCountry(): Promise<Record<string, number>> {
    return this.detailsService.getUserCountByCountry();
  }

  @Get('average-earnings-by-country')
  async getAverageEarnsByCountry(): Promise<Record<string, number>> {
    return this.detailsService.getAverageEarnsByCountry();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<string> {
    return this.detailsService.findOneById(id);
  }
}
