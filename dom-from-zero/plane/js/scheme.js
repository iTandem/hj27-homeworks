'use strict';

const plane = document.getElementById('acSelect');
const btnSeatMap = document.getElementById('btnSeatMap');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

btnSetFull.setAttribute('disabled', '');
btnSetEmpty.setAttribute('disabled', '');

function totalBarUpdate() {
  const adult = seatMapDiv.getElementsByClassName('adult');
  const half = seatMapDiv.getElementsByClassName('half');
  totalPax.textContent = adult.length + half.length;
  totalAdult.textContent = adult.length;
  totalHalf.textContent = half.length;
}

btnSeatMap.addEventListener('click', (event) => {
  event.preventDefault();
  fetch(`https://neto-api.herokuapp.com/plane/${plane.value}`).then((res) => {
    return res.json();
  }).then((data) => {
    seatMapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
    seatMapDiv.textContent = '';

    function planeRowTemplate(seatsNumber) {
      const seatingRow = document.createElement('div');
      seatingRow.classList.add('row');
      seatingRow.classList.add('seating-row');
      seatingRow.classList.add('text-center');

      const rowNumberDiv = document.createElement('div');
      rowNumberDiv.classList.add('col-xs-1');
      rowNumberDiv.classList.add('row-number');

      const rowNumber = document.createElement('h2');
      rowNumberDiv.appendChild(rowNumber);
      seatingRow.appendChild(rowNumberDiv);

      if (seatsNumber === 0) {
        return seatingRow;
      }

      const leftSeats = document.createElement('div');
      leftSeats.classList.add('col-xs-5');
      const rightSeats = document.createElement('div');
      rightSeats.classList.add('col-xs-5');

      for (let letter of data.letters6) {
        let seat = document.createElement('div');
        seat.classList.add('col-xs-4');
        if (seatsNumber === 4 && data.letters4.includes(letter) === false) {
          seat.classList.add('no-seat');
          if (data.letters6.indexOf(letter) < (data.letters6.length / 2)) {
            leftSeats.appendChild(seat);
          } else {
            rightSeats.appendChild(seat);
          }
        } else {
          seat.classList.add('seat');
          let seatLabel = document.createElement('span');
          seatLabel.classList.add('seat-label');
          seatLabel.textContent = letter;
          seat.appendChild(seatLabel);
          if (data.letters6.indexOf(letter) < (data.letters6.length / 2)) {
            leftSeats.appendChild(seat);
          } else {
            rightSeats.appendChild(seat);
          }
        }
      }
      seatingRow.appendChild(leftSeats);
      seatingRow.appendChild(rightSeats);
      return seatingRow;
    }

    for (let i = 0; i < data.scheme.length; i++) {
      seatMapDiv.appendChild(planeRowTemplate(data.scheme[i]));
      seatMapDiv.getElementsByTagName('h2')[i].textContent = i + 1;
    }

    totalBarUpdate();

    for (let seat of seatMapDiv.getElementsByClassName('seat')) {
      seat.addEventListener('click', (event) => {
        if (event.altKey) {
          event.currentTarget.classList.toggle('half');
          event.currentTarget.classList.remove('adult');
        }
        if (!event.altKey && !(event.currentTarget.classList.contains('half'))) {
          event.currentTarget.classList.toggle('adult');
        }
        if (!event.altKey && event.currentTarget.classList.contains('half')) {
          event.currentTarget.classList.remove('half');
        }
        totalBarUpdate();
      });
    }

    btnSetFull.removeAttribute('disabled');
    btnSetEmpty.removeAttribute('disabled');

    btnSetFull.addEventListener('click', (event) => {
      event.preventDefault();
      for (let seat of seatMapDiv.getElementsByClassName('seat')) {
        if (seat.classList.contains('half')) {
          seat.classList.remove('half');
        }
        seat.classList.add('adult');
      }
      totalBarUpdate();
    });

    btnSetEmpty.addEventListener('click', (event) => {
      event.preventDefault();
      for (let seat of seatMapDiv.getElementsByClassName('seat')) {
        if (seat.classList.contains('half')) {
          seat.classList.remove('half');
        }
        if (seat.classList.contains('adult')) {
          seat.classList.remove('adult');
        }
      }
      totalBarUpdate();
    });
  }).catch((err) => {
    console.log(err);
  })
});
