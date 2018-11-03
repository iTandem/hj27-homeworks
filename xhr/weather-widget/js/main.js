'use strict';

const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather');
request.send();

function onLoad() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}
