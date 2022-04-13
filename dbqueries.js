// PG database client/connection setup
const res = require("express/lib/response");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(()=>{
  console.log(`connected to db ${process.env.DB_PORT}`);
});

const getUsers = function() {
  return db.query(`SELECT * FROM users;`)
    .then((allusers) => {
    //console.log(allusers)
      return allusers;
    }).catch(err => {
      console.log(err.message);
    });
};

// returns a single ID on the users/:ID page
const getUserByID = function(id) {
  return db.query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((user) => {
    //console.log('the user id info: ', user)
      return user.rows;
    }).catch(err => {
      console.log(err.message);
    });
};

const getMenuIDFromName = function(itemname) {
  return db
    .query(`SELECT menu_items.id
      FROM menu_items
      WHERE name = $1
      `,[itemname])
    .then(id => {
      return id.rows[0].id;
    });
};

const getOrderByID = function(orderID) {
  let info = [];
  return db.query('SELECT name FROM menu_items WHERE id = $1',[id])
    .then(name => {
      return name.rows;
    });
};

const getActiveOrders = function(userID) {
  const queryString = `
  SELECT orders.id as order_number, menu_items.name, menu_items.price
  FROM order_items
  JOIN orders ON orders.id = order_items.order_id
  JOIN menu_items ON menu_items.id = order_items.menu_items_id
  JOIN users ON orders.user_id = users.id
  WHERE users.id = $1 AND active = TRUE

  `;
  return db
    .query(queryString,[userID])
    .then(details => {
      console.log('THIS IS FROM ENTERING MY ORDERS PAGE ',details.rows)
      return details.rows;
    }).catch(err => {
      console.log(err.message);
    });
};

const getTotalCostByUser = function(userID) {
  const queryString = `
  SELECT orders.id, total, users.name, orders.order_date
  FROM orders JOIN users on users.id = orders.user_id
  WHERE active=TRUE AND users.id = $1
  GROUP by orders.id, users.name
  `;
  return db
    .query(queryString,[userID])
    .then(totalcost => {
      return totalcost.rows;
    }).catch(err => {
      console.log(err.message);
    });
};

const getMenu = function() {
  return db
    .query(`SELECT name, price, photo, description FROM menu_items`)
    .then(menu => {
      return menu.rows;
    }).catch(err => {
      console.log(err.message);
    });
};

const insertToOrders = function(userID, date, total) {
  return db
  .query(`
    INSERT INTO orders (user_id, address, order_date, total)
    VALUES ($1,'somewhere in van', $2, $3) RETURNING *;`,[userID,date,total])
  .then (update => {
    console.log('new order #', update.rows[0].id);
    return update.rows[0].id;
  })
  .catch (err => {
    console.log(err.message)
  })
}

const insertOrder_Items = function (orderid, menuid) {
  console.log('orderid',orderid, 'menu id: ',menuid)
  return db
  .query(`
    INSERT INTO order_items (order_id,menu_items_id)
    VALUES ($1, $2);
  `,[orderid, menuid])
  .then (result => {
    //console.log('did i make it here?')
  })
  .catch (err => {
    console.log(err.message)
  })
}



module.exports = {getUsers, getUserByID, getActiveOrders, getTotalCostByUser, getMenu, getMenuIDFromName, getOrderByID, insertToOrders, insertOrder_Items};
