import { getOne } from '~/database/query';
import { connection } from '~/config/connectDatabase';

async function getCart(buyer_id) {
  let cart = await getOne('cart', 'buyer_id', buyer_id)
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });
  return cart;
}

async function addProductToCart(buyerId, productId, quantity) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO cart (buyer_id, product_id, quantity)
      VALUES ('${buyerId}', '${productId}', ${quantity})
      ON DUPLICATE KEY UPDATE quantity = quantity + ${quantity};
    `;
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function removeProductFromCart(buyerId, productId) {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM cart
      WHERE buyer_id = '${buyerId}' AND product_id = '${productId}';
    `;
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function updateQuantity(buyerId, productId, quantity) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE cart
      SET quantity = ${quantity}
      WHERE buyer_id = '${buyerId}' AND product_id = '${productId}';
    `;
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

async function getTotal(buyerId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT SUM(p.price * c.quantity) AS total
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.buyer_id = '${buyerId}';
    `;

    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result[0].total);
    });
  });
}

export const CartModel = {
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
  getTotal
};
