# Tài liệu API cho Quản lý Nhận Xét (Reviews)
<!-- Cách sử dụng: Bấm Ctrl + Shift + V để xem OK hơn -->
<!-- Phần update code cũ và mysql cũ nằm tại file UpdateReadme.md (HÃY ĐỌC QUAN TRỌNG) -->
## 1. Route: **/reviews/:buyer_id**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách các nhận xét của một người mua cụ thể.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua.

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    [
      {
        "buyer_id": "string",
        "product_id": "string",
        "rate": "integer",
        "comment": "string",
        "image": "string",
        "added_at": "string",
        "order_id": "string"
      }
    ]
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Lỗi khi lấy danh sách nhận xét"
    }
    ```

---

## 2. Route: **/reviews/**

- **Phương thức:** `POST`
- **Mục đích:** Thêm một nhận xét mới cho sản phẩm.
- **Dữ liệu yêu cầu:**

  - `order_id` (string): ID của đơn hàng liên quan đến nhận xét.
  - `buyer_id` (string): ID của người mua gửi nhận xét.
  - `product_id` (string): ID của sản phẩm được nhận xét.
  - `rate` (integer): Đánh giá sản phẩm (từ 1 đến 5).
  - `comment` (string): Nội dung nhận xét (tuỳ chọn).
  - `image` (string): Đường dẫn đến hình ảnh (tuỳ chọn).

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "message": "Đăng tải nhận xét về sản phẩm thành công"
    }
    ```
  - **Lỗi cú pháp:**
    ```json
    {
      "error": "Đánh giá phải nằm trong khoảng từ 1 đến 5"
    }
    ```
  - **Lỗi đơn hàng không hợp lệ:**
    ```json
    {
      "error": "Chỉ được phép đăng nhận xét khi đơn hàng có trạng thái 'Accepted'."
    }
    ```
  - **Lỗi hệ thống:**
    ```json
    {
      "error": "Lỗi khi tạo nhận xét: <chi tiết lỗi>"
    }
    ```

---

## 3. Route: **/reviews/:buyer_id/:product_id**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật một nhận xét cụ thể.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua (trong URL param).
  - `product_id` (string): ID của sản phẩm (trong URL param).
  - Body yêu cầu:
    - Phần mong muốn cập nhật:

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "message": "Cập nhật review thành công"
    }
    ```
  - **Lỗi :**
    ```json
    {
      "error": "Không tìm thấy review phù hợp để cập nhật"
    }
    ```
  - **Lỗi hệ thống:**
    ```json
    {
      "error": "Lỗi khi cập nhật nhận xét: <chi tiết lỗi>"
    }
    ```

---

## 4. Route: **/reviews/:buyer_id/:product_id**

- **Phương thức:** `DELETE`
- **Mục đích:** Xoá một nhận xét cụ thể.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua (trong URL param).
  - `product_id` (string): ID của sản phẩm (trong URL param).
  - Body yêu cầu:
    - `order_id` (string): ID của đơn hàng liên quan đến nhận xét.

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "message": "Xóa nhận xét thành công"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "order_id là bắt buộc để xóa nhận xét"
    }
    ```
  - **Không tìm thấy nhận xét:**
    ```json
    {
      "message": "Không tìm thấy review phù hợp để xóa"
    }
    ```
  - **Lỗi hệ thống:**
    ```json
    {
      "error": "Lỗi khi xóa nhận xét: <chi tiết lỗi>"
    }
    ```

---
