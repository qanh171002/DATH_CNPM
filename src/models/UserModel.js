/* eslint-disable no-unused-vars */
import { getOne } from '~/database/query';

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

export const UserModel = {
  getInfo
};
