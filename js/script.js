//  Язык + хвост ссылки
const saveHash = () => {
  return window.location.hash.split('/')[1] ? window.location.hash.split('/')[1] : '';
}

const select = document.querySelector('select');
const allLang = ['#en', '#ca', '#au', '#nz', '#de',];

select.addEventListener('change', changeURLLanguage);

function changeURLLanguage() {
  let lang = '#' + select.value;
  window.location.assign(lang + '/' + saveHash());
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;

  if (!allLang.includes(hash.split('/')[0])) {
    window.location.assign('#en' + saveHash());
    location.reload();
  }
  select.value = hash.split('/')[0].split('#')[1];
  for (let key in langArr) {
    let elem = document.querySelector('.lng-' + key);
    if (elem) {
      elem.innerHTML = langArr[key][hash.split('/')[0].split('#')[1]];
    }
  }
  console.log('changeLANGUAGE');
}

changeLanguage();

const setPrefLang = () => {
  if (window.sessionStorage.getItem("prefLanguage")) {
    return;
  } else {
    const browserLanguage = window.navigator.language;
    const allLang = ['#en', '#ca', '#au', '#nz', '#de',];
    const globalLangSelected = '#' + browserLanguage.split("-")[0].toString();
    if (allLang.includes(globalLangSelected)) {
      window.sessionStorage.setItem('prefLanguage', globalLangSelected);
      const langIndex = allLang.indexOf(globalLangSelected);
      window.location.assign(allLang[langIndex] + '/' + saveHash());
      window.location.reload();
    } else {
      const defaultLanguage = '#en'
      window.sessionStorage.setItem('prefLanguage', defaultLanguage)
      const langIndex = allLang.indexOf(defaultLanguage);
      window.location.assign(allLang[langIndex] + '/' + saveHash());
      window.location.reload();
    }
  }
};
setPrefLang();

// Слайдер
const swiper = new Swiper('.swiper', {
  spaceBetween: 50,
  centeredSlides: true,
  speed: 3000,
  autoplay: {
    delay: 1000,
  },
  loop: true,
  slidesPerView: 5,
  allowTouchMove: false,
  disableOnInteraction: true,
  autoHeight: true,
  // slidesPerGroup: 2,
  centeredSlides: true,
  breakpoints: {
    800: {
      slidesPerView: 10,
    }
  },
});
