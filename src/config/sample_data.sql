-- test data for api/full-customer-information-by-id

INSERT INTO Customer (
    customerCode,
    firstName,
    lastName,
    homeAddress,
    officeAddress,
    phoneNumber,
    email,
    dob,
    guardianConfirmation
) VALUES
    (UUID(), 'Alice', 'Nguyen', '123 Nguyen Trai', '456 Le Loi', '0901123456', 'admin1@hcmut.edu.vn', '1990-01-15', TRUE),
    (UUID(), 'Bob', 'Pham', '789 Tran Hung Dao', NULL, '0902123456', 'user1@hcmut.edu.vn', '1985-05-22', FALSE),
    (UUID(), 'Charlie', 'Tran', '321 Binh Tan', '654 Pham Van Dong', '0903123456', 'charlie.tran@example.com', '1995-07-10', TRUE),
    (UUID(), 'David', 'Le', '102 Hoang Hoa Tham', NULL, '0904123456', 'david.le@example.com', '2000-03-14', TRUE),
    (UUID(), 'Eve', 'Hoang', '456 Hai Ba Trung', '789 Tan Binh', '0905123456', 'eve.hoang@example.com', '1998-08-21', FALSE);

-- Thêm số điện thoại cho khách hàng vào bảng CustomerPhoneNumber
INSERT INTO CustomerPhoneNumber (phoneNumber, customerCode)
VALUES
    ('0901123456', (SELECT customerCode FROM Customer WHERE firstName = 'Alice')),
    ('0902123456', (SELECT customerCode FROM Customer WHERE firstName = 'Bob')),
    ('0903123456', (SELECT customerCode FROM Customer WHERE firstName = 'Charlie')),
    ('0904123456', (SELECT customerCode FROM Customer WHERE firstName = 'David')),
    ('0905123456', (SELECT customerCode FROM Customer WHERE firstName = 'Eve'));

CREATE TABLE user (
	id 			int not null auto_increment,
    email 		varchar(50) not null UNIQUE CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    password 	varchar(128) not null,
    role		varchar(50) not null default 'user',
    primary 	key (id)
);

-- TK: là email, MK: 123456
INSERT INTO user (email, password, role) VALUES
('admin1@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'admin'), 
('user1@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'user');