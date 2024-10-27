/* eslint-disable quotes */
import { connection } from "~/config/connectDatabase";


export async function getOne(table, id) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${table} WHERE id='${id}'`;
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
  const fields = Object.keys(data).join(", ");
  const placeholders = Object.keys(data).map(() => "?").join(", ");

  let query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders});`;

  connection.query(query, Object.values(data), (err) => {
    if (err) throw err;
  });
}

export async function insertMultipleRows(table, rows = []) {
  if (rows.length === 0) {
    throw new Error("No data to insert");
  }

  const fields = Object.keys(rows[0]).join(", ");
  const placeholders = rows.map(() => `(${Object.keys(rows[0]).map(() => "?").join(", ")})`).join(", ");
  let query = `INSERT INTO ${table} (${fields}) VALUES ${placeholders};`;
  const values = rows.reduce((acc, row) => acc.concat(Object.values(row)), []);

  connection.query(query, values, (err) => {
    if (err) throw err;
  });
}

export async function updateRow(id, table, data) {
  return new Promise((resolve, reject) => {
    let query = `UPDATE ${table} SET ? WHERE id='${id}'`;

    connection.query(query, [data], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

export async function deleteRow(id, table) {
  let query = `DELETE FROM ${table} WHERE id='${id}'`;
  connection.query(query, function (err) {
    if (err) throw err;
  });
}
