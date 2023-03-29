import User from '@/models/User';
import Local from 'passport-local';
import bcrypt from 'bcryptjs';
import dbConnect from './db';

export const localStrategy = new Local.Strategy(async function (
  username,
  password,
  done
) {
  try {
    await dbConnect();
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return done(new Error('Invalid username and password combination'));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return done(new Error('Invalid username and password combination'));
    }

    return done(null, { id: user._id });
  } catch (err) {
    done(err);
  }
});
