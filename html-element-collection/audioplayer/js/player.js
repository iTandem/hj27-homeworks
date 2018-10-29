'use strict';

const mediaplayer = document.getElementsByClassName('mediaplayer')[0];

const audio = mediaplayer.getElementsByTagName('audio')[0];

const playstateBtn = mediaplayer.getElementsByClassName('playstate')[0];

const stopBtn = mediaplayer.getElementsByClassName('stop')[0];

const backBtn = mediaplayer.getElementsByClassName('back')[0];

const nextBtn = mediaplayer.getElementsByClassName('next')[0];

const title = mediaplayer.getElementsByClassName('title')[0];

const trackList = ['LA Chill Tour.mp3', 'LA Fusion Jam.mp3', 'This is it band.mp3'];

playstateBtn.onclick = () => {
  mediaplayer.classList.contains('play') ? audio.pause() : audio.play();
  mediaplayer.classList.toggle('play');
};

stopBtn.onclick = () => {
  if (mediaplayer.classList.contains('play')) {
    mediaplayer.classList.remove('play');
  }

  audio.pause();
  audio.currentTime = 0;
};

let index = 0;

function currentSong() {
  audio.src = `mp3/${trackList[index]}`;

  title.title = trackList[index];

  if (mediaplayer.classList.contains('play')) {
    audio.play();
  }
}

nextBtn.onclick = () => {
  if (index >= trackList.length - 1) {
    index = 0;
  } else {
    index++;
  }

  currentSong();
};

backBtn.onclick = () => {
  if (index <= 0) {
    index = trackList.length - 1;
  } else {
    index--;
  }

  currentSong();
};