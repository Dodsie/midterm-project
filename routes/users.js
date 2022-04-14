/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();

// http://localhost:8080/users
module.exports = (db) => {


  //for AJAX to get DB INFO
  router.get('/getmyorders', (req,res) => {
    db.getActiveOrders(req.cookies['user'])
      .then(results => {
        res.json(results); //gets all active orders for a user in a array of objs
      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //for AJAX to get DB INFO
  router.get('/activeTotals', (req,res) => {
    db.getTotalCostByUser(req.cookies['user'])
      .then(results => {
        res.json(results); //gets all active orders for a user in a array of objs
      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //for AJAX to get all Active Orders for Admin
  router.get('/checkadmin', (req,res) => {
    db.checkAdmin(req.cookies['user'])
      .then(admin => {
        res.send(admin[0].admin);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/getAllActiveTotalsForAdmin', (req,res) => {
    db.getAllActiveTotalsForAdmin()
      .then(result => {
        console.log(result);
        res.json(result);
      });
  });

  router.get('/getAllActiveOrdersForAdmin', (req,res) => {
    db.getAllActiveOrdersForAdmin()
      .then(result => {
        console.log(result);
        res.json(result);
      });
  });









  router.get("/del", (req, res) => {
    res.clearCookie('user');
    res.send('cookies cleared.');
  });

  router.get('/:id/login', (req,res) => {
    res.cookie('user',req.params.id);
    res.send('logged in');
  });




  router.post('/test', (req,res) => {
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    console.log(JSON.parse(req.body.test));
    const result = JSON.parse(req.body.test);
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '   ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log(date);
    const total = Number(result[result.length - 1].totalPrice);
    const itemList = result.slice(0,-1);
    db.insertToOrders(req.cookies['user'],date,total)
      .then((id) => {
        for (const item of itemList) {
          db.getMenuIDFromName(item.name)
            .then(menuid => {
              db.insertOrder_Items(id,menuid)
                .then(data => {
                  console.log('Inserted');
                });
            });
        }
      }).then(() => {
        res.redirect(`/users/${req.cookies['user']}/myorders`);
      });
  });

  //Update an ORDER to active = false upon click of button
  router.post('/updateOrder', (req,res) => {
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    console.log(typeof req.body.orderid);
    db.updateOrderStatus(req.body.orderid)
      .then(()=>{
        console.log('status updated');
        res.redirect(`/users/${req.cookies['user']}/myorders`);
      });
  });







  // MY ORDERS PAGE
  router.get('/:id/myorders', (req,res) => {
    let templateVars = {userID: req.cookies['user']};
    res.render("myOrders", templateVars);
  });




  router.get("/:id", (req, res) => {
    db.getUserByID(req.cookies['user'])
      .then(data => {
        res.json(data[0]);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    db.getUsers()
      .then(data => {
        const users = data.rows;
        res.json({users});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });





  return router;
};


