// Client facing scripts here

$(() => {
  // Nav bar button redirects to /
  $('.navbar-brand').on('click', function() {
    window.location.href="/";
  });

// Nav bar Cart button redirects to /orders
  $('#cart-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="/orders";
  });

  // Nav bar Home button redirts to /
  $('.home-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="/";
  });

  $('.about-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="/about";
  });
<<<<<<< HEAD
  //need to fix this
=======
//need to work on this
>>>>>>> 6f2ccab50d0f730b9ee71c0d241d9b54e98bfc2b
  $('.orders-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="users/2/myOrders";
  });



});
