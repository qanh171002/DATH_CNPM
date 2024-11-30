import { getOne, insertMultipleRows, insertSingleRow } from '~/database/query';


async function getOrders(buyerId) {
  const where = {
    buyer_id: buyerId
  };

  const join = [
    { table: 'orders', on: 'oders.id = order_details.order_id' }
  ];

  const orders = await getOne('order_details', where, join);

  return orders;
}

async function storeOrderDetails(orderDetails) {
  await insertMultipleRows('order_details', orderDetails);
}

async function createOrder(id, buyerId, date, status) {
  const data = {
    id: id,
    buyer_id: buyerId,
    date: date,
    status: status
  };

  await insertSingleRow('orders', data);
}

export const OrderModel = {
  storeOrderDetails,
  createOrder,
  getOrders
};
