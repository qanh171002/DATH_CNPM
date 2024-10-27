import { ProductModel } from "~/models/ProductModel";
import { StatusCodes } from "http-status-codes";

async function getProduct(req, res) {
  try {
    const product = await ProductModel.getProduct(req.params.id);

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
};

async function createProduct(req, res) {
  try {
    await ProductModel.createProduct();
    res.status(StatusCodes.OK).json();

  } catch (error) {
    throw new Error(error);
  }
}

async function editProduct(req, res) {
  try {
    await ProductModel.createProduct();
    res.status(StatusCodes.OK).json();

  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProduct(req, res) {
  try {
    await ProductModel.createProduct();
    res.status(StatusCodes.OK).json();

  } catch (error) {
    throw new Error(error);
  }
}

export const ProductController = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
};
