import { Document } from 'mongoose';

export interface EventDocument extends Document {
  event_creator: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  place: string;
  participants: string[];
  max_participants: number;
}
