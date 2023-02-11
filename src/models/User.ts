import { model, Schema, Document as mongoDocument, models } from 'mongoose';

export interface IUser extends mongoDocument {
  username: string;
}

export const userSchema: Schema = new Schema({
  username: {
    type: String,
  },
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
