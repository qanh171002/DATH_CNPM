import { StatusCodes } from 'http-status-codes';
import { AuthModel } from '~/models/AuthModel';

const createUser = async (req, res) => {
  try {
    const result = await AuthModel.createUser(req.body);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ status: false, error: err });
  }
};

const logout = async (req, res) => {
  try {
    const result = await AuthModel.logout(req);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ status: false, error: err });
  };
};

const login = async (req, res) => {
  try {
    const result = await AuthModel.login(req.body, res);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.BAD_GATEWAY).json({ status: false, error: err });
  };
};

export const AuthController = {
  createUser,
  login,
  logout
};
