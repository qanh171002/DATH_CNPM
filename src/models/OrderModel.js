import { v4 as uuidv4 } from 'uuid';
import { ProductController } from '~/controllers/ProductController';
import { excuteQuery, insertMultipleRows, insertSingleRowAndGetResult } from '~/database/query';

async function getOrders(buyerId) {
  const query = `
  SELECT o.id AS order_id, p.name, p.image, o.total_price, op.quantity, o.status
  FROM orders o
  JOIN order_product op ON op.order_id = o.id
  JOIN products p ON op.product_id = p.id
  WHERE o.buyer_id = '${buyerId}'
  ORDER BY o.id DESC
`;

  const result = await excuteQuery(query);
  const orders = result.map(row => ({ ...row }));

  return orders;
}

async function storeOrderDetails(orderDetails) {
  await insertMultipleRows('order_product', orderDetails);
  for (const detail of orderDetails) {
    const { product_id, quantity } = detail;

    await ProductController.updateProductStock(product_id, quantity);
  }

  return 1;
}

async function createOrder(buyerId, status = 'PENDING', numberOfProducts, amount) {
  const data = {
    id: uuidv4(),
    buyer_id: buyerId,
    date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    status: status,
    number_of_products: numberOfProducts,
    total_price: amount
  };

  const order = await insertSingleRowAndGetResult('orders', data);

  return order[0];
}

export const OrderModel = {
  storeOrderDetails,
  createOrder,
  getOrders
};
