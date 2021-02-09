import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tosAgreement: { type: Boolean, required: true },
});

export const userModel = mongoose.model('userModel', userSchema);
