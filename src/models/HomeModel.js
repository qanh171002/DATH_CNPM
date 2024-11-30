import { products } from '~/utilities/generateData';
import { getAll, insertMultipleRows } from '~/database/query';

async function getProducts() {
  let products = await getAll('products')
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
  await insertMultipleRows('products', data);
}

export const HomeModel = {
  getProducts,
  createProduct
};
