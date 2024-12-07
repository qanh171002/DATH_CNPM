import { deleteRow, excuteQuery, getAll, insertSingleRow, updateRow } from '~/database/query';

async function getCoupons() {
  let coupons = await getAll('coupons')
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      throw err;
    });

  return coupons;
}

async function createCoupon(coupon) {
  await insertSingleRow('coupons', coupon);
}

async function editCoupon(id, data) {
  let editedCoupon = await updateRow(id, 'coupons', data);

  return editedCoupon;
}

async function deleteCoupon(id) {
  await deleteRow(id, 'coupons');
}

async function decreaseQuantity(id) {
  const query =
  `
  UPDATE coupons
  SET quantity = quantity - 1
  WHERE id = '${id}' AND quantity > 0
  `;

  const result = await excuteQuery(query);

  return result;
}

export const CouponModel = {
  getCoupons,
  createCoupon,
  editCoupon,
  deleteCoupon,
  decreaseQuantity
};
