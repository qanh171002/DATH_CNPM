import { connection } from '~/config/connectDatabase';

export async function excuteQuery(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) return reject(err);

      resolve(row);
    });
  });
}

export async function getOne(table, where_key, where_value) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${table} WHERE ${where_key}='${where_value}'`;
    connection.query(query, (err, row) => {
      if (err) return reject(err);

      resolve(row);
    });
  });
}

export async function getAll(table) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${table}`;
    connection.query(query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export async function insertSingleRow(table, data = {}) {
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');

  let query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders});`;

  connection.query(query, Object.values(data), (err) => {
    if (err) throw err;
  });
}

export async function insertMultipleRows(table, rows = []) {
  if (rows.length === 0) {
    throw new Error('No data to insert');
  }

  const fields = Object.keys(rows[0]).join(', ');
  const placeholders = rows.map(() => `(${Object.keys(rows[0]).map(() => '?').join(', ')})`).join(', ');
  let query = `INSERT INTO ${table} (${fields}) VALUES ${placeholders};`;
  const values = rows.reduce((acc, row) => acc.concat(Object.values(row)), []);

  connection.query(query, values, (err) => {
    if (err) throw err;
  });
}

export async function updateRow(table, conditions, data) {
  return new Promise((resolve, reject) => {
    const conditionStrings = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
    const dataKeys = Object.keys(data).map((key) => `${key} = ?`);
    const query = `UPDATE ?? SET ${dataKeys.join(', ')} WHERE ${conditionStrings}`;
    const values = [table, ...Object.values(data), ...Object.values(conditions)];

    connection.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (!result) {
        return reject(new Error('No result returned from the database'));
      }
      resolve(result);
    });
  });
}

export async function deleteRow(table, conditions) {
  return new Promise((resolve, reject) => {
    const conditionStrings = Object.keys(conditions).map((key) => `${key} = ?`).join(' AND ');
    const query = `DELETE FROM ?? WHERE ${conditionStrings}`;
    const values = [table, ...Object.values(conditions)];
    connection.query(query, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}
