import { products } from "~/utilities/generateData";
import { getOne, insertMultipleRows } from "~/database/query";

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

// just for test
async function createProduct() {
  let data = products;
  await insertMultipleRows("products", data);
}

async function editProduct() {
  let data = products;
  await insertMultipleRows("products", data);
}

async function deleteProduct() {
  let data = products;
  await insertMultipleRows("products", data);
}

export const ProductModel = {
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
};
