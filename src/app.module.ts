import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Race, RaceSchema } from './schemas/race.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/formula1'),
    MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
