'use strict';
function renderGallery(images) {
  var strHTML = images
    .map(img => {
      return `
      <div class='item item-${img.id}'>
        <img class="gallery-img img-${img.id}" src="${img.url}" alt="" onclick="onImgSelect(${img.id})">
        </div>
        `;
    })
    .join('');

  document.querySelector('.gallery').innerHTML = strHTML;
}

function onImgSelect(id) {
  console.log('hi');
  setImg(id);
  renderMeme();
  document.querySelector('.gallery').classList.add('hidden');
  document.querySelector('.editor').classList.remove('hidden-opacity');
}
