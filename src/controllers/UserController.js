import { StatusCodes } from 'http-status-codes';
import { UserModel } from '~/models/UserModel';

async function getInfo(req, res) {
  try {
    res.status(StatusCodes.OK).json(req.user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function getAddress(req, res) {
  try {
    const result = await UserModel.getAddress(req.user.id);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function storeAddress(req, res) {
  try {
    await UserModel.storeAddress(req.user.id, req.body);

    res.status(StatusCodes.OK).json({ status: true, message: 'Store address successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function updateAddress(req, res) {
  try {
    await UserModel.updateAddress(req.user.id, req.body);

    res.status(StatusCodes.OK).json({ message: 'Update address successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

async function deleteAddress(req, res) {
  try {
    await UserModel.deleteAddress(req.body);

    res.status(StatusCodes.OK).json({ status: true, message: 'Delete address successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
}

export const UserController = {
  getInfo,
  getAddress,
  storeAddress,
  updateAddress,
  deleteAddress
};
