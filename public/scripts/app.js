// Client facing scripts here
function wcqib_refresh_quantity_increments() {
  jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function(a, b) {
    let c = jQuery(b);
    c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />');
  });
}
String.prototype.getDecimals || (String.prototype.getDecimals = function() {
  let a = this,
    b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0;
}), jQuery(document).ready(function() {
  wcqib_refresh_quantity_increments();
}), jQuery(document).on("updated_wc_div", function() {
  wcqib_refresh_quantity_increments();
}), jQuery(document).on("click", ".plus, .minus", function() {
  let a = jQuery(this).closest(".quantity").find(".qty"),
    b = parseFloat(a.val()),
    c = parseFloat(a.attr("max")),
    d = parseFloat(a.attr("min")),
    e = a.attr("step");
  b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change");
});




$(() => {
  // Nav bar button redirects to /
  $('.navbar-brand').on('click', function() {
    window.location.href="/";
  });

// Nav bar Cart button redirects to /orders
  $('.d-flex').on('click', function(event) {
    event.preventDefault();
    window.location.href="/orders";
  });

  // Nav bar Home button redirts to /
  $('.home-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="/";
  });

  $('.about-button').on('click', function(event) {
    event.preventDefault();
    window.location.href="/";
  });


});
