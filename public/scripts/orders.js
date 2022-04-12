// Client facing scripts here

const renderProducts = (data) => {
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
                   <br>
                   <div class="quantity buttons_added">
                 <input type="button" value="-" class="minus"><input type="number" step="1" min="1" max="" name="quantity" value="1" title="Qty" class="input-text qty text" size="4" pattern="" inputmode=""><input type="button" value="+" class="plus">
                   </div>
                   <br>
                   <button type='button' id='addtocart' class="btn btn-outline-dark mt-auto" >Add to order</button></div>
              </div>
          </div>
          <!-- Product actions-->
          <div id="add-to-cart" class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center">





            </div>
          </div>
      </div>
    </div>
    `;

    res.push(menuitem);
  }

  $("#product-boxes").append(res);

};


const cartCheckOut = () => {

  const checkoutbox = `
  <aside id="checkout-box" class="col-lg-3">
    <div class="card mb-3">
        <div class="card-body">
            <form>
                <div class="form-group"> <label>Have coupon?</label>
                    <div class="input-group"> <input type="text" class="form-control coupon" name="" placeholder="Coupon code"> <span class="input-group-append"> <button class="btn btn-primary btn-apply coupon">Apply</button> </span> </div>
                </div>
            </form>
        </div>
    </div>
    <div class="card">
        <div class="card-body">
            <dl class="dlist-align">
                <dt>Your items:</dt>
                <dd class="text-right ml-3">- Add your items here</dd>
            </dl>
            <dl class="dlist-align">
                <dt>Total price:</dt>
                <dd class="text-right ml-3">$69.97</dd>
            </dl>
            <dl class="dlist-align">
                <dt>Discount:</dt>
                <dd class="text-right text-danger ml-3">- $10.00</dd>
            </dl>
            <dl class="dlist-align">
                <dt>Total:</dt>
                <dd class="text-right text-dark b ml-3"><strong>$59.97</strong></dd>
            </dl>
            <hr>
            <div class="cart-buttons">
            <button type="submit" class="btn btn-out btn-primary btn-square btn-main" id="place-order"> Place Order </a>
              <form class="continue-shopping">
            <button type="submit" class="btn btn-out btn-success btn-square btn-main mt-2">Continue Shopping</button>
              </form>
            </div>
        </div>
    </div>
  </aside>
`;
  $(".checkout-side").append(checkoutbox);

};
cartCheckOut();




$(() => {

  $.get('/orders/menu',(data,status) => {
    //console.log(data[0]);
    renderProducts(data);
    //cartCheckOut();
  }).catch(err => console.log(err));





  $(document).on('click','#addtocart',function() {
    alert("button");
    console.log('test');
    console.log(this);
  });



});





