'use strict';

const counter = document.getElementById('counter');
const buttonsWrap = document.querySelector('.wrap-btns');

function handler(event) {
  if (event.target.id === 'increment') {
    localStorage.counter++;
  }
  if (event.target.id === 'decrement') {
    if (localStorage.counter > 0) {
      localStorage.counter--;
    }
  }
  if (event.target.id === 'reset') {
    localStorage.counter = 0;
  }
  counter.textContent = localStorage.counter;
}

window.addEventListener('load', () => {
  if (localStorage.counter === undefined) {
    localStorage.counter = 0;
  }
  counter.textContent = localStorage.counter;
  buttonsWrap.addEventListener('click', handler);
});