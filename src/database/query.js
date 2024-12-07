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

export async function insertSingleRowAndGetResult(table, data = {}) {
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');

  let query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders});`;

  return new Promise((resolve, reject) => {
    connection.query(query, Object.values(data), (err) => {
      if (err) {
        return reject(err);
      }

      const selectQuery = `SELECT * FROM ${table} WHERE id = ?`;
      connection.query(selectQuery, [data.id], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
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

//..................................Các hàm query xài cho cart: sẽ fix sau...............

export async function excuteQuery2(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export async function getOne2(table, where = {}, join = []) {
  return new Promise((resolve, reject) => {
    const joinClause = join.length
      ? join.map(({ table: joinTable, on }) => `JOIN ${joinTable} ON ${on}`).join(' ')
      : '';

    const whereClause = Object.entries(where)
      .map(([key, value]) => `${key}='${value}'`)
      .join(' AND ');

    const query = `SELECT * FROM ${table} ${joinClause} ${whereClause ? `WHERE ${whereClause}` : ''} LIMIT 1`;
    connection.query(query, (err, row) => {
      if (err) return reject(err);
      resolve(row[0] || null);
    });
  });
}

export async function getAll2(table, condition = {}) {
  return new Promise((resolve, reject) => {
    try {
      const keys = Object.keys(condition);
      const values = Object.values(condition);
      const whereClause = keys.map((key) => `${key} = ?`).join(' AND ');
      const query = `SELECT * FROM ${table} ${keys.length > 0 ? `WHERE ${whereClause}` : ''}`;
      connection.query(query, values, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    } catch (error) {
      reject(error);
    }
  });
}
export async function insertSingleRow2(table, data = {}) {
  const fields = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');

  const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`;

  return new Promise((resolve, reject) => {
    connection.query(query, Object.values(data), (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
export async function insertMultipleRows2(table, rows = []) {
  if (rows.length === 0) {
    throw new Error('No data to insert');
  }

  const fields = Object.keys(rows[0]).join(', ');
  const placeholders = rows.map(() => `(${Object.keys(rows[0]).map(() => '?').join(', ')})`).join(', ');

  const query = `INSERT INTO ${table} (${fields}) VALUES ${placeholders}`;

  const values = rows.reduce((acc, row) => {
    acc.push(...Object.values(row));
    return acc;
  }, []);

  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
export async function updateRow2(table, data = {}, where = {}) {
  const setClause = Object.entries(data)
    .map(([key, value]) => `${key}='${value}'`)
    .join(', ');

  const whereClause = Object.entries(where)
    .map(([key, value]) => `${key}='${value}'`)
    .join(' AND ');

  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
export async function deleteRow2(table, where = {}) {
  const whereClause = Object.entries(where)
    .map(([key, value]) => `${key}='${value}'`)
    .join(' AND ');

  const query = `DELETE FROM ${table} WHERE ${whereClause}`;

  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
