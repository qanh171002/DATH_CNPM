# Tài liệu API cho Quản lý Sản phẩm (Products)

## 1. Route: **/products/add**

### Phương thức: `POST`
- **Mục đích:** Thêm một sản phẩm mới vào hệ thống.
- **Dữ liệu yêu cầu:**
  - Body JSON:
    - `id` (string): ID của sản phẩm (tùy chọn, tự động sinh nếu không cung cấp).
    - `name` (string): Tên của sản phẩm.
    - `quantity` (integer): Số lượng sản phẩm trong kho.
    - `description` (string): Mô tả sản phẩm.
    - `price` (float): Giá của sản phẩm.
    - `seller_id` (string): ID của người bán (tuỳ chọn).
    - `category_id` (string): ID danh mục của sản phẩm (tuỳ chọn).
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    "Created"
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Chi tiết lỗi (tùy thuộc vào tình huống)"
    }
    ```

---

## 2. Route: **/products/:id**

### Phương thức: `GET`
- **Mục đích:** Lấy thông tin chi tiết của một sản phẩm.
- **Dữ liệu yêu cầu:**
  - URL Parameter:
    - `id` (string): ID của sản phẩm cần lấy thông tin.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "id": "string",
      "name": "string",
      "quantity": "integer",
      "description": "string",
      "price": "float",
      "seller_id": "string",
      "category_id": "string"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Chi tiết lỗi (tùy thuộc vào tình huống)"
    }
    ```

---

### Phương thức: `PUT`
- **Mục đích:** Cập nhật thông tin của một sản phẩm.
- **Dữ liệu yêu cầu:**
  - URL Parameter:
    - `id` (string): ID của sản phẩm cần cập nhật.
  - Body JSON:
    - Các trường cần thay đổi (các giá trị không được gửi sẽ giữ nguyên).
    - Ví dụ:
      ```json
      {
        "name": "Updated Product Name",
        "quantity": 100
      }
      ```
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {
      "field": "updated_value"
    }
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Chi tiết lỗi (tùy thuộc vào tình huống)"
    }
    ```

---

### Phương thức: `DELETE`
- **Mục đích:** Xóa một sản phẩm khỏi hệ thống.
- **Dữ liệu yêu cầu:**
  - URL Parameter:
    - `id` (string): ID của sản phẩm cần xóa.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    "Deleted"
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Chi tiết lỗi (tùy thuộc vào tình huống)"
    }
    ```

---

