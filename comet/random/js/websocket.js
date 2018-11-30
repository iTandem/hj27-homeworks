'use strict';

const poolCards = document.querySelectorAll('.pooling div');
const longPoolCards = document.querySelectorAll('.long-pooling div');
const websocketCards = document.querySelectorAll('.websocket div');
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

function poolingRandomNum() {
  return fetch('https://neto-api.herokuapp.com/comet/pooling').then((res) => {
    return res.json();
  }).then((data) => {
    for (let card of poolCards) {
      card.classList.remove('flip-it');
      if ((card.textContent === data) || (card.textContent === String(data))) {
        card.classList.add('flip-it');
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}

setInterval(poolingRandomNum, 5000);

function longPoolingRandomNum(url) {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status === 404) {
      console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
      return;
    }
    if ((typeof xhr.responseText !== 'number') && (typeof xhr.responseText !== 'string')) {
      console.log('Получен некорректный формат данных от сервера');
      return;
    }
    for (let card of longPoolCards) {
      card.classList.remove('flip-it');
      if (Number(card.textContent) === Number(xhr.responseText)) {
        card.classList.add('flip-it');
      }
    }
    longPoolingRandomNum(url);
  });
  xhr.open("GET", url, true);
  xhr.send();

  xhr.addEventListener('error', () => {
    console.log('Ошибка сети. Не удалось подключиться к серверу');
  });
}

longPoolingRandomNum('https://neto-api.herokuapp.com/comet/long-pooling');

ws.addEventListener('message', (event) => {
  if ((typeof event.data !== 'number') && (typeof event.data !== 'string')) {
    console.log('Получен некорректный формат данных от сервера');
    return;
  }
  for (let card of websocketCards) {
    card.classList.remove('flip-it');
    if ((card.textContent === event.data) || (card.textContent === String(event.data))) {
      card.classList.add('flip-it');
    }
  }
});

ws.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
  ws.onclose = function () {
  };
  ws.close(1000);
});
