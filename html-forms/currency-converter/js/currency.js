'use strict';

const from = document.getElementById('from');
const to = document.getElementById('to');
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const source = document.getElementById('source');
const result = document.getElementById('result');

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://neto-api.herokuapp.com/currency");
xhr.send();

function onLoad() {
  try {
    const data = JSON.parse(xhr.responseText);

    function currencyCalc() {
      const fromCurrency = data.find((el) => {
        return el.code === from.value
      });
      const toCurrency = data.find((el) => {
        return el.code === to.value
      });
      result.value = Math.round(fromCurrency.value / toCurrency.value * source.value * 100) / 100;
    }

    for (let el of data) {
      from.innerHTML += `<option>${el.code}</option>`;
      to.innerHTML += `<option>${el.code}</option>`;
    }

    currencyCalc();
    source.addEventListener('input', currencyCalc);
    from.addEventListener('input', currencyCalc);
    to.addEventListener('input', currencyCalc);
  } catch (err) {
    console.log(`Возникла ошибка при чтении данных: ${err}`);
  }
}

function onLoadStart() {
  loader.classList.remove('hidden');
}

function onLoadEnd() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');
}

xhr.addEventListener("load", onLoad);
xhr.addEventListener("loadstart", onLoadStart);
xhr.addEventListener("loadend", onLoadEnd);