INSERT INTO orders (user_id, address, order_date, total)
VALUES (2,'somewhere in van', '2022-08-11', 37.5)
RETURNING orders.id;
