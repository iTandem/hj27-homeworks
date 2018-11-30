'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

window.editor.addEventListener('update', event => {
  event.canvas.toBlob(snapshot => {
    ws.send(snapshot);
  });
});

ws.addEventListener('error', error => {
  console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('beforeunload', () => {
  ws.onclose = function () {
  };
  ws.close(1000);
});
