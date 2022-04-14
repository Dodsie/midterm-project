const orderDetail = (x, data,admin) => {
  if (admin) {
    let orderBox;
    let result = [];
    for (const item of data) {
      if (item.order_number === x.id)  {
        orderBox = `
          <div class="row">
            <div id='allNames' class="col-md-8 col-lg-9">
              <p>${item.name}</p>
            </div>
            <div class="col-md-4 col-lg-3">
              <id='allPrices' p>$${(item.price).toFixed(2)}</p>
            </div>
          </div>
          `;
        result.push(orderBox);
      }
    }
    return result;
  } else {
    // CUSTOMERS
    let orderBox;
    let result = [];
    for (const item of data) {
      if (item.order_number === x.id)  {
        orderBox = `
          <div class="row">
            <div id='allNames' class="col-md-8 col-lg-9">
              <p>${item.name}</p>
            </div>
            <div class="col-md-4 col-lg-3">
              <id='allPrices' p>$${(item.price).toFixed(2)}</p>
            </div>
          </div>
          `;
        result.push(orderBox);
      }
    }
  return result;
  }



};


const otherDetails = (template,admin,eta) => {
  if (admin) {
    const total = (template.total);
    console.log(template)
    const receipt = `
        <div class="col-lg-8 col-xl-6">
          <div id="my-orders-box" class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">
            <div class="card-body p-5">
              <p class="lead fw-bold mb-5" style="color: #f37a27;">Purchase Reciept</p>
              <div class="row">
                <div class="col mb-3">
                  <p id="orderDate" class="small text-muted mb-1">Date And Time</p>
                  <p>${template.order_date}</p>
                </div>
                <div class="col mb-3">
                  <p class="small text-muted mb-1">Order No.</p>
                  <p id="orderNo">${template.id}</p>
                </div>
                <div class="col mb-3">
                  <p id="orderDate" class="small text-muted mb-1">Customer Name</p>
                  <p>${template.name}</p>
                </div>
              </div>

              <div id="itemList-${template.id}" class="mx-n5 px-5 py-4" style="background-color: #f2f2f2;">

              </div>

              <div class="row my-4">
                <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                  <p class="lead fw-bold mb-0" style="color: #f37a27;">$${total}</p>
                </div>
              </div>
              <div class="row my-4">
                <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                  <form id='testform' method="POST" action="/users/orderUpdate"/>
                  <dd id='testtext' type='text' name='randomtext'></dd>
                  <button type="submit" class="btn btn-out btn-primary btn-square btn-main" id="place-order">Complete</button>
                </form>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="horizontal-timeline">
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    return receipt;
  } else {
    const total = (template.total);
    const receipt = `
        <div class="col-lg-8 col-xl-6">
          <div id="my-orders-box" class="card border-top border-bottom border-3";">
            <div class="card-body p-5">
              <p class="lead fw-bold mb-5">Purchase Reciept</p>
              <div class="row">
                <div class="col mb-3">
                  <p id="orderDate" class="small text-muted mb-1">Date And Time</p>
                  <p>${template.order_date}</p>
                </div>
                <div class="col mb-3">
                  <p class="small text-muted mb-1">Order No.</p>
                  <p id="orderNo" >${template.id}</p>
                </div>
                <div class="col mb-3">
                  <p id="orderDate" class="small text-muted mb-1">ETA</p>
                  <p id="ETA"> Not Available </p>
                </div>
              </div>

              <div id="itemList-${template.id}" class="mx-n5 px-5 py-4" style="background-color: #f2f2f2;">
              </div>

              <div class="row my-4">
                <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                  <p class="lead fw-bold mb-0"">$${Number((total)).toFixed(2)}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="horizontal-timeline">
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;


    return receipt;
  }
};



const addinGSTPST = (x,admin) => {
  const GST = (x.total/1.12 * 0.05).toFixed(2)
  const PST = (x.total/1.12 * 0.07).toFixed(2)
  let taxes = `
        <div class="row">
          <div class="col-md-8 col-lg-9">
            <p>GST (5.00%)</p>
          </div>
          <div class="col-md-4 col-lg-3">
            <p> $${GST} </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8 col-lg-9">
            <p>PST (7.00%)</p>
          </div>
          <div class="col-md-4 col-lg-3">
            <p> $${PST} </p>
          </div>
        </div>
        `;
  return taxes;
};

const appendall = function(eta) {
  let admin = false;

  $.get('/users/checkadmin', (result) => {
    if (result) {
      admin = true;
    }
  }).then(()=>{
    if (admin) {
      $.get('/users/getAllActiveTotalsForAdmin', (orderSummary) => {
      }).then((template) => {
        $.get('/users/getAllActiveOrdersForAdmin',(allorderitems) => {
          for (const x of template) {
            $('#receiptBox').prepend(otherDetails(x,admin));
            $(`#itemList-${x.id}`).append(orderDetail(x,allorderitems,admin));
            $(`#itemList-${x.id}`).append(addinGSTPST(x,admin));
          }
        }).catch(err => console.log(err));
      });
    }
    else {
      $.get('/users/activeTotals', (orderSummary) => {
      }).then((template) => {
        $.get('/users/getmyorders',(allorderitems) => {
          for (const x of template) {

            $('#receiptBox').prepend(otherDetails(x,admin));

            for (const singleEta of eta) {
              console.log(singleEta)
              if (x.id == singleEta.id) {


                //console.log('AM DOING REPLACE NOW ON ID' ,template.id)
                $("#ETA").text(`${singleEta.eta} Minutes`)

              }
            }

            $(`#itemList-${x.id}`).append(orderDetail(x,allorderitems,admin));
            $(`#itemList-${x.id}`).append(addinGSTPST(x,admin));
          }
        }).catch(err => console.log(err));
      });
    }
  });

}

$(() => {
  let eta;



  $(document).on('submit','#testform',function(event) {
    event.preventDefault();
    console.log('clicked');
    const ordernumber = $(this).closest(":has(.row)").find('#orderNo').text()
    console.log(ordernumber)
    alert(`Order Number ${ordernumber} Completed!`)




    $.ajax({
      url: '/users/updateOrder',
      type: 'POST',
      data: {orderid: ordernumber}
    }).then(() => {
      window.location.replace('/users/1/myorders');
    })
   });

  $.get('/orders/etaTime', (time) => {
    console.log(time)
    eta = time;
    appendall(eta)


  })


});

