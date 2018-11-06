'use strict';

const toDoList = document.getElementsByClassName('list-block')[0];
const checkbox = toDoList.querySelectorAll('input[type="checkbox"]');
const li = toDoList.getElementsByTagName('li');
const result = toDoList.querySelector('output');

function todoCounter() {
  let counter = 0;
  for (let item of checkbox) {
    if (item.checked) {
      counter++;
    }
  }
  result.value = `${counter} из ${checkbox.length}`;
  if (counter === checkbox.length) {
    toDoList.classList.add('complete');
  } else {
    toDoList.classList.remove('complete');
  }
}

document.addEventListener('DOMContentLoaded', todoCounter);
for (let item of li) {
  item.addEventListener('click', todoCounter);
}