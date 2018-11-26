'use strict';

const slides = document.querySelector('.slides');
let currentSlide = slides.firstElementChild;
currentSlide.classList.add('slide-current');

const prevBtn = document.querySelector('[data-action = prev]');
const nextBtn = document.querySelector('[data-action = next]');
const firstBtn = document.querySelector('[data-action = first]');
const lastBtn = document.querySelector('[data-action = last]');

nextBtn.addEventListener('click', event => moveSlide('next'));
prevBtn.addEventListener('click', event => moveSlide('prev'));
firstBtn.addEventListener('click', event => moveSlide('first'));
lastBtn.addEventListener('click', event => moveSlide('last'));

function handler(slider) {
  switch (slider) {
    case 'next':
      return currentSlide.nextElementSibling;
    case 'prev':
      return currentSlide.previousElementSibling;
    case 'first':
      return slides.firstElementChild;
    case 'last':
      return slides.lastElementChild;
  }
}

function moveSlide(slider) {
  const activatedSlide = handler(slider);
  currentSlide.classList.remove('slide-current');
  activatedSlide.classList.add('slide-current');

  nextBtn.classList.toggle('disabled', activatedSlide.nextElementSibling === null);
  lastBtn.classList.toggle('disabled', activatedSlide.nextElementSibling === null);
  prevBtn.classList.toggle('disabled', activatedSlide.previousElementSibling === null);
  firstBtn.classList.toggle('disabled', activatedSlide.previousElementSibling === null);

  currentSlide = activatedSlide;
}