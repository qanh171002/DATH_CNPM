import { StatusCodes } from 'http-status-codes';
import { getOne } from '~/database/query';
import jwt from 'jsonwebtoken';
import { env } from '~/config/env';

export const authorization = (permission) => {
  return async (req, res, next) => {
    const { user } = req.user;

    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json('You must login first.');
    }

    const { role } = user;

    if (!permission.include(role)) {
      return res.status(StatusCodes.UNAUTHORIZED).json('You dont have permission to do this action.');
    }

    next();
  };
};

export const authentication = async (req, res, next) => {
  try {
    const authCookie = req.cookies.SessionID;

    if (!authCookie) return res.status(401).json({ message: 'You must login first' });

    jwt.verify(authCookie, env.SECRET_ACCESS_TOKEN, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'This session has expired. Please login' });
      }


      const { id } = decoded;
      const user = await getOne('users', id);
      // eslint-disable-next-line no-unused-vars
      const { password, ...data } = user;
      req.user = data;
      next();
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      code: 500,
      data: [],
      message: err
    });
  }
};
