import { getOne, insertSingleRow } from '~/database/query';
import bcrypt from 'bcryptjs';
import { generateAccessJWT } from '~/utilities/generateAccessToken';

const createUser = async (data) => {
  const { email, password, confirmPassword, name } = data;

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (!isValidEmail(email)) {
    return { status: false, message: 'Invalid email' };
  }

  const existingUser = await getOne('users', email, 'email');

  if (existingUser.length > 0) {
    return { status: false, message: 'Email has been used.' };
  }

  if (password != confirmPassword) {
    return { status: false, message: 'Your confirmation password is not correct.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await insertSingleRow('users', { email: email, password: hashedPassword, name: name });

  return { status: true, message: 'Create new user successfully!' };
};

const logout = async (res) => {
  res.clearCookie('SessionID', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  res.json({ message: 'You have been logged out.' });
};

const login = async (data, res) => {
  const { email, password } = data;
  const user = await getOne('users', email, 'email');

  if (user.length > 0) {
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return { status: false, message: 'Your password is not correct' };
    }

    let options = {
      maxAge: 20 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    };

    const token = generateAccessJWT(user[0].id);
    res.cookie('SessionID', token, options);
    return {
      status: true,
      message: 'You have successfully logged in.'
    };

  } else {
    return { status: false, message: 'Your email is not correct' };
  }

};

export const AuthModel = {
  createUser,
  login,
  logout
};
