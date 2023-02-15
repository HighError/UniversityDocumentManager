import { model, Schema, Document as mongoDocument, models } from 'mongoose';
import { IYear } from './Year';

export interface IDocument extends mongoDocument {
  title: string;
  year: IYear;
}

export const documentSchema: Schema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: Schema.Types.ObjectId,
    ref: 'Year',
  },
});

const Document =
  models.Document || model<IDocument>('Document', documentSchema);
export default Document;
