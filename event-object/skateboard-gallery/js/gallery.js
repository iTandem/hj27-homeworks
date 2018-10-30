'use strict';

const links = document.getElementsByTagName('a');
const img = document.getElementById('view');

function updateView(event) {
  for (let link of links) {
    event.preventDefault();
    link.classList.remove('gallery-current');
    console.log(link.href);
  }
  event.currentTarget.classList.add('gallery-current');
  img.src = event.currentTarget.href;
}

for (let link of links) {
  link.addEventListener('click', updateView);
}