import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';

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
      .connect(`mongodb://${process.env.MONGO_URL}/?retryWrites=false`, mongoOptions)
      .catch(err => {
        console.log('Err in connecting mongodb', err);
      });
  }
}
