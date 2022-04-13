SELECT order_items.id as order_itemID, users.name, users.id as userid ,orders.id as ORDERID
FROM order_items
JOIN orders ON order_items.order_id = orders.id
JOIN users ON users.id = orders.user_id
