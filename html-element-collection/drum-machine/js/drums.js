'use strict';

const drums = document.getElementsByClassName('drum-kit__drum');

Array.from(drums).forEach(drum => {
  drum.onclick = () => {
    const wav = drum.getElementsByTagName('audio')[0];

    wav.currentTime = 0;
    wav.play();
  }
});