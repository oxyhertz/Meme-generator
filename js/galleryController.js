'use strict';

function renderGallery(images) {
  var strHTML = images
    .map(img => {
      return `
        <div class='item item-${img.id}'>
          <img class="gallery-img img-${img.id}" src="${img.url}" alt="" 
              onclick="onImgSelect(${img.id})">
        </div> `;
    })
    .join('');

  document.querySelector('.gallery').innerHTML = strHTML;
}

function hideGallery() {
  document.querySelector('.main-nav-container').classList.add('hidden');
  document.querySelector('.gallery').classList.add('hidden');
  document.querySelector('article').classList.add('hidden');
  document.querySelector('.editor').classList.remove('hidden-opacity');
}

function onImgSelect(id) {
  setImg(id);
  renderMeme();
  hideGallery();
}
