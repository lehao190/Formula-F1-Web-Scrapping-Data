import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesModule } from './races/races.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/formula1'),
    RacesModule,
    DriversModule
  ]
})
export class AppModule {}
