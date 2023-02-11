/* eslint-disable no-undef */
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const { MONGODB_URI } = process.env;

const globalWithMongoose = global as typeof globalThis & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
  cached = globalWithMongoose.mongoose;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mon) => mon);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
