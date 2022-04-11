function getAllReservations() {
  let url = "/orders";
  return $.ajax({
    url,
  });
}
