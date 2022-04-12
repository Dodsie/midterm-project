// Client facing scripts here

function renderProducts() {
  $.get('/orders/menu',(data,status) => {
    console.log(data[0]);

    return menuitems = `
    <div id="individual-box" class="col mb-5">
      <div id="product-items" class="card h-100">
          <!-- Product image-->
          <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
          <!-- Product details-->
          <div id="product-descriptions" class="card-body p-4">
              <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">${data[0].name}</h5>
                  <!-- Product description-->
                  <p>This will the where our product description goes. This will the where our product description goes.</p>
                  <!-- Product price-->
                  ${data[0].price}
              </div>
          </div>
          <!-- Product actions-->
          <div id="add-to-cart" class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div id="cart-button" class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to order</a></div>
          </div>
      </div>
    </div>
    `
  }).then((menuitem) => {
    $("#product-boxes").append(menuitem)
  })
};




const $mainbody = $('<menu.items>')

$(() => {
  $(".continue-shopping").on("submit", function(event) {
    event.preventDefault();
    console.log("button works again!");
    $.get('/orders/menu',(data,status) => {
      console.log(data[0]);

    })
  });

  $('.d-flex').on('submit', function(event) {
    event.preventDefault();
    window.location.href="/orders/cart";
    console.log('button')

  });




});

