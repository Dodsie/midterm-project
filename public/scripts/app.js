
$(document).ready(function() {

  $('.d-flex').on('submit', function(event) {
    event.preventDefault();
    window.location.href="cart";

  });

  $(".continue-shopping").on("submit", function(event) {
    event.preventDefault();
    console.log("button works again!");
    window.location.href="menu";
  });










});
