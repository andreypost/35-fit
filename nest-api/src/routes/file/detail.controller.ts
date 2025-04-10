import {
  // UseGuards,
  Body,
  Controller,
  Get,
  Param,
  // ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
// import { AuthGuard } from '../utils/auth.guard';
import { DetailService } from './detail.service';
import {
  CreateUserDetailsDto,
  IdParamStringDto,
} from './dto/create.user.details.dto';
import { Public } from '../../guards/public.routes';

// @UseGuards(AuthGuard) // add authToken check to all this routes
@Public()
@Controller('file')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('read')
  @ApiOperation({ summary: 'read' })
  async loadUserCollection(): Promise<CreateUserDetailsDto[]> {
    return await this.detailService.loadUserCollection(false);
  }

  @Throttle({ default: { ttl: 600_000, limit: 200, blockDuration: 600_000 } })
  @Post('write')
  @ApiOperation({ summary: 'write' })
  async addNewDetailsUser(
    @Body() createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<CreateUserDetailsDto | void> {
    return await this.detailService.addNewDetailsUser(createUserDetailsDto);
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
    @Param() { id }: IdParamStringDto,
  ): Promise<CreateUserDetailsDto> {
    return await this.detailService.findUserById(id);
  }
}
