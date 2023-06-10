import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RaceDocument = HydratedDocument<Race>;

@Schema()
export class Race {
  @Prop()
  grand_prix: string;

  @Prop()
  winner: string;

  @Prop()
  car: string;

  @Prop()
  laps: number;
  
  @Prop()
  time: string;
  
  @Prop()
  date: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
