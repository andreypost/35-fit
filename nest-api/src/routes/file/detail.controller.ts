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
import { CreateUserDetailsDto } from './dto/create.user.details.dto';

// @UseGuards(AuthGuard) // add authToken check to all this routes
@Controller('file')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('read')
  async loadUserCollection(): Promise<CreateUserDetailsDto[]> {
    return this.detailService.getStreamFile();
    // return this.detailService.loadUserCollection(req);
  }

  @Post('write')
  async addNewDetailsUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
    @Res() res: Response,
  ): Promise<CreateUserDetailsDto> {
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
  async findUserById(
    // @Param('id', ParseUUIDPipe) id: string,
    @Param('id') id: string,
  ): Promise<CreateUserDetailsDto> {
    return this.detailService.findUserById(id);
  }
}
