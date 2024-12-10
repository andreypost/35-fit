import {
  // UseGuards,
  Body,
  Controller,
  Get,
  Res,
  Param,
  // ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
// import { AuthGuard } from '../utils/auth.guard';
import { DetailService } from './detail.service';
import { UserDetails } from '../entities/user.details';
import { CreateUserDetailsDto } from '../user/dto/create-user-details.dto';

// @UseGuards(AuthGuard) // add authToken check to all this routes
@Controller('file')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('read')
  async loadUserCollection(): Promise<UserDetails[]> {
    return this.detailService.getStreamFile();
    // return this.detailService.loadUserCollection(req);
  }

  @Post('write')
  async addNewDetailsUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
    @Res() res: Response,
  ): Promise<UserDetails> {
    return this.detailService.addNewDetailsUser(createUserDetailsDto, res);
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
  // @Param('id', new ParseUUIDPipe()) id: string,
  async findUserById(@Param() params: { id: string }): Promise<UserDetails> {
    const { id } = params;
    return this.detailService.findUserById(id);
  }
}
