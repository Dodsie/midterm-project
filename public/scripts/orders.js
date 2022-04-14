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
                    <p id="productprice">Price: $${x.price.toFixed(2)}</p>
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
  const newCartItem = `<div class="delete-button">
  <dd id="items-in-cart" STYLE="font-weight: 400" class="text-right ml-3"> ${productinfo.name} x1 $${productinfo.price}</dd>
  <button class="delete-button-cart"><i class="fa-solid fa-square-minus"></i></button>
  </div>`;
  totalPrice = totalPrice + Number(productinfo.price);
  const newSum = `<dd id='sum' class="text-right">$${totalPrice.toFixed(2)} </dd>`;

  const checkoutbox = `
  <aside id="checkout-box" class="col-lg-3">
    <div class="card mb-3">
        <div class="card-body" id="coupon-code">
            <form>
                <div class="form-group"> <label>Have coupon?</label>
                    <div class="input-group"> <input type="text" class="form-control coupon" name="" placeholder="Coupon code"> <span class="input-group-append"> <button class="btn btn-primary btn-apply coupon">Apply</button> </span> </div>
                </div>
            </form>
        </div>
    </div>
    <div class="card">

        <div class="card-body" id="checkout-box-bailey">
            <dl class="dlist-align">
                <dt id='yourItems'>Your items:</dt>

            </dl>
            <dl class="dlist-align">
                <dt id='totalPrice'>Total price: </dt>
                <dd id='sum' class="text-right"> </dd>


            </dl>
            <dl class="dlist-align">
                <dt>PST (7%):</dt>
                <dd id='PST' class="text-right text-danger ml-3"> 7.00%</dd>
                <dl class="dlist-align">
                <dt>GST (5%):</dt>
                <dd id='GST' class="text-right text-danger ml-3">  5.00%</dd>
            </dl>
            <dl class="dlist-align">
                <dt>Total:</dt>
                <dd id='cartTotal' class="text-right text-dark b ml-3"><strong>$0.00</strong></dd>
            </dl>
            <hr>
            <div class="cart-buttons">
              <form id='testform' method="POST" action="/users/test"/>

                <dd id='testtext' type='text' name='randomtext'></dd>
                <button type="submit" class="btn btn-out btn-primary btn-square btn-main" id="place-order">Place Order</button>
              </form>
              <form class="continue-shopping">
            <button type="submit" class="btn btn-out btn-success btn-square btn-main mt-2">Continue Shopping</button>
              </form>
            </div>
        </div>
    </div>
  </aside>`;
  const PST = (totalPrice * 0.07).toFixed(2);
  const GST = (totalPrice * 0.05).toFixed(2);
  const cartTotal = (Number(PST) + Number(GST) + totalPrice).toFixed(2);
  $('#PST').text(`$${PST}`);
  $('#GST').text(`$${GST}`);
  $("#yourItems").append(newCartItem);
  $("#sum").replaceWith(newSum);
  $('#cartTotal').text(`$${cartTotal}`);
  $(".checkout-side").replaceWith(checkoutbox);

  return Number(totalPrice);

};


$(() => {
  let totalPrice = 0;
  let arr = [];

  $.get('/orders/menu',(data,status) => {
    //console.log(data[0]);
    renderProducts(data);
    productdets = {};
    cartCheckOut(productdets);

  }).catch(err => console.log(err));



  $(document).on('click','#addtocart',function() {
    let parent = $(this);
    let productdets = {
      name: parent.siblings("#productname").text(),
      price : parent.siblings("#productprice").text().slice(8)
    };

    console.log(productdets);
    totalPrice = cartCheckOut(productdets,totalPrice);
    arr.push({
      name:parent.siblings("#productname").text(),
      price: parent.siblings("#productprice").text().slice(8)
    });
  });



  $(document).on('click','.delete-button-cart',function() {
    let parent =  $(this).parent();
    const child = parent.children(':first-child');

    let productdets = {
      name: child.text(),
      price : child.text().trim().slice(-5)
    };

    totalPrice = (totalPrice -= Number(productdets.price));


    const newSumRemove = `<dd id='sum' class="text-right">$${totalPrice.toFixed(2)} </dd>`;
    const PST = (totalPrice * 0.07).toFixed(2);
    const GST = (totalPrice * 0.05).toFixed(2);
    const cartTotal = (Number(PST) + Number(GST) + totalPrice).toFixed(2);
    $('#PST').text(`$${PST}`);
    $('#GST').text(`$${GST}`);
    $("#sum").replaceWith(newSumRemove);
    $('#cartTotal').text(`$${cartTotal}`);
    $(this).parent().remove();
    const indexOfItemDeleted = arr.findIndex(x => x.price == child.text().trim().slice(-5));
    arr.splice(indexOfItemDeleted,1);

  });

  $(document).on('submit','#testform',function(event) {
    event.preventDefault();
    console.log('clicked');
    arr.push({totalPrice:(totalPrice * 1.12).toFixed(2)});
    const stringarr = (JSON.stringify(arr));
    $.ajax({
      url: '/users/test',
      type: 'POST',
      data: {test:stringarr}
    }).then(data => {
      window.location.replace('/users/2/myorders');
    });
  });

});





