import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  event_creator: { type: String },
  title: { type: String },
  description: { type: String },
  event_date: { type: String },
  event_time: { type: String },
  place: { type: String },
  participants: { type: [String] },
  max_participants: { type: Number },
});

export const EventModel = mongoose.model('events', EventSchema);
