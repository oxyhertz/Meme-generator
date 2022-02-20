'use strict';
var gTrans = {
  import: {
    en: 'Import',
    he: 'יבא',
  },
  flexiable: {
    en: 'Flexiable',
    he: 'גמיש',
  },
  gallery: {
    en: 'Gallery',
    he: 'גלריה',
  },
  memes: {
    en: 'Memes',
    he: 'ממים',
  },
  about: {
    en: 'About',
    he: 'אודות',
  },
  'input-txt': {
    en: 'Eneter text',
    he: 'הכנס טקסט',
  },
  'download-img': {
    en: 'Download as jpeg',
    he: 'jpegהורד כ',
  },
  share: {
    en: 'Share',
    he: 'שתף',
  },
  rights: {
    en: 'all rights reserved 2022',
    he: 'כל הזכויות שמורות 2022',
  },
  'input-search': {
    en: 'Enter search keyword',
    he: 'הכנס מילת מפתח לחיפוש',
  },
};

var gCurrLang = 'en';

function getTransWord(key) {
  var keyObj = gTrans[key];
  return keyObj[gCurrLang];
}

function getTrans(transKey) {
  var keyTrans = gTrans[transKey];
  if (!keyTrans) return 'UNKNOWN';

  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans.en;

  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach(el => {
    // console.dir(el)
    var transKey = el.dataset.trans;
    var txt = getTrans(transKey);
    if (el.nodeName === 'INPUT') {
      // el.setAttribute('placeholder', txt)
      //THE SAME!
      el.placeholder = txt;
    } else el.innerText = txt;
  });
}

function setLang(lang) {
  gCurrLang = lang;
}
