'use strict';

const images = [
  'breuer-building.jpg',
  'guggenheim-museum.jpg',
  'headquarters.jpg',
  'IAC.jpg',
  'new-museum.jpg'
];

const prevBtn = document.getElementById('prevPhoto');
const nextBtn = document.getElementById('nextPhoto');
const photo =  document.getElementById('currentPhoto');

let i = 0;

photo.src = `i/${images[0]}`;

prevBtn.onclick = () => {
  i = !i ? images.length - 1 : --i;
  photo.src = `i/${images[i]}`;
};

nextBtn.onclick = () => {
  i = ++i % images.length;
  photo.src = `i/${images[i]}`;
};