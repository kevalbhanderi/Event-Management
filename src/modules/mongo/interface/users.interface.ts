import { Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  profile_image_url: string;
}
