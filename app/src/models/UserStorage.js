"use strict";

const pool = require("../config/pool");
const date = require("../common/date");

class UserStorage {
  static async getUserInfo(id) {
    let conn, rows;
    try {
      conn = await pool.getConnection();
      const query =
        "SELECT USER_ID, USER_PSWORD FROM tb_user WHERE USER_ID = ?;";
      rows = await conn.query(query, [id]);
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) conn.end();
      return rows[0];
    }
  }

  static async save(userInfo) {
    let conn, res;
    try {
      conn = await pool.getConnection();
      const query =
        "INSERT INTO tb_user (USER_ID, USER_PSWORD, USER_NAME, USER_EMAIL, USER_REG_DATE, USER_UPD_DATE) VALUES (?, ?, ?, ?, ?, ?);";
      const dateTime = date.getDatetime();
      res = await conn.query(query, [
        userInfo.id,
        userInfo.psword,
        userInfo.name,
        userInfo.email,
        dateTime,
        dateTime,
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      if (conn) conn.end();
      if (res.affectedRows === 1) return { success: true };
      else return { success: false };
    }
  }
}

module.exports = UserStorage;
