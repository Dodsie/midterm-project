SELECT orders.id as order_number, SUM(menu_items.price) as total_price
FROM order_items
JOIN orders ON orders.id = order_items.order_id
JOIN menu_items ON order_items.menu_items_id = menu_items.id
JOIN users ON users.id = orders.user_id
WHERE users.id = 2 AND active = TRUE
GROUP BY orders.id, users.name
ORDER BY orders.id;


