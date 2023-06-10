import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema()
export class Driver {
  @Prop()
  pos: number;

  @Prop()
  driver: string;

  @Prop()
  nationality: string;

  @Prop()
  car: string;
  
  @Prop()
  pts: number;

  @Prop()
  year: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
