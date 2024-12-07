import mysql from 'mysql2';
import { excuteQuery2 } from '~/database/query';

async function searchProducts(query) {
  try {
    const searchQuery = `
      SELECT * 
      FROM products
      WHERE name LIKE ? OR description LIKE ?
    `;
    const formattedQuery = mysql.format(searchQuery, [`%${query}%`, `%${query}%`]);
    const searchResult = await excuteQuery2(formattedQuery);
    return searchResult;
  } catch (error) {
    throw new Error(`Failed to search products: ${error.message}`);
  }
}

export const SearchModel = {
  searchProducts
};
