'use strict';

const content = document.querySelector('.content');
let script = document.createElement('script');
script.src = 'https://neto-api.herokuapp.com/profile/me?callback=callbackFunc';
document.querySelector('body').appendChild(script);

function callbackFunc(result) {
  content.querySelector('[data-name]').textContent = result.name;
  content.querySelector('[data-description]').textContent = result.description;
  content.querySelector('[data-position]').textContent = result.position;
  content.querySelector('[data-pic]').src = result.pic;
  script = document.createElement('script');
  script.src = `https://neto-api.herokuapp.com/profile/${result.id}/technologies?callback=handlerFunc`;
  document.querySelector('body').appendChild(script);
}

function handlerFunc(result) {
  for (let item of result) {
    let span = document.createElement('span');
    span.classList.add('devicons');
    span.classList.add(`devicons-${item}`);
    content.querySelector('[data-technologies]').appendChild(span);
  }
  content.style.display = 'initial';
}