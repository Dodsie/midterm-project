const orderDetail = (data) => {
  const checkoutbox = `
  <aside id="checkout-box" class="col-lg-3">
      <div class="card">
        <div class="card-body">
            <dl class="dlist-align">
                <dt id='yourItems'>Your items:</dt>

                test

            </dl>
            <dl class="dlist-align">
                <dt id='totalPrice'>Total price: </dt>
                <dd id='sum' class="text-right"> </dd>

                test


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
                <dd id='cartTotal' class="text-right text-dark b ml-3"><strong>$59.97</strong></dd>
            </dl>
            <hr>
            </div>
        </div>
    </div>
  </aside>`;

  $("#menuitems").append(checkoutbox);
};





$(() => {
  // const mycookie = req.cookies('testaccount')
  // console.log(mycookie)
  $.get('/users/2/getmyorders',(data,status) => {
    console.log(data);
    orderDetail(data);
  }).catch(err => console.log(err));


  $.get('/users/2/activeTotals', (data,status) => {
    console.log(data)
  })

});


