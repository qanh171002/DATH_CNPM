import { StatusCodes } from 'http-status-codes';
// import { UserModel } from '~/models/UserModel';

async function getInfo(req, res) {
  try {
    res.status(StatusCodes.OK).json(req.user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export const UserController = {
  getInfo
};
