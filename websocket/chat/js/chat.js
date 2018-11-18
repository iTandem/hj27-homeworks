'use strict';

const chat = document.querySelector('.chat');
const form = chat.querySelector('.message-box');
const input = form.querySelector('.message-input');
const submit = form.querySelector('.message-submit');
const content = chat.querySelector('.messages-content');
const chatTitle = chat.querySelector('.chat-title');
const name = chatTitle.querySelector('h1');
const chatStatus = chat.querySelector('.chat-status');
const messagesTmp = chat.querySelector('.messages-templates');
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

function currentTime() {
  let date = new Date();
  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());
  if (hours.length === 1) {
    hours = '0' + hours;
  }
  if (minutes.length === 1) {
    minutes = '0' + minutes;
  }
  return `${hours}:${minutes}`;
}

function changeStatus(str) {
  const status = messagesTmp.querySelector('.message-status').cloneNode(true);
  status.firstElementChild.textContent = str;
  content.appendChild(status);
}

connection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.dataset.online;
  submit.removeAttribute('disabled');
  changeStatus('Пользователь появился в сети');
});

connection.addEventListener('message', event => {
  if (event.data === '...') {
    let loading = messagesTmp.querySelector('.loading').cloneNode(true);
    loading.querySelector('.avatar img').setAttribute('src', chatTitle.querySelector('img').src);
    content.appendChild(loading);
    changeStatus(`${name.textContent} печатает сообщение`);
  } else {
    let message = messagesTmp.getElementsByClassName('message')[1].cloneNode(true);
    message.querySelector('.message-text').textContent = event.data;
    message.querySelector('.avatar img').setAttribute('src', chatTitle.querySelector('img').src);
    message.querySelector('.timestamp').textContent = currentTime();
    if (content.querySelector('.loading') !== null) {
      content.removeChild(loading.nextElementSibling);
      content.removeChild(loading);
    }
    content.appendChild(message);
  }
});

connection.addEventListener('close', () => {
  chatStatus.textContent = chatStatus.dataset.offline;
  submit.setAttribute('disabled', '');
  changeStatus('Пользователь не в сети');
});

connection.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

submit.addEventListener('click', event => {
  event.preventDefault();
  let message = messagesTmp.querySelector('.message-personal').cloneNode(true);
  message.querySelector('.message-text').textContent = input.value;
  message.querySelector('.timestamp').textContent = currentTime();
  content.appendChild(message);
  connection.send(input.value);
  input.value = '';
});

window.addEventListener('beforeunload', () => {
  chatStatus.textContent = chatStatus.dataset.offline;
  connection.onclose = function () {
  };
  connection.close(1000);
});