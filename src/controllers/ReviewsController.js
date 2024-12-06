import { ReviewsModel } from '~/models/ReviewsModel';
import { StatusCodes } from 'http-status-codes';

async function getReviews(req, res) {
  try {
    const reviews = await ReviewsModel.getReviews(req.params.buyer_id);
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

async function createReview(req, res) {
  try {
    if (!req.body.rate || req.body.rate < 1 || req.body.rate > 5) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Đánh giá phải nằm trong khoảng từ 1 đến 5'
      });
    }
    const order = await ReviewsModel.getOrderById(req.body.order_id);
    if (!order || order.status !== 'Accepted') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Chỉ được phép đăng nhận xét khi đơn hàng có trạng thái Accepted.'
      });
    }

    await ReviewsModel.createReviews(req.body);
    res.status(StatusCodes.CREATED).json({
      message: 'Đăng tải nhận xét về sản phẩm thành công'
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `Lỗi khi tạo nhận xét: ${error.message}`
    });
  }
}


async function updateReview(req, res) {
  const { buyer_id, product_id } = req.params;

  try {
    const updatedReview = await ReviewsModel.updateReview(buyer_id, product_id, req.body);
    if (updatedReview.affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy review phù hợp để cập nhật' });
    } else {
      res.status(StatusCodes.OK).json({ message: 'Cập nhật review thành công', updatedReview });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

async function deleteReview(req, res) {
  const { buyer_id, product_id } = req.params;
  const { order_id } = req.body;
  if (!order_id) {
    return res.status(400).json({ error: 'order_id là bắt buộc để xóa nhận xét' });
  }
  try {
    const deletedReview = await ReviewsModel.deleteReview(buyer_id, product_id, order_id);
    if (!deletedReview || deletedReview.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy review phù hợp để xóa' });
    }
    res.status(200).json({ message: 'Xóa nhận xét thành công' });
  } catch (error) {
    res.status(500).json({ error: `Lỗi khi xóa nhận xét: ${error.message}` });
  }
}


export const ReviewsController = {
  getReviews,
  createReview,
  updateReview,
  deleteReview
};
