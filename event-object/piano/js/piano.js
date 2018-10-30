'use strict';

const clavier = document.getElementsByClassName('set')[0];
const keys = clavier.getElementsByTagName('li');
const player = clavier.getElementsByTagName('audio');
const soundsLower = [
  'sounds/lower/first.mp3',
  'sounds/lower/second.mp3',
  'sounds/lower/third.mp3',
  'sounds/lower/fourth.mp3',
  'sounds/lower/fifth.mp3'];
const soundsMiddle = [
  'sounds/middle/first.mp3',
  'sounds/middle/second.mp3',
  'sounds/middle/third.mp3',
  'sounds/middle/fourth.mp3',
  'sounds/middle/fifth.mp3'];
const soundsHigher = [
  'sounds/higher/first.mp3',
  'sounds/higher/second.mp3',
  'sounds/higher/third.mp3',
  'sounds/higher/fourth.mp3',
  'sounds/higher/fifth.mp3'];

function changeSounds() {
  if (clavier.classList.contains('middle')) {
    for (let i = 0; i < soundsMiddle.length; i++) {
      player[i].src = soundsMiddle[i];
    }
  }

  if (clavier.classList.contains('lower')) {
    for (let i = 0; i < soundsLower.length; i++) {
      player[i].src = soundsLower[i];
    }
  }

  if (clavier.classList.contains('higher')) {
    for (let i = 0; i < soundsHigher.length; i++) {
      player[i].src = soundsHigher[i];
    }
  }
}

const pitch = {

  ShiftLeft() {
    clavier.classList.remove('lower');
    clavier.classList.add('middle');
  },

  ShiftRight() {
    return this.ShiftLeft();
  },

  AltLeft() {
    clavier.classList.remove('higher');
    clavier.classList.add('middle');
  },

  AltRight() {
    return this.AltLeft();
  }
};

function updateSound(event) {

  if (event.shiftKey) {
    clavier.classList.remove('middle');
    clavier.classList.add('lower');
  }

  if (event.altKey) {
    clavier.classList.remove('middle');
    clavier.classList.add('higher');
  }

  if (event.type === 'click') {
    changeSounds();
    event.currentTarget.getElementsByTagName('audio')[0].play();
  }
}

function updatePitch(event) {
  event.preventDefault();
  if (event.code in pitch) {
    pitch[event.code]();
  }
}

document.addEventListener('keydown', updateSound);
document.addEventListener('keyup', updatePitch);

for (let k of keys) {
  k.addEventListener('click', updateSound);
}