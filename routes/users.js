/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();


module.exports = (db) => {


    //for AJAX to get DB INFO
    router.get('/getmyorders', (req,res) => {
      db.getActiveOrders(req.cookies['user'])
      .then(results => {
        res.json(results) //gets all active orders for a user in a array of objs
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



  router.get("/del", (req, res) => {
    res.clearCookie('user');
    res.send('cookies cleared.')
  })

  router.get('/:id/login', (req,res) => {
    res.cookie('user',req.params.id);
    res.send('logged in')
  })



  router.get("/:id", (req, res) => {
     db.getUserByID(req.cookies['user'])
      .then(data => {
        res.json( data[0] );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/test', (req,res) => {
    if (!req.body) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    //console.log(JSON.parse(req.body))
    console.log(JSON.parse(req.body.test))
    //db.insert(req.body)


    res.redirect('/users/2/myorders');




  })


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
