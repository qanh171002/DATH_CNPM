import { deleteRow, excuteQuery, insertSingleRow, updateRow } from '~/database/query';
import { v4 as uuidv4 } from 'uuid';

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
  const product = await excuteQuery(query);

  return product;
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

  const products = await excuteQuery(query);

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
  let editedProduct = await updateRow('products', conditions, data);

  return editedProduct;
}

async function deleteProduct(id) {
  const conditions = { id: id };
  await deleteRow('products', conditions);
}

export const ProductModel = {
  getProductReview,
  getProductDetails,
  createProduct,
  editProduct,
  deleteProduct
};
