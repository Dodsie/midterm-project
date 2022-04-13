SELECT order_items.order_id, order_items.menu_items_id, menu_items.name, users.name
FROM order_items
JOIN orders ON orders.id = order_items.order_id
JOIN menu_items ON order_items.menu_items_id = menu_items.id
JOIN users ON users.id = orders.user_id
WHERE orders.active = TRUE;
