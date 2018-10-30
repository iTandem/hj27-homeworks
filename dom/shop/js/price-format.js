'use strict';

function getPriceFormatted(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const buttons = document.getElementsByClassName('add');

let finalPrice = 0;
let count = 0;

function cart(event) {
  count++;
  finalPrice += parseInt(event.target.dataset.price);
  document.getElementById('cart-total-price').innerHTML = getPriceFormatted(finalPrice);
  document.getElementById('cart-count').innerHTML = count;
}

for (let button of buttons) {
  button.addEventListener('click', cart)
}