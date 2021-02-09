import mongoose from 'mongoose';

const userSessionSchema = new mongoose.Schema({
  expires: { type: Date, required: true },
  session: { type: Object, required: true },
});

export const userSessionModel = mongoose.model('usersessions', userSessionSchema);
