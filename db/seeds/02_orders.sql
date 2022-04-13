INSERT INTO orders (user_id, address, order_date, total)
VALUES (2,'somewhere in van', '2022-08-11 12:05:11', '41.44');

-- new order on another day
INSERT INTO orders (user_id, address, order_date, total)
VALUES (2,'somewhere in van', '2022-09-11 14:22:53' , '12.32');


-- new order on another day
INSERT INTO orders (user_id, address, order_date, total)
VALUES (2,'somewhere in van', '2022-11-22 4:44:12', '2.24');

-- new order by new user
INSERT INTO orders (user_id, address, order_date, total, active)
VALUES (3,'somewhere in van', '2022-12-1 7:7:11', '22.4', FALSE);



