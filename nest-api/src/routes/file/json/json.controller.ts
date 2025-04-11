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
import { JsonService } from './json.service';
import {
  CreateUserJsonDto,
  IdParamStringDto,
} from '../dto/create.user.json.dto';
import { Public } from '../../../guards/public.routes';

// @UseGuards(AuthGuard) // add authToken check to all this routes
@Public()
@Controller('file/json')
export class JsonController {
  constructor(private readonly jsonService: JsonService) {}

  @Get('read')
  @ApiOperation({ summary: 'file/json/read' })
  async loadUserCollection(): Promise<CreateUserJsonDto[]> {
    return await this.jsonService.loadUserCollection(false);
  }

  @Throttle({ default: { ttl: 600_000, limit: 200, blockDuration: 600_000 } })
  @Post('write')
  @ApiOperation({ summary: 'file/json/write' })
  async addNewDetailsUser(
    @Body() createUserDetailsDto: CreateUserJsonDto,
  ): Promise<CreateUserJsonDto | void> {
    return await this.jsonService.addNewDetailsUser(createUserDetailsDto);
  }

  @Get('count-by-country')
  @ApiOperation({ summary: 'file/json/count-by-country' })
  async getUsersCountByCountry(): Promise<Record<string, number>> {
    return await this.jsonService.getUsersCountByCountry();
  }

  @Get('average-earnings-by-country')
  @ApiOperation({ summary: 'file/json/average-earnings-by-country' })
  async getAverageEarningsByCountry(): Promise<Record<string, number>> {
    return await this.jsonService.getAverageEarningsByCountry();
  }

  @Get('users/:id')
  @ApiOperation({ summary: 'file/json/users/:id' })
  async findUserById(
    @Param() { id }: IdParamStringDto,
  ): Promise<CreateUserJsonDto> {
    return await this.jsonService.findUserById(id);
  }
}
