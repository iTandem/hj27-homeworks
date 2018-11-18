'use strict';

const container = document.querySelector('.container');

function callback(data) {
  container.querySelector('[data-wallpaper]').src = data.wallpaper;
  container.querySelector('[data-username]').textContent = data.username;
  container.querySelector('[data-description]').textContent = data.description;
  container.querySelector('[data-pic]').src = data.pic;
  container.querySelector('[data-tweets]').textContent = data.tweets;
  container.querySelector('[data-followers]').textContent = data.followers;
  container.querySelector('[data-following]').textContent = data.following;
}

const script = document.createElement('script');
script.src = 'https://neto-api.herokuapp.com/twitter/jsonp';
document.body.appendChild(script);