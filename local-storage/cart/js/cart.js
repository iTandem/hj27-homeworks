'use strict';

const form = document.getElementById('AddToCartForm');
const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const cart = document.getElementById('quick-cart');
const submit = document.getElementById('AddToCart');

function request(method, url, func, data) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', func);
  xhr.addEventListener('error', onError);
  xhr.open(method, url);
  xhr.send(data);
}

function onError() {
  console.log('Нет соединения с сервером');
}

function onLoadColors({target}) {
  const colors = JSON.parse(target.responseText);
  for (let color of colors) {
    colorSwatch.innerHTML += `<div data-value="${color.type}" class="swatch-element color ${color.type}"><div class="tooltip">${color.title}</div><input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}"><label for="swatch-1-${color.type}" style="border-color: ${color.type};"><span style="background-color: ${color.code};"></span><img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`;
    if (localStorage.color === color.type) {
      colorSwatch.lastElementChild.querySelector('input').setAttribute('checked', '');
    }
    if (localStorage.color === undefined && color.type === 'red') {
      colorSwatch.lastElementChild.querySelector('input').setAttribute('checked', '');
      localStorage.color = color.type;
    }
    if (color.isAvailable) {
      colorSwatch.lastElementChild.classList.add('available');
    } else {
      colorSwatch.lastElementChild.classList.add('soldout');
      colorSwatch.lastElementChild.querySelector('input').setAttribute('disabled', '');
    }
  }
}

function onLoadSizes({target}) {
  const sizes = JSON.parse(target.responseText);
  for (let size of sizes) {
    sizeSwatch.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type}"><input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}"><label for="swatch-0-${size.type}">${size.title}<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`;
    if (localStorage.size === size.type) {
      sizeSwatch.lastElementChild.querySelector('input').setAttribute('checked', '');
    }
    if (localStorage.size === undefined && size.type === 'xl') {
      sizeSwatch.lastElementChild.querySelector('input').setAttribute('checked', '');
      localStorage.size = size.type;
    }
    if (size.isAvailable) {
      sizeSwatch.lastElementChild.classList.add('available');
    } else {
      sizeSwatch.lastElementChild.classList.add('soldout');
      sizeSwatch.lastElementChild.querySelector('input').setAttribute('disabled', '');
    }
  }
}

function addItemToCart({target}) {
  const items = JSON.parse(target.responseText);
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += item.price * item.quantity;
    if (document.getElementById(`quick-cart-product-${item.productId}`) === null) {
      let div = document.createElement('div');
      cart.insertBefore(div, cartPay);
      div.outerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.productId}" style="opacity: 1;"><div class="quick-cart-product-wrap"><img src="${item.pic}" title="${item.title}"><span class="s1" style="background-color: #000; opacity: .5">$800.00</span><span class="s2"></span></div><span class="count hide fadeUp" id="quick-cart-product-count-${item.productId}">${item.quantity}</span><span class="quick-cart-product-remove remove" data-id="${item.productId}"></span></div>`;
      cart.querySelector('.quick-cart-product-remove').addEventListener('click', (event) => {
        let productId = cart.querySelector('.quick-cart-product-remove').dataset.id;
        const data = new FormData();
        data.append("productId", productId);
        return request('POST', 'https://neto-api.herokuapp.com/cart/remove', removeItemToCart, data);
      });
    } else {
      cart.querySelector('.count').textContent = item.quantity;
    }
  }
  cartPay.classList.add('open');
  cartPay.querySelector('#quick-cart-price').textContent = `$${totalPrice.toFixed(2)}`;
}

function removeItemToCart({target}) {
  const item = JSON.parse(target.responseText);
  if (item[0] === undefined) {
    cart.removeChild(cart.querySelector('.quick-cart-product'));
    cartPay.classList.remove('open');
  } else {
    let totalPrice = item[0].price * item[0].quantity;
    cart.querySelector('.count').textContent = item[0].quantity;
    cartPay.querySelector('#quick-cart-price').textContent = `$${totalPrice.toFixed(2)}`;
  }
}

function inLocalStorage(input) {
  if (input.name === 'color') {
    localStorage.color = input.value;
  }
  if (input.name === 'size') {
    localStorage.size = input.value;
  }
}

request('GET', 'https://neto-api.herokuapp.com/cart/colors', onLoadColors);
request('GET', 'https://neto-api.herokuapp.com/cart/sizes', onLoadSizes);

cart.innerHTML = '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico"><span><strong class="quick-cart-text">Оформить заказ<br></strong><span id="quick-cart-price"></span></span></a>';
const cartPay = document.getElementById('quick-cart-pay');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  data.append('productId', form.dataset.productId);
  return request('POST', 'https://neto-api.herokuapp.com/cart', addItemToCart, data);
});

window.addEventListener('load', () => {
  const inputs = form.querySelectorAll('input[type="radio"]');
  for (let input of inputs) {
    if (!(input.hasAttribute('disabled'))) {
      input.nextElementSibling.addEventListener('click', event => {
        inLocalStorage(input);
      });
    }
  }
});
