import { StatusCodes } from 'http-status-codes';
import { AdminModel } from '~/models/AdminModel';

async function getAllUsers(_, res) {
  try {
    const users = await AdminModel.getAllUsers();

    if (users) {
      return res.status(StatusCodes.OK).json(users);
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to get all users' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const result = await AdminModel.deleteUser(req.params.userId);

    if (result) {
      return res.status(StatusCodes.OK).json({ message: 'User deleted' });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to get delete user' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export const AdminController = {
  getAllUsers,
  deleteUser
};
