'use strict';

const form = document.getElementsByClassName('contentform')[0];
const main = document.getElementById('output');
const changeMes = main.getElementsByClassName('button-contact')[0];
const zip = form.querySelector('input[name="zip"]');
const submit = form.querySelector('button[type="submit"]');
const fields = form.querySelectorAll('input, textarea');

function zipFormCheck() {
  zip.value = zip.value.replace(/\D/g, '');
  for (let field of fields) {
    if (field.value === '') {
      if (!(submit.hasAttribute('disabled'))) {
        submit.setAttribute('disabled', '');
      }
      return;
    }
  }
  submit.removeAttribute('disabled');
}

function onChangeMes() {
  form.classList.remove('hidden');
  main.classList.add('hidden');
}

function onSubmit(event) {
  event.preventDefault();
  form.classList.add('hidden');
  main.classList.remove('hidden');
  for (let field of fields) {
    let i = field.getAttribute('name');
    if (i !== 'phone' && i !== 'email') {
      document.getElementById(i).value = field.value;
    }
  }
  changeMes.addEventListener('click', onChangeMes);
}

document.addEventListener('input', zipFormCheck);
submit.addEventListener('click', onSubmit);