import { getAll2 } from '~/database/query';

async function getProductsByCategory(categoryId) {
  try {
    const products = await getAll2('products', { category_id: categoryId });
    return products;
  } catch (error) {
    throw new Error(`Failed to retrieve products for category ${categoryId}: ${error.message}`);
  }
}
export const CategoryModel = {
  getProductsByCategory
};
