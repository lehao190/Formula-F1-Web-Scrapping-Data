import { Controller, Get, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  // Find race results by year
  @Get()
  findAll(@Query('year') year) {
    return this.teamsService.findAll(year);
  }
}
