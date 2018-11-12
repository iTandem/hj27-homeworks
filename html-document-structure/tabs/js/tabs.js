'use strict';

const tabsContainer = document.getElementById('tabs');
const nav = tabsContainer.querySelector('.tabs-nav');
const content = tabsContainer.querySelector('.tabs-content');

function onLoad() {
  let tabTmp = nav.firstElementChild.cloneNode(true);
  nav.innerHTML = '';

  for (let child of content.children) {
    if (child !== content.firstElementChild) {
      child.classList.add('hidden');
    }
    tabTmp.querySelector('a').textContent = child.dataset.tabTitle;
    tabTmp.querySelector('a').classList.add(child.dataset.tabIcon);
    nav.appendChild(tabTmp.cloneNode(true));
    tabTmp.querySelector('a').classList.remove(child.dataset.tabIcon);
  }

  nav.firstElementChild.classList.add('ui-tabs-active');
  const tabs = nav.getElementsByTagName('li');

  for (let tab of tabs) {
    tab.addEventListener('click', (event) => {
      nav.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active');
      event.currentTarget.classList.add('ui-tabs-active');
      for (let child of content.children) {
        if (child.dataset.tabTitle === tab.textContent) {
          child.classList.remove('hidden');
        } else {
          child.classList.add('hidden');
        }
      }
    })
  }
}

window.addEventListener('load', onLoad);