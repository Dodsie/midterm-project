// Client facing scripts here

function renderProducts(data) {
  const res = [];
  for (const x of data) {
    const menuitem = `
    <div id="individual-box" class="col mb-5">
      <div id="product-items" class="card h-100">
          <!-- Product image-->
          <img class="card-img-top" src=${x.photo} alt="..." />
          <!-- Product details-->
          <div id="product-descriptions" class="card-body p-4">
              <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">${x.name}</h5>
                  <!-- Product description-->
                  <p>${x.description}</p>
                  <!-- Product price-->
                   Price: $${x.price}
              </div>
          </div>
          <!-- Product actions-->
          <div id="add-to-cart" class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div id="cart-button" class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to order</a></div>
          </div>
      </div>
    </div>
    `

    res.push(menuitem)
  }

  $("#product-boxes").append(res)

};




const $mainbody = $('<menu.items>')

$(() => {

  $.get('/orders/menu',(data,status) => {
    console.log(data[0]);
    renderProducts(data)
  })




});

