import { deleteRow, getOne, insertSingleRow, updateRow } from '~/database/query';

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
  createProduct,
  editProduct,
  deleteProduct
};
