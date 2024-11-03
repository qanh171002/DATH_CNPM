import { deleteRow, getOne, insertSingleRow, updateRow } from "~/database/query";

async function getProduct(id) {
  let products = await getOne("products", id)
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });

  return products;
}

async function createProduct(product) {
  await insertSingleRow("products", product);
}

async function editProduct(id, data) {
  let editedProduct = await updateRow(id, "products", data);

  return editedProduct;
}

async function deleteProduct(id) {
  await deleteRow(id, "products");
}

export const ProductModel = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
};
