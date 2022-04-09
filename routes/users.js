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
    console.log('the URL ID: ',req.params.id)
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


  //TESTING
  router.get('/:id/myorders', (req,res) => {
    Promise.all([db.getActiveOrders(req.params.id),db.getTotalCostByActive(req.params.id)])
      .then(results => {
        let final = results[0];
        for (const item of results[1]) {
          final.push(item)
        }
        res.json(final) //gets all active orders for a user in a array of objs
      }).catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });



  return router;
};
