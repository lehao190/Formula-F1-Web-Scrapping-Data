import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesModule } from './races/races.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/formula1'),
    RacesModule
  ]
})
export class AppModule {}
