import { model, Schema, Document as mongoDocument, models } from 'mongoose';
import { IUser } from './User';
import { IYear } from './Year';

export interface IDocument extends mongoDocument {
  title: string;
  year: IYear;
  user: IUser;
}

export const documentSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Schema.Types.ObjectId,
    ref: 'Year',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Document =
  models.Document || model<IDocument>('Document', documentSchema);
export default Document;
