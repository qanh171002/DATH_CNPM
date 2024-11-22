const UserService = require("../services/UserService");
const path = require("path");
const fs = require("fs");

class UserController {
  CustomerInfo = async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
      }
      const email = req.session.user.email;
      console.log(email);
      try {
        let result = await UserService.getCustomerByEmail(email);
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: "Lỗi cơ sở dữ liệu" });
      }
    } catch (err) {
      res.status(500).json({ message: "Lỗi server" });
    }


  };
}

module.exports = new UserController();
