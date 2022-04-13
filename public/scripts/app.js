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

  $('.orders-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="users/2/myOrders";
  });


});
