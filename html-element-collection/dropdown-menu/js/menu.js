'use strict';

const wrapper = document.getElementsByClassName('wrapper-dropdown')[0];

wrapper.onclick = () => {
  wrapper.classList.toggle('active')
};