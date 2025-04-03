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
import { ApiOperation } from '@nestjs/swagger';
// import { AuthGuard } from '../utils/auth.guard';
import { DetailService } from './detail.service';
import { CreateUserDetailsDto } from './dto/create.user.details.dto';
import { Public } from '../../guards/public.routes';
import { Throttle } from '@nestjs/throttler';

// @UseGuards(AuthGuard) // add authToken check to all this routes
@Public()
@Controller('file')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('read')
  @ApiOperation({ summary: 'read' })
  async loadUserCollection(): Promise<CreateUserDetailsDto[]> {
    return await this.detailService.getStreamFile();
    // return this.detailService.loadUserCollection(req);
  }

  @Throttle({ default: { ttl: 600_000, limit: 200, blockDuration: 600_000 } })
  @Post('write')
  @ApiOperation({ summary: 'write' })
  async addNewDetailsUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
    @Res() res: Response,
  ): Promise<CreateUserDetailsDto> {
    return await this.detailService.addNewDetailsUser(
      createUserDetailsDto,
      res,
    );
  }

  @Get('count-by-country')
  @ApiOperation({ summary: 'count-by-country' })
  async getUsersCountByCountry(): Promise<Record<string, number>> {
    return await this.detailService.getUsersCountByCountry();
  }

  @Get('average-earnings-by-country')
  @ApiOperation({ summary: 'average-earnings-by-country' })
  async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    return await this.detailService.getAverageEarningsByCountry();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'users/:id' })
  async findUserById(
    // @Param('id', ParseUUIDPipe) id: string,
    @Param('id') id: string,
  ): Promise<CreateUserDetailsDto> {
    return await this.detailService.findUserById(id);
  }
}
