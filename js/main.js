'use strict';

var gCtx;
var gElCanvas;
var gStartPos;
var gIsUpdateText = false;
function init() {
  createImgs();
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
  var heightPos = 40;
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

function renderSticker() {
  let stickers = getStickers();
  let strHTML = stickers
    .map(sticker => {
      return `
    <img src="Stickers/${sticker}.png" class="sticker sticker-${sticker}" onclick="onAddSticker(${sticker})">
      `;
    })
    .join('');

  document.querySelector('.stickers-container').innerHTML = strHTML;
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
//  <img class="sticker sticker-{id} onclick="onAddSticker{id}">
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

function drawImg(meme) {
  var elImg = document.querySelector(`.img-${meme.selectedImgId}`);
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
  let line = meme.lines[meme.selectedLineIdx];
  let width = line.width + 5;
  let height = line.size + 10;
  let startY = line.posY - line.size;
  let startX = line.posX - line.width / 2;
  switch (line.align) {
    case 'right':
      startX -= line.width / 2;
      break;
    case 'left':
      startX += line.width / 2;
      break;
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
  if (clickedStickerIdx >= 0) {
    meme.selectedStickerIdx = clickedStickerIdx;
    setStickerDrag(true);
  }
  if (clickedLineIdx < 0) return;
  meme.selectedLineIdx = clickedLineIdx;
  gIsUpdateText = true;
  updateInputVal(getCurrLine().txt);
  focused();
  setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
}

function updateInputVal(val) {
  document.querySelector('.input-txt').value = val;
}
function onMove(ev) {
  var line = getCurrLine();
  if (line.isDrag) {
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveCurrLine(dx, dy);
    gStartPos = pos;
    renderMeme();
    focused();
  }
}

function onUp(ev) {
  setLineDrag(false);
  document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };

  return pos;
}

function toggleMenu() {
  document.body.classList.toggle('menu-open');
}
