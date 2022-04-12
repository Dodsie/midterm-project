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
                    <h5 id="productname" class="fw-bolder">${x.name}</h5>
                    <!-- Product description-->
                    <p id="productdesc">${x.description}</p>
                    <!-- Product price-->
                    <p id="productprice">Price: $${x.price}</p>
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


const cartCheckOut = (productinfo,totalPrice) => {
  const newCartItem = `<dd class="text-right ml-3"> ${productinfo.name} x1 $${productinfo.price}</dd>`
  totalPrice = totalPrice + Number(productinfo.price);
  const newSum = `<dd id='sum' class="text-right">$${totalPrice} </dd>`
  const GST = 5;
  const PST = 7;
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
                <dt id='yourItems'>Your items:</dt>

            </dl>
            <dl class="dlist-align">
                <dt id='totalPrice'>Total price: </dt>
                <dd id='sum' class="text-right"> </dd>




            </dl>
            <dl class="dlist-align">
                <dt>PST:</dt>
                <dd class="text-right text-danger ml-3"> 7.00%</dd>
                <dl class="dlist-align">
                <dt>GST:</dt>
                <dd class="text-right text-danger ml-3">  5.00%</dd>
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
  </aside>`;
  $("#yourItems").append(newCartItem)
  $("#sum").replaceWith(newSum);
  $(".checkout-side").replaceWith(checkoutbox);

  return Number(totalPrice)

};




$(() => {
  let totalPrice = 0;

  $.get('/orders/menu',(data,status) => {
    //console.log(data[0]);
    renderProducts(data);
    productdets ={};
    cartCheckOut(productdets);

  }).catch(err => console.log(err));






  $(document).on('click','#addtocart',function(){
    let parent = $(this)
    let productdets = {
      name: parent.siblings("#productname").text(),
      price : parent.siblings("#productprice").text().slice(8)
    };

    console.log (productdets)
    totalPrice = cartCheckOut(productdets,totalPrice);
  });





});





