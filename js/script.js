// Форма
"use strict"

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form');
  const popup = document.getElementById('pop-up');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        // form.classList.remove('_sending');
        // popup.classList.add('open');
      }
    }
    // } else { alert('Заполните обязательные поля')}
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('._email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w{2,8})+$/.test(input.value);
  }

  // закрытие поп-апа
  // const close = document.getElementById('close_pop-up');
  // close.onclick = function () {
  //   form.reset();
  //   form.classList.remove('_sending');
  //   popup.classList.remove('open');
  // }
});

// pop-up =========================================
let popupBg = document.querySelector('.pop-up');
let popup = document.querySelector('.pop-up__body');
let openPopupButtons = document.querySelectorAll('.btn');
let closePopupButton = document.querySelector('.pop-up__close');

openPopupButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    popupBg.classList.add('open');
  })
});

closePopupButton.addEventListener('click', () => {
  popupBg.classList.remove('open');
  popup.classList.remove('open');
});

document.addEventListener('click', (e) => {
  if (e.target === popup) {
    popupBg.classList.remove('open');
    popup.classList.remove('open');
  }
});
