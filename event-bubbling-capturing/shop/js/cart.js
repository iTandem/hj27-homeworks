'use strict';

const itemsList = document.querySelector('.items-list');
const showMoreButton = document.querySelector('.show-more');

function onLoad() {
  itemsList.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList.contains('add-to-cart')) {
      let item = {
        title: event.target.dataset.title,
        price: event.target.dataset.price
      };
      addToCart(item);
    }
  });
}

window.addEventListener('load', onLoad);