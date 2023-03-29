import { model, Schema, Document, models } from 'mongoose';

export interface IYear extends Document {
  title: string;
  year: number;
  private: boolean;
}

export const yearSchema: Schema = new Schema({
  title: {
    type: String,
  },
  year: {
    type: Number,
    unique: true,
  },
  private: {
    type: Boolean,
    default: false,
  },
});

const Year = models.Year || model<IYear>('Year', yearSchema);
export default Year;
