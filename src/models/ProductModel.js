import { deleteRow, executeQuery, getOne, insertSingleRow, updateRow } from '~/database/query';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

async function getAllProducts(sellerId) {
  try {
    const products = await getOne('products', 'seller_id', sellerId);

    if (products) {
      return products;
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
};

async function getProductReview(productId) {
  const query = `
  SELECT 
    r.id,
    b.name AS name,
    DATE_FORMAT(r.created_at, '%d/%m/%Y') AS created_at,
    r.rate,
    r.comment
  FROM 
    reviews r
  JOIN 
    users b ON r.buyer_id = b.id
  WHERE 
    r.product_id = '${productId}';

  `;
  const product = await executeQuery(query);

  return product;
}

async function getSoldProducts(sellerId) {
  try {
    const query = `
      SELECT P.id, P.name AS product_name, P.quantity, P.description, P.price, P.image,
            OP.status, OP.order_id, U.name AS buyer_name, 
            A.street, A.town, A.district, A.city
      FROM products P
      JOIN order_product OP ON OP.product_id = P.id
      JOIN orders O ON O.id = OP.order_id
      JOIN users U ON U.id = O.buyer_id
      JOIN addresses A ON U.id = A.user_id
      WHERE P.seller_id = '${sellerId}' AND A.isDefault = 1
    `;

    const products = await executeQuery(query);

    if (products) {
      return products;
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
}

async function getProductDetails() {
  const query = `
    SELECT 
        p.id,
        p.image,
        p.name,
        p.price,
        p.description,
        p.quantity,
        u.name AS sellerName,
        COALESCE(AVG(r.rate), 0) AS rating,
        COALESCE(COUNT(r.id), 0) AS comments
    FROM 
        products p
    JOIN
        users u ON p.seller_id = u.id
    LEFT JOIN 
        reviews r ON p.id = r.product_id
    GROUP BY 
        p.id, p.image, p.name, p.price, p.description, p.quantity, u.name;
  `;

  const products = await executeQuery(query);

  return products;
}

async function createProduct(product) {
  const data = {
    ...product,
    id: uuidv4()
  };

  await insertSingleRow('products', data);
}

async function editProduct(id, data) {
  const conditions = { id: id };
  try {
    const editedProduct = await updateRow('products', conditions, data);

    return editedProduct;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProduct(id) {
  const product = await getOne('products', 'id', id);
  const filePath = product[0].image.split('/image/upload/')[1].split('/').slice(1).join('/').split('.')[0];

  const conditions = { id: id };
  await deleteRow('products', conditions);
  cloudinary.uploader.destroy(filePath);
}

async function acceptProduct(orderId, productId) {
  try {
    const result = await updateRow('order_product', { order_id: orderId, product_id: productId }, { status: 'Accepted' });
    if (result) {
      return 1;
    }

    return 0;
  } catch (error) {
    throw new Error(error);
  }
};

export const ProductModel = {
  getAllProducts,
  getProductReview,
  getSoldProducts,
  getProductDetails,
  createProduct,
  editProduct,
  deleteProduct,
  acceptProduct
};
