'use strict';

const images = [
  'airmax.png',
  'airmax-jump.png',
  'airmax-on-foot.png',
  'airmax-playground.png',
  'airmax-top-view.png'
];

const slider = document.getElementById('slider');

slider.src = `i/${images[0]}`;

let i = 0;

setInterval(() => {
  slider.src = `i/${images[++i % images.length]}`
}, 5000);

