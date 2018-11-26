'use strict';

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
  }
  if (typeof node === 'object') {
    const element = document.createElement(node.name);
    if (node.props !== null) {
      Object.keys(node.props).forEach(key => {
        element.setAttribute(key, node.props[key]);
      });
    }
    node.childs.forEach(item => {
      if (typeof item === 'string') {
        let text = document.createTextNode(item);
        element.appendChild(text);
      }
      if (typeof item === 'object') {
        element.appendChild(createElement(item));
      }
    });
    return element;
  }
}