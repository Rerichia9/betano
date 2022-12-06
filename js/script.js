// Форма
import useApiMegapari from '/js/api/api_megapari.js';
('use strict');

document.addEventListener('DOMContentLoaded', function () {
  // DATA FOR REGISTRATION OM MEGAPARI.COM
  const regData = {
    country: 'PT', //*must
    currency: 'EUR', //*must
    email: '', //*must
    password: '', //*must
    phone: '',
    send_reg_data: '1', //*must
    tag: '',
    promocode: '',
    bonus_choice: '1', //*must
    need_parse_phone: '0', //*must
  };
  const requestRegister = useApiMegapari;

  const form = document.getElementById('form');
  const popup = document.getElementById('pop-up');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    // let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      // window.open('https://megapari.com/', '_self');
      // let response = await fetch('sendmail.php', {
      //   method: 'POST',
      //   body: formData
      // });
      // making registration api call with formed data
      const request = async () => {
        // console.log(regData);
        const resp = await requestRegister(regData);
        // console.log(resp);
        // @TODO: popup notification window after registration attempt
        if (resp.success == false) {
          alert(resp.message);
        } else {
          // alert(`login: ${resp.login}, password: ${resp.password}, deposit: ${resp.deposit}, main: ${resp.main}`)
          window.location.assign('https://megapari.com/user/auth/?requestToken=sxm8%21IAAAAL2tBkTYWFhVJLm8kxQUqXrXRXMuor0z3IlqkGjHGeAo4QAAAAF9c6ipWvr6UlB0a45-SghaLDoC0yovvxL3zNEoKTGZUydaEJWZtsLJNsumlWcA7tC5pv2DE-Kj-XvQmzCcxZyrrf6_mZpsWk6uwC0SOQ7kCJTeqZkzhrSU5IcFpcVlogeCCG_2GCFqpRl8Lb1uCYhMZ3RhI6H00O4Zbfe8GrjNcGRynfl7cPAQhXRUmbs7Q-t-s9vyjCIfqUuY-kwEVR4HvgIiI24Shpkvt5EQ6kqUAqjwvk7tkvlua_Cqv7WUYJsdy2ozk2Mm4IwzrF3VhMCchXQYzEDwTp-SIdEEeY7YjA&url=office/recharge');
        }
        // Failure data
        // {message: 'Multiple accounts registered on this e-mail!', success: false}
        // Success data
        // {login: 'value', password: 'value', deposit: 'user/auth/?requestToken=value&url=office/recharge', main: 'user/auth/?requestToken=value', success: true}
        // @TODO: end
      };
      request();
      // api call ends
      form.reset();
      form.classList.remove('_sending');
      // if (response.ok) {
      //   let result = await response.json();
      //   alert(result.message);
      //   form.reset();
      //   form.classList.remove('_sending');
      // } else {
      //   // form.classList.remove('_sending');
      //   // popup.classList.add('open');
      // }
    }
    // } else { alert('Заполните обязательные поля')}
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      // append email into registration form
      if (input.classList.contains('_email')) {
        regData['email'] = input.value;
      }
      if (input.classList.contains('_password')) {
        regData['password'] = input.value;
      }

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

      if (input.classList.contains('._password')) {
        if (passwordTest(input)) {
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

  function passwordTest(input) {
    return !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(input.value);
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
  });
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
