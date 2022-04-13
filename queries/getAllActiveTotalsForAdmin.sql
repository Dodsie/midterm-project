SELECT orders.id as orderID, total, users.name, orders.order_date
  FROM orders JOIN users on users.id = orders.user_id
  WHERE active=TRUE
  GROUP by orders.id, users.name
