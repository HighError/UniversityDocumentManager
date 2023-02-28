import mongoose, { Document, model, models } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
