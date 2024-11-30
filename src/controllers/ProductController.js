import { ProductModel } from '~/models/ProductModel';
import { StatusCodes } from 'http-status-codes';

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
    await ProductModel.createProduct(req.body);
    res.status(StatusCodes.CREATED).json('Created');

  } catch (error) {
    throw new Error(error);
  }
}

async function editProduct(req, res) {
  try {
    let editedProduct = await ProductModel.editProduct(req.params.id, req.body);

    res.status(StatusCodes.OK).json(editedProduct);

  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProduct(req, res) {
  try {
    await ProductModel.deleteProduct(req.params.id);
    res.status(StatusCodes.OK).json('Deleted');

  } catch (error) {
    throw new Error(error);
  }
}

async function handleQuantity(orderDetails) {
  for (let i = 0; i < orderDetails.length; i++) {
    const productId = orderDetails[i].product_id;
    const quantity = orderDetails[i].quantity;

    await ProductModel.editProduct(productId, { quantity: quantity });
  }

  return true;
}

export const ProductController = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  handleQuantity
};
