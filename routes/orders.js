const express = require('express');
const router  = express.Router();
const Order = require('../models/order');
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
    //sendSMS.sendSMS();
    //console.log('this is cookie' ,req.cookies['user'])
    let templateVars = {userID: req.cookies['user']};
    res.render('product-page', templateVars);

  });

  router.get("/about", (req, res) => {
    //sendSMS.sendSMS();
    res.render("about");

  });



  //ROUTER TWILLIO -------->>>>
  // GET: /orders
  // router.get('/', function(_req, res) {
  //   Order.find().then(function(orders) {
  //     res.render('orders/index', {orders});
  //   });
  // });

  // // GET: /orders/4
  // router.get('/:id/show', function(req, res) {
  //   const id = req.params.id;
  //   Order.findOne({_id: id}).then(function(order) {
  //     res.render('orders/show', {order: order});
  //   });
  // });

  // // POST: /orders/4/pickup
  // router.post('/:orderId/pickup', function(req, res) {
  //   const id = req.params.orderId;

  //   Order.findOne({_id: id}).then(function(order) {
  //     order.status = 'Shipped';
  //     order.notificationStatus = 'Queued';

  //     order.save()
  //       .then(function() {
  //         return order.sendSmsNotification('Your clothes will be sent and will be delivered in 20 minutes', getCallbackUri(req));
  //       })
  //       .then(function() {
  //         res.redirect(`/orders/${id}/show`);
  //       })
  //       .catch(function(err) {
  //         res.status(500).send(err.message);
  //       });
  //   });
  // });

  // // POST: /orders/4/deliver
  // router.post('/:orderId/deliver', function(req, res) {
  //   const id = req.params.orderId;

  //   Order.findOne({_id: id})
  //     .then(function(order) {
  //       order.status = 'Delivered';
  //       order.notificationStatus = 'Queued';
  //       order.save()
  //         .then(function() {
  //           return order.sendSmsNotification('Your clothes have been delivered', getCallbackUri(req));
  //         })
  //         .then(function() {
  //           res.redirect(`/orders/${id}/show`);
  //         })
  //         .catch(function(err) {
  //           res.status(500).send(err.message);
  //         });
  //     });
  // });


  // // POST: /orders/4/status/update
  // router.post('/:orderId/status/update', function(req, res) {
  //   const id = req.params.orderId;

  //   const notificationStatus = req.body.MessageStatus;

  //   Order.findOne({_id: id})
  //     .then(function(order) {
  //       order.notificationStatus = notificationStatus.charAt(0).toUpperCase() + notificationStatus.slice(1);
  //       return order.save();
  //     })
  //     .then(function() {
  //       res.sendStatus(200);
  //     })
  //     .catch(function(err) {
  //       res.status(500).send(err.message);
  //     });
  // });

  // function getCallbackUri(req) {
  //   return `http://${req.headers.host}/orders/${req.params.orderId}/status/update`;
  // }


  // return router;
};


//localhost:8080/orders/cart/
