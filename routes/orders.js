const express = require('express');
const router  = express.Router();
const Order = require('../models/order');

let sometime;

//localhost:8080/orders/
module.exports = (db) => {
  router.get("/menu", (req, res) => {
    db.getMenu()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/smsupdate', (req, res) => {
    eta = req.body.Body
    console.log(req.body.Body)
    //console.log(idAndETA)
  })
  router.get('/etaTime', (req,res) => {
    //res.send(idAndETA)
  })



  router.get("/cart", (req, res) => {
    //empty for now can display menu items.
    res.render("cart")
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // TEST ROUTE TO SEE IF GETPRICEBYITEMID WORK
  router.get("/cart/:id", (req, res) => {
    db.getPriceByItemID(req.params.id)
      .then(itemprice => {
        console.log(itemprice[0]);
        res.json(itemprice[0].price);
      })
      .catch(err => {
        console.log('this is error');
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {

    let templateVars = {userID: req.cookies['user']};
    res.render('product-page', templateVars);

  });



  return router;
};


//localhost:8080/orders/cart/
