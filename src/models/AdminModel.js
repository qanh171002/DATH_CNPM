/* eslint-disable no-unused-vars */
import { executeQuery, getOne } from '~/database/query';

async function getAllUsers() {
  try {
    const result = await getOne('users', 'status', 'registered');

    const users = result.map(({ password, ...rest }) => rest);
    if (users) {
      return users;
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteUser(userId) {
  try {
    const query = `
      UPDATE users
      SET status = 'deleted'
      WHERE id = '${userId}'
    `;

    const result = await executeQuery(query);

    if (result.affectedRows) {
      return 1;
    }
    return 0;
  } catch (error) {
    throw new Error(error);
  }
}

export const AdminModel = {
  getAllUsers,
  deleteUser
};
