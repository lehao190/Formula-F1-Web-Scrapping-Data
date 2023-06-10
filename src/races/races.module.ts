import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Race, RaceSchema } from 'src/schemas/race.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema }])
  ],
  controllers: [RacesController],
  providers: [RacesService]
})
export class RacesModule {}
