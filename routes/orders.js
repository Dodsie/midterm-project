const express = require('express');
const router  = express.Router();
const sendSMS = require('../sendSMS')

//localhost:8080/orders/
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getMenu()
    .then (result => {
      res.json(result)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });




  // TEST ROUTE TO SEE IF GETPRICEBYITEMID WORK
  router.get("/cart/:id", (req, res) => {
    db.getPriceByItemID(req.params.id)
    .then (itemprice => {
      console.log(itemprice[0])
      res.json(itemprice[0].price)
    })
      .catch(err => {
        console.log('this is error')
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/menu", (req, res) => {
    sendSMS.sendSMS();
    res.render("product-page");

  });








  return router;
};


//localhost:8080/orders/cart/
