const bcrypt = require("bcryptjs");
const db = require("../config/db");
const axios = require("axios");

class AuthService {
  check = async (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (req.session.user)
          resolve({ status: false, message: "Người dùng đã đăng nhập" });
        else resolve({ status: true, message: "Người dùng chưa đăng nhập" });
      } catch (error) {
        reject(error);
      }
    });
  };

  createUser = async (data) => {
    const { email, password, name } = data;

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    if (!isValidEmail(email)) {
      return { status: false, message: "Email không hợp lệ" };
    }

    try {
      const [existingUsers] = await db.query(
        "SELECT email FROM user WHERE email = ? ",
        email
      );

      if (existingUsers.length > 0) {
        const userExistsMessage =
          existingUsers[0].email === email
            ? "Email đã được dùng"
            : "Người dùng đã tạo tài khoản";
        return { status: false, message: userExistsMessage };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await db.query(
        "INSERT INTO user (ten, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, hashedPassword, "user"]
      );

      // Kiểm tra kết quả thêm người dùng
      if (result.affectedRows === 1) {
        return {
          status: true,
          name,
          email,
          role: "user",
        };
      } else {
        return { status: false, message: "Không thể tạo tài khoản" };
      }
    } catch (error) {
      throw error; // Nếu có lỗi, ném ra để hàm gọi có thể bắt lỗi
    }
  };

  logout = (req) => {
    return new Promise((resolve, reject) => {
      if (req.session.user) {
        req.session.destroy((err) => {
          if (err) reject({ status: false, message: "Đăng xuất thất bại" });
          else resolve({ status: true, message: "Đăng xuất thành công" });
        });
      } else resolve({ status: false, message: "Chưa đăng nhập" });
    });
  };

  login = async (data, req) => {
    const { email, password } = data;
    return new Promise(async (resolve, reject) => {
      try {
        const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
          email,
        ]);
        if (rows.length === 0) {
          resolve({ status: false, message: "Tài khoản không tồn tại" });
          return;
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          resolve({ status: false, message: "Mật khẩu sai" });
          return;
        }

        fetch("https://api.ipify.org?format=json")
          .then((response) => response.json())
          .then(async (data) => {
            req.session.user = {
              id: user.id,
              role: user.role,
            };

            resolve({
              status: true,
              id: user.id,
              role: user.role,
            });
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = new AuthService();
