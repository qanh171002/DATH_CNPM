# Tài liệu API cho Quản lý Sản phẩm Trang Chủ (Home)
<!-- Đọc lướt -->
## 1. Route: **/**

### Phương thức: `GET`
- **Mục đích:** Lấy danh sách tất cả các sản phẩm trên trang chủ.
- **Dữ liệu yêu cầu:** 
  - Không yêu cầu.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "quantity": "integer",
        "description": "string",
        "price": "float",
        "seller_id": "string",
        "category_id": "string"
      }
    ]
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Chi tiết lỗi (tùy thuộc vào tình huống)"
    }
    ```

---

### Phương thức: `POST` (Test only)
- **Mục đích:** Thêm danh sách sản phẩm mẫu vào cơ sở dữ liệu (chỉ dành cho kiểm tra).
- **Dữ liệu yêu cầu:** 
  - Không yêu cầu.
- **Dữ liệu trả về:**
  - **Thành công:**
    ```json
    {}
    ```
  - **Lỗi:**
    ```json
    {
      "error": "Chi tiết lỗi (tùy thuộc vào tình huống)"
    }
    ```

---
