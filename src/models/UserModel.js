/* eslint-disable no-unused-vars */
import { deleteRow, excuteQuery, getOne, insertSingleRow } from '~/database/query';

async function getInfo(id) {
  let user = await getOne('users', 'id', id)
    .then((rows) => {
      const { password, ...rest } = rows;
      return rest;
    })
    .catch((err) => {
      throw err;
    });
  return user;
}

async function getAddress(userId) {
  const query = `
    SELECT 
    a.street,
    a.town,
    a.district,
    a.city,
    a.isDefault,
    a.town_code,
    a.district_code,
    a.city_code,
    a.name,
    a.phone
    FROM 
      addresses AS a
    WHERE a.user_id = '${userId}';
  `;
  const result = await excuteQuery(query);

  return result;
}

async function storeAddress(userId, address) {
  const data = {
    ...address,
    user_id: userId
  };

  await insertSingleRow('addresses', data);
}

async function updateAddress(userId, address) {
  const data = {
    ...address,
    user_id: userId
  };

  // await insertSingleRow('addresses', data);
  return 0;
}

async function deleteAddress(address) {
  await deleteRow('addresses', address);

  return 1;
}

export const UserModel = {
  getInfo,
  getAddress,
  storeAddress,
  updateAddress,
  deleteAddress
};
