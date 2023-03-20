import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
