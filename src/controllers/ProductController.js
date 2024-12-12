import { ProductModel } from '~/models/ProductModel';
import { StatusCodes } from 'http-status-codes';
import { executeQuery } from '~/database/query';

async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.getAllProducts(req.user.id);
    if (products) {
      return res.status(StatusCodes.OK).json(products);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to get products' });
    }
  } catch (error) {
    throw new Error(error);
  }
};

async function getProductReview(req, res) {
  try {
    const product = await ProductModel.getProductReview(req.params.id);

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    throw new Error(error);
  }
};

async function getSoldProducts(req, res) {
  try {
    const products = await ProductModel.getSoldProducts(req.user.id);
    if (products) {
      return res.status(StatusCodes.OK).json(products);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to get products' });
    }
  } catch (error) {
    throw new Error(error);
  }
};

async function createProduct(req, res) {
  try {
    const fileData = req.file;

    const { name, description, quantity, price, sellerId } = req.body;
    const data = {
      name,
      description,
      quantity,
      price,
      seller_id: sellerId,
      image: fileData?.path
    };

    await ProductModel.createProduct(data);
    return res.status(StatusCodes.CREATED).json('Created');

  } catch (error) {
    throw new Error(error);
  }
}

async function editProduct(req, res) {
  try {
    let editedProduct = await ProductModel.editProduct(req.params.id, req.body);

    return res.status(StatusCodes.OK).json(editedProduct);

  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProduct(req, res) {
  try {
    await ProductModel.deleteProduct(req.params.id);
    return res.status(StatusCodes.OK).json('Deleted');

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

  const result = await executeQuery(query);

  return result;
}

async function acceptProduct(req, res) {
  try {
    const product = await ProductModel.acceptProduct(req.body.orderId, req.body.productId);

    if (product) {
      return res.status(StatusCodes.OK).json({ message: 'Status changed' });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Failed to change product status' });
  } catch (error) {
    throw new Error(error);
  }
};

export const ProductController = {
  getAllProducts,
  getProductReview,
  getSoldProducts,
  createProduct,
  editProduct,
  deleteProduct,
  updateProductStock,
  acceptProduct
};
