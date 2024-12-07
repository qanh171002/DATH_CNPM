import { CategoryModel } from '../models/CategoryModel.js';
import { StatusCodes } from 'http-status-codes';

async function getProductsByCategory(req, res) {
  const { cate } = req.params;
  try {
    const products = await CategoryModel.getProductsByCategory(cate);

    if (products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No products found in this category.' });
    }

    res.status(StatusCodes.OK).json(products);
  } catch (err) {

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching products.', err });
  }
}

export const CategoryController = {
  getProductsByCategory
};
