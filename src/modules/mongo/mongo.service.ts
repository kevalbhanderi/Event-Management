import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { EventDocument } from './interface/event.interface';
import { UserDocument } from './interface/users.interface';
import { EventModel } from './schema/event.schema';
import { UsersModel } from './schema/users.schema';

@Injectable()
export class MongoService {
  constructor() {
    const mongoOptions = {
      auth: { user: process.env.MONGO_USER, password: process.env.MONGO_PASS },
      dbName: process.env.MONGO_DB,
      authSource: process.env.MONGO_AUTH_DB,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };
    mongoose
      .connect(
        `mongodb+srv://admin:admin@123@eventmanagement.zjkfzuf.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions,
      )
      .then(() => console.log('mongo connected'))
      .catch(err => {
        console.log('Err in connecting mongodb', err);
      });
  }

  /**
   * to check email is exists or not in database
   * @param email
   * @returns
   */
  async userExists(email: string): Promise<UserDocument> {
    const user = (await UsersModel.findOne({ email: email })) as UserDocument;
    return user;
  }

  /**
   * Save user details
   * @param user
   */
  async saveUser(user: UserDocument) {
    await new UsersModel(user).save();
  }

  /**
   * Update a profile of user
   * @param user
   */
  async updateProfile(user: UserDocument) {
    (await UsersModel.updateOne({ email: user.email }, user)) as UserDocument;
  }

  /**
   * Save event details
   * @param event
   */
  async createEvent(event: EventDocument) {
    await new EventModel(event).save();
  }

  /**
   * Get all events
   */
  async getEvents() {
    const events = (await EventModel.find()) as EventDocument[];
    return events;
  }

  async getEventByUser(userId: string) {
    return (await EventModel.findOne({ event_creator: userId })) as EventDocument;
  }
}
