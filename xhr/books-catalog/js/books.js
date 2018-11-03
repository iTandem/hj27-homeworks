'use strict';

const xhr = new XMLHttpRequest();
const booksList = document.getElementById('content');

xhr.addEventListener('load', onLoad);
xhr.open('GET', 'https://neto-api.herokuapp.com/book');
xhr.send();

function onLoad(event) {
  if (xhr.status !== 200) {
    console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
  } else {
    const data = JSON.parse(xhr.responseText);
    booksList.innerHTML = '';
    let i = 0;
    for (let book of data) {
      booksList.innerHTML += `<li><img src="${book.cover.small}"></li>`;
      const item = booksList.getElementsByTagName('li')[i];
      item.dataset.title = book.title;
      item.dataset.author = book.author.name;
      item.dataset.info = book.info;
      item.dataset.price = book.price;
      i++;
    }
  }
}

