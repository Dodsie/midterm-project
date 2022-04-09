SELECT orders.id as order_number, menu_items.name, menu_items.price
FROM order_items
JOIN orders ON orders.id = order_items.order_id
JOIN menu_items ON menu_items.id = order_items.menu_items_id
JOIN users ON orders.user_id = users.id
WHERE users.id = 2 AND active = TRUE
GROUP BY orders.id, menu_items.name, menu_items.price
