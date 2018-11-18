'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');
const signInMessage = signInForm.querySelector('.error-message');
const signUpMessage = signUpForm.querySelector('.error-message');

function onError() {
  console.log('Нет подключения к серверу');
}

signInForm.querySelector('[type="submit"]').addEventListener('click', (event) => {
  event.preventDefault();
  const formData = new FormData(signInForm);
  const obj = {};
  for (let key of formData) {
    obj[key[0]] = key[1];
  }
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('error', onError);
  xhr.send(JSON.stringify(obj));

  function onLoad() {
    if (xhr.status !== 200) {
      console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
      return;
    }
    const response = JSON.parse(xhr.responseText);
    if (response.error) {
      signInMessage.value = response.message;
    } else {
      signInMessage.value = `Пользователь ${response.name} успешно авторизован`;
    }
  }
});

signUpForm.querySelector('[type="submit"]').addEventListener('click', (event) => {
  event.preventDefault();
  const formData = new FormData(signUpForm);
  const obj = {};
  for (let key of formData) {
    obj[key[0]] = key[1];
  }
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);
  xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener('error', onError);
  xhr.send(JSON.stringify(obj));

  function onLoad() {
    if (xhr.status !== 200) {
      console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
      return;
    }
    const response = JSON.parse(xhr.responseText);
    if (response.error) {
      signUpMessage.value = response.message;
    } else {
      signUpMessage.value = `Пользователь ${response.name} успешно зарегистрирован`;
    }
  }
});