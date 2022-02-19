'use strict';

var gCtx;
var gElCanvas;
var gStartPos;
var gIsUpdateText = false;
var gUserImg;
var gImportImg = {
  isImport: false,
  src: '',
};
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function init() {
  // createImgs();
  renderPrimaryKeywords();
  renderMoreKeywords();
  renderGallery(getImgs());
  createCanvas();
  resizeCanvas();
  alignInitLines();
  renderMeme();
  addListeners();
  renderSticker();
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
    alignInitLines();
    createCanvas();
    renderMeme();
  });
  let elTextInput = document.querySelector('.input-txt');
  elTextInput.addEventListener('keyup', updateText);
}

function alignInitLines() {
  let meme = getMeme();
  var heightPos = 60;
  meme.lines.forEach(line => {
    line.posX = gElCanvas.width / 2;
    line.posY = heightPos;
    heightPos = gElCanvas.height - 40;
  });
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', onMove);
  gElCanvas.addEventListener('mousedown', onDown);
  gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', onMove);
  gElCanvas.addEventListener('touchstart', onDown);
  gElCanvas.addEventListener('touchend', onUp);
}

function createCanvas() {
  gElCanvas = document.getElementById('canvas');
  gCtx = gElCanvas.getContext('2d');
}

function resizeCanvas() {
  var elContainer = document.querySelector('.canvas-container');
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = elContainer.offsetHeight;
}

function updateText() {
  let elTxtVal = document.querySelector('.input-txt').value;
  if (!gIsUpdateText) return;
  updateLineTxt(elTxtVal);
  renderMeme();
  focused();
}

function renderMeme() {
  var meme = getMeme();
  drawImg(meme);
  drawLines(meme);
  drawStickers(meme);
}

function onSetNextPage(operator) {
  setNextPage(operator);
  renderSticker();
}

function onSetFilter(filterBy) {
  setFilter(filterBy);
  var images = getImgsForDisplay();
  renderGallery(images);
}

function renderSticker() {
  let stickers = getStickers();
  console.log(stickers);
  let strHTML = `<img
  class="prevPage"
  src="icons/left-arrow.png"
  onclick="onSetNextPage(-1)"
  alt=""
  />`;
  strHTML += stickers
    .map(sticker => {
      return `
    <img src="stickers/${sticker}.png" class="sticker sticker-${sticker}" onclick="onAddSticker(${sticker})">
      `;
    })
    .join('');
  strHTML += `<img
  class="nextPage"
  src="icons/right-arrow.png"
  onclick="onSetNextPage(1)"
  alt=""
/>`;
  document.querySelector('.stickers-container').innerHTML = strHTML;
}

function renderSavedMemes() {
  document.querySelector('.gallery').classList.remove('hidden');
  document.querySelector('.editor').classList.add('hidden-opacity');
  gImportImg.isImport = false;
  let memes = getSavedMemes();
  var strHTML = memes
    .map((meme, idx) => {
      return `
    <img class="user-meme user-meme-${idx}" src="${meme.url}" alt="" onclick="onUserMeme(${idx})">
    `;
    })
    .join('');
  if (!memes.length) strHTML = '<h1>There are no saved memes to display</h1>';

  document.querySelector('.gallery').innerHTML = strHTML;
}

function onUserMeme(idx) {
  var savedMemes = getSavedMemes();
  var meme = getMeme();
  gMeme = savedMemes[idx];
  gUserImg = savedMemes[idx].url;

  renderMeme();
  drawLines(gMeme);
  drawStickers(gMeme);

  hideGallery();
}

function onAddText() {
  const txt = document.querySelector('.input-txt').value.trim();
  if (!txt) return;
  let posY = gElCanvas.height / 2;
  let posX = gElCanvas.width / 2;
  setLineTxt(txt, posY, posX);
  renderMeme();
  document.querySelector('.input-txt').value = '';
}

function onAddSticker(id) {
  let posY = gElCanvas.height / 2;
  let posX = gElCanvas.width / 2;
  setSticker(id, posY, posX);
  renderMeme();
}

function drawSticker(sticker) {
  var elImg = document.querySelector(`.sticker-${sticker.id}`);
  gCtx.drawImage(elImg, sticker.posX, sticker.posY, sticker.size, sticker.size);
}

function drawStickers(meme) {
  meme.stickers.forEach(sticker => {
    drawSticker(sticker);
  });
}

function drawLines(meme) {
  meme.lines.forEach(line => {
    drawText(line);
  });
}

function onSaveMeme() {
  var imgUrl = gElCanvas.toDataURL('img/jpg');
  saveMeme(imgUrl);
}

function onFillcolor() {
  var color = document.querySelector('.fill-color').value;
  fillColor(color);
  renderMeme();
  focused();
}

function onStrokeColor() {
  var color = document.querySelector('.stroke-color').value;
  strokeColor(color);
  renderMeme();
  focused();
}
function onSwitchLine() {
  switchLine();
  renderMeme();
  gIsUpdateText = true;
  updateInputVal(getCurrLine().txt);
  focused();
}

function onRemoveLine() {
  removeLine();
  renderMeme();
  focused();
}

function onSelectFont() {
  let font = document.querySelector('.fonts-select').value;
  selectFont(font);
  renderMeme();
  focused();
}
function onChangeAligment(location) {
  changeAligment(location);
  renderMeme();
  focused();
}
function onChangeFontSize(operator) {
  changeFontSize(operator);
  renderMeme();
  focused();
}

function onKeyword(el) {
  let currKey = el.innerText.toLowerCase();
  updateKeywordSize(currKey);
  let currKeySize = getKeySize(currKey);
  if (currKeySize > 3) return;
  el.style.fontSize = currKeySize + 'em';
  onSetFilter(currKey);
}

function drawImg(meme) {
  var elImg = document.querySelector(`.img-${meme.selectedImgId}`);
  if (gUserImg) {
    elImg = new Image();
    elImg.src = `images/meme-imgs/${meme.selectedImgId}.jpg`;
  }

  if (gImportImg.isImport) {
    elImg = new Image();
    elImg.src = gImportImg.src;
  }

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(line) {
  let txt = line.txt;
  gCtx.lineWidth = 2;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.fillStyle = line.color;
  gCtx.textAlign = line.align;
  gCtx.strokeStyle = line.strokeColor;
  line.width = gCtx.measureText(txt).width;
  gCtx.fillText(txt, line.posX, line.posY);
  gCtx.strokeText(txt, line.posX, line.posY);
}

function focused() {
  let meme = getMeme();

  let line;
  let width;
  let height;
  let startX;
  let startY;
  if (meme.gIsClickOnSticker) {
    let currSticker = meme.stickers[meme.selectedStickerIdx];
    width = currSticker.size + 20;
    height = currSticker.size + 20;
    startY = currSticker.posY - 10;
    startX = currSticker.posX - 10;
  } else {
    if (meme.selectedLineIdx === -1) return;
    line = meme.lines[meme.selectedLineIdx];
    width = line.width + 20;
    height = line.size + 10;
    startY = line.posY - line.size;
    startX = line.posX - line.width / 2 - 10;
    switch (line.align) {
      case 'right':
        startX -= line.width / 2;
        break;
      case 'left':
        startX += line.width / 2;
        break;
    }
  }
  gCtx.beginPath();
  gCtx.rect(startX, startY, width, height);
  gCtx.strokeStyle = 'black';
  gCtx.stroke();
}

function clickedLineIndex(pos, meme) {
  return meme.lines.findIndex(line => {
    let lineX1Range = line.posX - line.width / 2;
    let lineX2Range = line.posX + line.width / 2;
    switch (line.align) {
      case 'right':
        lineX1Range = line.posX - line.width;
        lineX2Range = line.posX + line.size;
        break;
      case 'left':
        lineX1Range = line.posX;
        lineX2Range = line.posX + line.width + line.size;
    }
    return (
      pos.x >= lineX1Range &&
      pos.x <= lineX2Range &&
      pos.y <= line.posY + line.size / 2 &&
      pos.y >= line.posY - line.size
    );
  });
}

function clickedStickerIndex(pos, meme) {
  return meme.stickers.findIndex(sticker => {
    return (
      sticker.posY <= pos.y &&
      sticker.posY + sticker.size >= pos.y &&
      sticker.posX <= pos.x &&
      sticker.posX + sticker.size * 2 >= pos.x
    );
  });
}

function onDown(ev) {
  var meme = getMeme();
  const pos = getEvPos(ev);

  updateInputVal('');
  gIsUpdateText = false;
  renderMeme();

  var clickedLineIdx = clickedLineIndex(pos, meme);
  var clickedStickerIdx = clickedStickerIndex(pos, meme);

  meme.selectedLineIdx = -1;

  if (clickedStickerIndex < 0 && clickedLineIdx < 0) return;

  if (clickedLineIdx >= 0) {
    meme.selectedLineIdx = clickedLineIdx;
    gIsUpdateText = true;
    updateInputVal(getCurrLine().txt);
    meme.gIsClickOnSticker = false;
    focused();
    setLineDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
  } else if (clickedStickerIdx >= 0) {
    meme.gIsClickOnSticker = true;
    meme.selectedStickerIdx = clickedStickerIdx;
    setStickerDrag(true);
    focused();
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
  }
}

function updateInputVal(val) {
  document.querySelector('.input-txt').value = val;
}
function onMove(ev) {
  let line = getCurrLine();
  let sticker = getCurrSticker();

  if (line && line.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveCurrLine(dx, dy);
    gStartPos = pos;
    renderMeme();
    focused();
  }
  if (sticker === undefined) return;
  if (sticker.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveCurrSticker(dx, dy);
    gStartPos = pos;
    renderMeme();
    focused();
  }
}

function onUp(ev) {
  let sticker = getCurrSticker();
  setLineDrag(false);
  if (sticker === undefined) return;
  setStickerDrag(false);
  document.body.style.cursor = 'grab';
}

function renderPrimaryKeywords() {
  var keywords = getKeywordsMap();
  var strHTML = '';
  var sentinel = 0;
  for (const key in keywords) {
    if (sentinel > 3) break;
    strHTML += `<span style="font-size:${keywords[key]}rem;" class='keyword' onclick='onKeyword(this)'>${key}</span>`;
    sentinel++;
  }
  strHTML += ` <span class="more-keys" onclick="onMoreKeywords(this)">more...</span>`;
  document.querySelector('.keywords-container').innerHTML = strHTML;
}

function onMoreKeywords(el) {
  el.innerText = el.innerText === 'more...' ? 'less...' : 'more...';
  document
    .querySelector('.more-keywords-container')
    .classList.toggle('hidden-opacity');
}

function renderMoreKeywords() {
  var keywords = getKeywordsMap();
  var strHTML = '';
  var sentinel = 4;
  for (const key in keywords) {
    sentinel--;
    if (sentinel >= 0) continue;
    strHTML += `<span style="font-size:${keywords[key]}rem;" class='keyword' onclick='onKeyword(this)'>${key}</span>`;
  }
  document.querySelector('.more-keywords-container').innerHTML = strHTML;
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }

  return pos;
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg);
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader();

  reader.onload = function (event) {
    console.log('onload');
    var img = new Image();
    // Render on canvas
    img.onload = onImageReady.bind(null, img);
    img.src = event.target.result;
  };
  reader.readAsDataURL(ev.target.files[0]);
}

function renderImg(img) {
  gImportImg.isImport = true;
  gImportImg.src = img.src;
  hideGallery();
  renderMeme();
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}

function downloadImg(elLink) {
  var imgContent = gElCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}
