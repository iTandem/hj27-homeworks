'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', () => {
  showBubbles(connection);
});

document.addEventListener('click', event => {
  const coord = {x: event.pageX, y: event.pageY};
  connection.send(JSON.stringify(coord));
});

window.addEventListener('beforeunload', () => {
  connection.onclose = function () {
  };
  connection.close();
});