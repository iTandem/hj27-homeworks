'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

function randomNum(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function generateSky() {
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.fillRect(0, 0, 800, 400);
  let starsNumber = randomNum(200, 400);
  for (let i = 0; i <= starsNumber; i++) {
    ctx.beginPath();
    let index = randomNum(0, (colors.length - 1));
    ctx.fillStyle = colors[index];
    ctx.globalAlpha = Math.random() * 1.2 + 0.8;
    let x = randomNum(0, 300);
    let y = randomNum(0, 150);
    let size = Math.random() * 1.1;
    ctx.fillRect(x, y, size, size);
  }
}

window.addEventListener('load', generateSky);

canvas.addEventListener('click', () => {
  generateSky();
});