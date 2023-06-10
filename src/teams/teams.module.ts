import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from 'src/schemas/team.schema';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])
  ],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
