'use strict';

const list = document.querySelectorAll('label');
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');

function check(event) {
  if (event.target.parentElement.classList.contains('done')) {
    undone.appendChild(event.target);
  } else {
    done.appendChild(event.target);
  }
}

for (const checkbox of list) {
  checkbox.addEventListener('click', check)
}