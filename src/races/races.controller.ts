import { Controller, Get, Query } from '@nestjs/common';
import { RacesService } from './races.service';

@Controller('races')
export class RacesController {
  constructor(
    private readonly racesService: RacesService
  ) {}

  // Find race results by year
  @Get()
  findAll(@Query('year') year) {
    return this.racesService.findAll(year);
  }
}
