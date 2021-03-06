const express = require('express');
const router  = express.Router();
const sendSMS = require('../sendSMS');

let eta = [];

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
    const time = req.body.Body

    db.getLastOrderID()
      .then((orderid) => {
        eta.push({id:orderid,eta:time})
        res.send(eta)
      }).then(() => {
        sendSMS.sendSMS(`CUSTOMER's MESSAGE--------------------\nYour Order ETA has been updated! Please check My Orders page.`)
      })

  })
  router.get('/etaTime', (req,res) => {
    res.send(eta)
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
