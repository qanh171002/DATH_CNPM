import { HomeModel } from '~/models/HomeModel';
import { StatusCodes } from 'http-status-codes';

async function getProducts(req, res) {
  try {
    const products = await HomeModel.getProducts();

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    throw new Error(error);
  }
};

// just for test
async function createProduct(req, res) {
  try {
    await HomeModel.createProduct();
    res.status(StatusCodes.OK).json();

  } catch (error) {
    throw new Error(error);
  }
}

export const HomeController = {
  getProducts,
  createProduct
};
