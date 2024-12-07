import { StatusCodes } from 'http-status-codes';
import { SearchModel } from '~/models/SearchModel';

async function searchProducts(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing search query' });
  }

  try {
    const products = await SearchModel.searchProducts(query);

    if (products.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No products found' });
    }

    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error: error.message });
  }
}

export const SearchController = {
  searchProducts
};
