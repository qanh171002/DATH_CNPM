/* eslint-disable no-console */
/* eslint-disable quotes */
// Node v10.15.3
import axios from 'axios';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { env } from '~/config/env';
import { OrderController } from './OrderController';

// APP INFO
const config = {
  app_id: env.APP_ID,
  key1: env.KEY1,
  key2: env.KEY2,
  endpoint: env.ENDPOINT
};

const public_url = "https://3b2e-171-247-146-191.ngrok-free.app";

const handleTransaction = async (req, res) => {
  const embed_data = {
    redirecturl: 'http://localhost:3000/status'
  };

  const items = req.body.items || [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    app_user: req.body.userId || "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: req.body.amount || 10000,
    description: `Green food - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: `${public_url}/api/payment/callback`
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const result = await axios.post(config.endpoint, null, { params: order });

    res.status(200).json(result.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const acceptTransaction = async (req, res) => {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);


    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    }
    else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2);
      const itemsArray = JSON.parse(dataJson["item"]);

      await OrderController.createOrder(dataJson["app_user"], 'ACCEPTED', itemsArray, itemsArray.length, dataJson["amount"]);

      console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
};

export const PaymentController = {
  handleTransaction,
  acceptTransaction
};
