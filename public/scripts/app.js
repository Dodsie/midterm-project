// Client facing scripts here


//const menu_items = db.getMenu();
//console.log(menu_items);

function renderProducts() {
  const menuelement = `
  <div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">Fancy Product</h5>
                <!-- Product price-->
                $40.00 - $80.00
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
        </div>
    </div>
  </div>
  `
  return menuelement;
}

const menuelement = `
  <div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">Fancy Product</h5>
                <!-- Product price-->
                $40.00 - $80.00
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
        </div>
    </div>
  </div>
  `


  const menuitems = `
  <div id="product-boxes" class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
  <div id="individual-box" class="col mb-5">
      <div id="product-items" class="card h-100">
          <!-- Product image-->
          <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
          <!-- Product details-->
          <div id="product-descriptions" class="card-body p-4">
              <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">Item Name</h5>
                  <!-- Product description-->
                  <p>This will the where our product description goes. This will the where our product description goes.</p>
                  <!-- Product price-->
                  $Item price$
              </div>
          </div>
          <!-- Product actions-->
          <div id="add-to-cart" class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div id="cart-button" class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to order</a></div>
          </div>
      </div>
  </div>
  `

const $mainbody = $('<menu.items>')

$(() => {
  // const db = require('../../dbqueries');
  // const menu_items = db.getMenu();
  // console.log('hello');
  // $('.addtocart').on('click', (event) => {
  //   console.log('pressed')
  // })

  //console.log(typeof renderProducts());

  // $("#menuitems").append(menuitems)
  // $("#menuitems").append(menuitems)



})
