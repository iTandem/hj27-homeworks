'use strict';

function handleTableClick(event) {
  if (event.target.tagName === 'TH') {
    if (event.target.dataset.dir === '1') {
      event.target.dataset.dir = -1;
    } else {
      event.target.dataset.dir = 1;
    }
    table.dataset.sortBy = event.target.dataset.propName;
    sortTable(event.target.dataset.propName, event.target.dataset.dir);
  }
}
