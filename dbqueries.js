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

const getPriceByItemID = function(id) {
  return db.query('SELECT price FROM menu_items WHERE id = $1',[id])
    .then(price => {
      return price.rows;
    });
};

const getNameByItemID = function(id) {
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
  GROUP BY orders.id, menu_items.name, menu_items.price
  `;
  return db
    .query(queryString,[userID])
    .then(details => {
    //console.log(details.rows)
      return details.rows;
    }).catch(err => {
      console.log(err.message);
    });
};

const getTotalCostByActive = function(userID) {
  const queryString = `
  SELECT orders.id as order_number, SUM(menu_items.price) as total_price
  FROM order_items
  JOIN orders ON orders.id = order_items.order_id
  JOIN menu_items ON order_items.menu_items_id = menu_items.id
  JOIN users ON users.id = orders.user_id
  WHERE users.id = $1 AND active = TRUE
  GROUP BY orders.id, users.name
  ORDER BY orders.id;
  `;

  return db
    .query(queryString,[userID])
    .then(totalcost => {
      console.log(totalcost.rows);
      return totalcost.rows;
    }).catch(err => {
      console.log(err.message);
    });
};

const getMenu = function() {
  return db
  .query(`SELECT name, price, photo, description FROM menu_items`)
  .then(menu => {
    return menu.rows
  }).catch (err => {
    console.log(err.message)
  })
}



module.exports = {getUsers, getUserByID, getActiveOrders, getTotalCostByActive, getMenu, getPriceByItemID}
