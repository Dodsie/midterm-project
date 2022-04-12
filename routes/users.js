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
    console.log('empty for now')
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



  router.get("/:id", (req, res) => {
    res.cookie('testaccount',req.params.id);


    db.getUserByID(req.params.id)
      .then(data => {
        res.json( data[0] );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


    router.get('/:id/getmyorders', (req,res) => {
      db.getActiveOrders(req.params.id)
      .then(results => {
        res.json(results) //gets all active orders for a user in a array of objs
      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

    router.get('/:id/activeTotals', (req,res) => {
      db.getTotalCostByUser(req.params.id)
      .then(results => {
        res.json(results) //gets all active orders for a user in a array of objs
        console.log('did it get here')
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
