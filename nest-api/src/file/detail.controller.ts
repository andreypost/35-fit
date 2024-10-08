import {
  Body,
  Controller,
  Get,
  Req,
  Res,
  Param,
  // ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DetailService } from './detail.service';
import { UserDetails } from '../entities/user.details';
import { CreateUserDetailsDto } from '../user/dto/create-user-details.dto';

@Controller('file')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('read')
  async loadUserCollection(@Req() req: Request): Promise<UserDetails[]> {
    return this.detailService.loadUserCollection(req);
  }

  @Post('write')
  async addNewDetailsUser(
    @Req() req: Request,
    @Body() createUserDetailsDto: CreateUserDetailsDto,
    @Res() res: Response,
  ): Promise<UserDetails> {
    return this.detailService.addNewDetailsUser(req, createUserDetailsDto, res);
  }

  @Get('count-by-country')
  async getUsersCountByCountry(
    @Req() req: Request,
  ): Promise<Record<string, number>> {
    return this.detailService.getUsersCountByCountry(req);
  }

  @Get('average-earnings-by-country')
  async getAverageEarningsByCountry(
    @Req() req: Request,
  ): Promise<Record<string, number>> {
    return this.detailService.getAverageEarningsByCountry(req);
  }

  @Get('users/:id')
  // @Param('id', new ParseUUIDPipe()) id: string,
  async findUserById(
    @Req() req: Request,
    @Param() params: { id: string },
  ): Promise<UserDetails> {
    const { id } = params;
    return this.detailService.findUserById(req, id);
  }
}
