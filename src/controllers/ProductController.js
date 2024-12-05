import { ProductModel } from '~/models/ProductModel';
import { StatusCodes } from 'http-status-codes';
import { excuteQuery } from '~/database/query';

async function getProductReview(req, res) {
  try {
    const product = await ProductModel.getProductReview(req.params.id);

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

async function updateProductStock(productId, quantity) {
  const query = `
    UPDATE products
    SET quantity = quantity - ${quantity}
    WHERE id = '${productId}' AND quantity >= ${quantity};
  `;

  const result = await excuteQuery(query);

  return result;
}

export const ProductController = {
  getProductReview,
  createProduct,
  editProduct,
  deleteProduct,
  updateProductStock
};
