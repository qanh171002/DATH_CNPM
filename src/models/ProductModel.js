import { deleteRow, excuteQuery, getOne, insertSingleRow, updateRow } from '~/database/query';

async function getProduct(id) {
  let products = await getOne('products', 'id', id)
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });

  return products;
}

async function getProductDetails() {
  const query = `
    SELECT 
        p.id,
        p.image,
        p.name,
        p.price,
        p.description,
        c.name AS category,
        p.quantity,
        COALESCE(AVG(r.rate), 0) AS rating,
        COALESCE(COUNT(r.id), 0) AS comments
    FROM 
        products p
    JOIN 
        categories c ON p.category_id = c.id
    LEFT JOIN 
        reviews r ON p.id = r.product_id
    GROUP BY 
        p.id, p.image, p.name, p.price, p.description, c.name, p.quantity;
  `;

  const products = excuteQuery(query);

  return products;
}

async function createProduct(product) {
  await insertSingleRow('products', product);
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
  getProduct,
  getProductDetails,
  createProduct,
  editProduct,
  deleteProduct
};
