SELECT orders.id as order_number, SUM(menu_items.price) as total_price, users.name
FROM order_items
JOIN orders ON orders.id = order_items.order_id
JOIN menu_items ON order_items.menu_items_id = menu_items.id
JOIN users ON users.id = orders.user_id
GROUP BY orders.id, users.name
ORDER BY orders.id;


