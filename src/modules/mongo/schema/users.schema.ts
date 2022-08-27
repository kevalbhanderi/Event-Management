import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  date_of_birth: { type: String },
  gender: { type: String },
  profile_image_url: { type: String },
});

export const UsersModel = mongoose.model('users', UsersSchema);
