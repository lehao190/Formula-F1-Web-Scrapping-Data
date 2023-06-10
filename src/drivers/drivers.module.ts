import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from 'src/schemas/driver.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])
  ],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
