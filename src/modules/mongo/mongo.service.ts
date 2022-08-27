import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { UserDocument } from './interface/users.interface';
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
}
