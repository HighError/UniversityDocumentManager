import { model, Schema, Document as mongoDocument, models } from 'mongoose';

export interface IDocument extends mongoDocument {
  title: string;
  subtitle: string;
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
