/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getUsers()
      .then(data => {
        const users = data.rows;
        res.json( {users} );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id/del", (req, res) => {
    res.clearCookie(req.params.id);
    res.send('cookies cleared.')
  })

  router.get('/:id/login', (req,res) => {
    res.cookie(req.params.id,req.params.id);
    res.send('logged in')
  })



  router.get("/:id", (req, res) => {
    db.getUserByID(req.cookies.testaccount)
      .then(data => {
        res.json( data[0] );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

    //for AJAX to get DB INFO
    router.get('/:id/getmyorders', (req,res) => {
      console.log(req.cookies.testaccount)
      db.getActiveOrders(req.params.id)
      .then(results => {
        res.json(results) //gets all active orders for a user in a array of objs
      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

    //for AJAX to get DB INFO
    router.get('/:id/activeTotals', (req,res) => {
      db.getTotalCostByUser(req.params.id)
      .then(results => {
        res.json(results) //gets all active orders for a user in a array of objs

      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });







    // MY ORDERS PAGE
    router.get('/:id/myorders', (req,res) => {
      res.render("myOrders")

      });



  return router;
};


 //TESTING
  // router.get('/:id/getmyorders', (req,res) => {
  //   Promise.all([db.getActiveOrders(req.params.id),db.getTotalCostByActive(req.params.id)])
  //     .then(results => {
  //       let final = results[0];
  //       for (const item of results[1]) {
  //         final.push(item)
  //       }
  //       res.json(final) //gets all active orders for a user in a array of objs
  //     }).catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  //   });
