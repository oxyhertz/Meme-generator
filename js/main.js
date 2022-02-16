'use strict';

var gCtx;
var gElCanvas;
var gStartPos;
var gIsUpdateText;

function init() {
  createImgs();
  renderGallery(getImgs());
  createCanvas();
  resizeCanvas();
  renderMeme();
  addListeners();
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
    createCanvas();
    renderMeme();
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

function renderMeme() {
  var meme = getMeme();
  drawImg(meme);
  drawLines(meme);
}

function onAddText() {
  const txt = document.querySelector('.input-txt').value.trim();
  if (!txt) return;
  setLineTxt(txt);
  renderMeme();
  document.querySelector('.input-txt').value = '';
}

function onFillcolor() {
  var color = document.querySelector('.fill-color').value;
  fillColor(color);
  renderMeme();
}

function onStrokeColor() {
  var color = document.querySelector('.stroke-color').value;
  strokeColor(color);
  renderMeme();
}
function onSwitchLine() {
  switchLine();
  renderMeme();
  focused();
}

function onRemoveLine() {
  removeLine();
  renderMeme();
}

function onSelectFont() {
  let font = document.querySelector('.fonts-select').value;
  selectFont(font);
  renderMeme();
}
function onChangeAligment(location) {
  changeAligment(location);
  renderMeme();
}
function onChangeFontSize(operator) {
  changeFontSize(operator);
  renderMeme();
}

function drawImg(meme) {
  var elImg = document.querySelector(`.img-${meme.selectedImgId}`);
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawLines(meme) {
  meme.lines.forEach(line => {
    drawText(line);
  });
}

function drawText(line) {
  let txt = line.txt;
  gCtx.lineWidth = 1;
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
  let height = line.size + 5;
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

function onDown(ev) {
  var meme = getMeme();
  const pos = getEvPos(ev);

  var clickedLineIdx = meme.lines.findIndex(line => {
    return (
      pos.x >= line.posX - line.width / 2 &&
      pos.x <= line.posX + line.width / 2 &&
      pos.y < line.posY &&
      pos.y > line.posY - line.size
    );
  });
  if (clickedLineIdx < 0) return;
  meme.selectedLineIdx = clickedLineIdx;
  //   setLineFocus(true);
  //   focused();
  setLineDrag(true);
  gStartPos = pos;
  document.body.style.cursor = 'grabbing';
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
