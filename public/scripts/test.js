const names = [
  { name: 'Nally', price: '10.00' },
  { name: 'Andy', price: '11.00' },
  { name: 'Andy', price: '11.00' },
  { totalPrice: '35.84' }
];


const index = names.findIndex(x => x.name === "Nally");
console.log(index);
