<!-- Bấm Ctrl + Shift + V để xem OK hơn -->
# Tài liệu API cho Quản lý Giỏ hàng

## 1. Route: **/cart/:buyer_id**

- **Phương thức:** `GET`
- **Mục đích:** Lấy danh sách các sản phẩm trong giỏ hàng của một người mua cụ thể.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua.

- **Dữ liệu trả về:**
  - **Thành công:** kiểu
    ```json
    [
      {
        "id": "integer",
        "buyer_id": "integer",
        "product_id": "string",
        "quantity": "integer",
        "added_at": "string"
      }
      ...
    ]
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Lỗi khi truy xuất dữ liệu giỏ hàng"
    }
    ```

## 2. Route: **/cart/add**

- **Phương thức:** `POST`
- **Mục đích:** Thêm một sản phẩm vào giỏ hàng.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua.
  - `product_id` (string): ID của sản phẩm.
  - `quantity` (any): Số lượng sản phẩm cần thêm.

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "message": "Product added to cart"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Lỗi khi thêm sản phẩm vào giỏ hàng"
    }
    ```

## 3. Route: **/cart/update-quantity**

- **Phương thức:** `PUT`
- **Mục đích:** Cập nhật số lượng của một sản phẩm trong giỏ hàng.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua.
  - `product_id` (string): ID của sản phẩm.
  - `quantity` (any): Số lượng mới của sản phẩm.

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "message": "Quantity updated"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Lỗi khi cập nhật số lượng sản phẩm"
    }
    ```

## 4. Route: **/cart/remove**

- **Phương thức:** `DELETE`
- **Mục đích:** Xóa một sản phẩm ra khỏi giỏ hàng.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua.
  - `product_id` (string): ID của sản phẩm.

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "message": "Product removed from cart"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Lỗi khi xóa sản phẩm khỏi giỏ hàng"
    }
    ```

## 5. Route: **/cart/total/:buyer_id**

- **Phương thức:** `GET`
- **Mục đích:** Lấy tổng giá trị của các sản phẩm trong giỏ hàng của người mua.
- **Dữ liệu yêu cầu:**

  - `buyer_id` (string): ID của người mua.

- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "total": "float"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Lỗi khi tính tổng giá trị giỏ hàng"
    }
    ```

---
