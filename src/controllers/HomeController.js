import { HomeModel } from '~/models/HomeModel';
import { StatusCodes } from 'http-status-codes';
import { ProductModel } from '~/models/ProductModel';

async function getProducts(req, res) {
  try {
    const products = await ProductModel.getProductDetails();

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
