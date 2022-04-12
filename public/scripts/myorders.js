const orderDetail = (x, data) => {
  let orderBox;
  let result =[];
  for (const item of data) {
    if(item.order_number === x.id)  {
      orderBox = `
        <div class="row">
          <div id='allNames' class="col-md-8 col-lg-9">
            <p>${item.name}</p>
          </div>
          <div class="col-md-4 col-lg-3">
            <id='allPrices' p>$${item.price}</p>
          </div>
        </div>
        `;
        result.push(orderBox)
    }
  }
  return result;
};


const otherDetails = (template,data) => {
    const total = (template.total*1.12).toFixed(2);
    const receipt = `

      <div class="col-lg-8 col-xl-6">
        <div class="card border-top border-bottom border-3" style="border-color: #f37a27 !important;">

          <div class="card-body p-5">
            <p class="lead fw-bold mb-5" style="color: #f37a27;">Purchase Reciept</p>
            <div class="row">
              <div class="col mb-3">
                <p id="orderDate" class="small text-muted mb-1">Date</p>
                <p>${template.order_date}</p>
              </div>
              <div class="col mb-3">
                <p id="orderNo" class="small text-muted mb-1">Order No.</p>
                <p>${template.id}</p>
              </div>
            </div>

            <div id="itemList-${template.id}" class="mx-n5 px-5 py-4" style="background-color: #f2f2f2;">



            </div>

            <div class="row my-4">
              <div class="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                <p class="lead fw-bold mb-0" style="color: #f37a27;">$${total}</p>
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
    `
  return receipt
};

const addinGSTPST = (x) => {
  const GST = (x.total * 0.05).toFixed(2)
  const PST = (x.total * 0.07).toFixed(2)
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

}



$(() => {
  $.get('/users/2/activeTotals', (data,status) => {
  }).then((template) => {
    $.get('/users/2/getmyorders',(data,status) => {
      for (const x of template) {
        $('#receiptBox').append(otherDetails(x))
        $(`#itemList-${x.id}`).append(orderDetail(x,data))
        $(`#itemList-${x.id}`).append(addinGSTPST(x))
      }
    }).catch(err => console.log(err));
  })
});


