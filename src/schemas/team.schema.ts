import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  pos: number;

  @Prop()
  team: string;
  
  @Prop()
  pts: number;

  @Prop()
  year: number;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
