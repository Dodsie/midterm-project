SELECT orders.id, total, users.name
FROM orders JOIN users on users.id = orders.user_id
WHERE active=TRUE AND users.id = 2
GROUP by orders.id, users.name
