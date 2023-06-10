import { Controller, Get, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  // Find race results by year
  @Get()
  findAll(@Query('year') year) {
    return this.driversService.findAll(year);
  }
}
