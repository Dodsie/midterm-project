



// const $addToCart = (`<tr>
// <td>
//     <figure class="itemside align-items-center">
//         <div class="aside"></div>
//         <figcaption class="info"> <a href="#" class="title text-dark" data-abc="true">${name}</a>
//         </figcaption>
//     </figure>
// </td>
// <td> <input class="form-control" min="1" value="1">
//     </input>
// </td>
// <td>
//     <div class="price-wrap"> <var class="price">${price}</var>  </div>
// </td>
// <td class="text-right d-none d-md-block"> <a href="" class="btn btn-light" data-abc="true"> Remove</a> </td>
// </tr>`);





$(document).ready(function() {
  //order button to cart page
  $('.d-flex').on('submit', function(event) {
    event.preventDefault();
    window.location.href = "/orders/cart";

  });
  //continue shopping to orders/menu page
  $(".continue-shopping").on("submit", function(event) {
    event.preventDefault();
    console.log("button works again!");
    window.location.href = "/orders";
  });

  $(".button1").on("submit", function(event) {
    event.preventDefault();
    console.log("button works again!");
    window.location.href = "/";
  });


});
