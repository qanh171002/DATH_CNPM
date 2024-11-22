const db = require("../config/db");

class UserService {
  getCustomerByEmail = async (email) => {
    try {
      const [rows] = await db.query(
        `SELECT * FROM Customer WHERE email = ?`,
        [email]
      );

      if (rows.length === 0) {
        return { message: "Không tìm thấy khách hàng với email này." };
      }

      return rows[0];
    } catch (error) {
      console.error("Lỗi khi truy vấn dữ liệu khách hàng:", error);
      throw new Error("Lỗi khi truy vấn dữ liệu khách hàng.");
    }
  };
}

module.exports = new UserService();
