# Tài liệu cập nhật API, logic quản lý cơ sở dữ liệu MySQL và một số thứ đáng nói khác 
<!-- QUAN TRỌNG -->
## 1. Quản lý Nhận Xét với `order_id`

### Lý do sử dụng `order_id` trong bảng `reviews`

- **Đảm bảo tính hợp lệ của nhận xét:**

  - Người dùng chỉ có thể để lại nhận xét khi đơn hàng có trạng thái `Accepted` được mô tả logic trong bảng orders. Điều này tương tự các nền tảng thương mại điện tử như Shopee, nơi chỉ khi nhận hàng, người dùng mới có quyền đánh giá sản phẩm.
  - Ngăn chặn đánh giá không chính xác hoặc từ các nguồn không hợp lệ, đảm bảo chất lượng của nhận xét.

- **Giới hạn nhận xét trên mỗi đơn hàng:**
  - Một sản phẩm chỉ có thể nhận xét nhiều lần khi và chỉ khi thực hiện nhiều đơn hàng mà thôi, giúp tránh spam hoặc lặp lại đánh giá.

---

## 2. Cập nhật SQL (file nằm trong config)

### Bảng `reviews`

- Thêm cột `order_id` làm khoá ngoại, liên kết với bảng `orders`.

### Bảng `cart`

- Được kết hợp từ hai bảng là cart (cũ) và cart_items
- Cấu trúc bảng này có thay đổi và được bổ sung Triggger để tự động cập nhật trạng thái của giỏ hàng khi số lượng sản phẩm thay đổi (products cũng có một cáin tương tự).

### Bảng `orders`

- Thêm trạng thái (`status`) để theo dõi tiến trình đơn hàng:
  - `Pending`: Đơn hàng đang chờ xử lý.
  - `Accepted`: Đơn hàng đã được xử lý và giao thành công.
  - `Delivered`: Đơn hàng đã hoàn tất.
  - Hoàn toàn chưa viết bất cứ api nào liên quan, dữ liệu được thêm thủ công

### Bảng `products` và `cart`

- **Trigger tự động cập nhật trạng thái:**
  - Khi số lượng sản phẩm (`quantity`) trong bảng `products` thay đổi, trạng thái (`status`) của giỏ hàng trong bảng `cart` sẽ tự động được cập nhật.
  - Trigger `update_cart_status` đảm bảo:
    - Nếu sản phẩm hết hàng (`quantity = 0`), trạng thái là `Hết hàng`.
    - Nếu sản phẩm còn hàng, trạng thái là `Còn hàng`.

---

## 3. Cập nhật Logic API

- Các query gồm update và delete được thêm điều kiện để đảm bảo tính hợp lệ của nhiều dữ liệu (đã fix product hoạt động rồi).

## Còn một số logic khác nhưng nhiều quá không nhớ hết nổi
