'use strict';

const food = document.querySelector('.food');
let id;

function createScript(url) {
  let script = document.createElement('script');
  script.src = url;
  document.querySelector('body').appendChild(script);
}

function recipeDataFunc(result) {
  id = result.id;
  food.querySelector('[data-title]').textContent = result.title;
  let ing = result.ingredients.join(', ');
  food.querySelector('[data-ingredients]').textContent = ing;
  food.querySelector('[data-pic]').setAttribute('style', `background-image: url(${result.pic})`);
  createScript(`https://neto-api.herokuapp.com/food/${id}/rating?callback=ratingFunc`);
}

function ratingFunc(result) {
  food.querySelector('[data-rating]').textContent = result.rating.toFixed(2);
  food.querySelector('[data-votes]').textContent = `(${result.votes} оценок)`;
  const stars = food.querySelector('[data-star]');
  stars.setAttribute('style', `width: ${result.rating * 10}%`);
  createScript(`https://neto-api.herokuapp.com/food/${id}/consumers?callback=consumersFunc`);
}

function consumersFunc(result) {
  for (let person of result.consumers) {
    let img = document.createElement('img');
    img.src = person.pic;
    img.title = person.name;
    food.querySelector('[data-consumers]').appendChild(img);
  }
  food.querySelector('[data-consumers]').innerHTML += `<span>(+${result.total - 4})</span>`;
}

createScript('https://neto-api.herokuapp.com/food/42?callback=recipeDataFunc');