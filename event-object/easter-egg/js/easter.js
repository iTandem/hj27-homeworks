'use strict';

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
let isPressed = '';

function easterEgg(event) {
  if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
    nav.classList.toggle('visible');
  }
  isPressed = isPressed + event.code;
  if (!(isPressed.indexOf('KeyYKeyTKeyNKeyJKeyKKeyJKeyUKeyBKeyZ') === -1)) {
    secret.classList.add('visible');
  }
}

document.addEventListener('keydown', easterEgg);
