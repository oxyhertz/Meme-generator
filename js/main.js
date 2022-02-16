'use strict';

var gCtx;
var gElCanvas;

function init() {
  createImgs();
  renderGallery(getImgs());
  createCanvas();
  resizeCanvas();
  renderMeme();
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
  const txt = document.querySelector('.input-txt').value;
  setLineTxt(txt);
  renderMeme();
}

function onFillcolor() {
  var color = document.querySelector('.fill-color').value;
  console.log(color);
  fillColor(color);
  renderMeme();
}

function drawImg(meme) {
  var elImg = document.querySelector(`.img-${meme.selectedImgId}`);
  console.log(elImg);
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawLines(meme) {
  meme.lines.forEach(line => {
    drawText(line);
  });
}

function drawText(line) {
  var txt = line.txt;
  gCtx.lineWidth = 2;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.fillStyle = line.color;
  gCtx.textAlign = line.align;
  gCtx.strokeStyle = 'black';
  line.width = gCtx.measureText(txt).width;
  gCtx.fillText(txt, 50, 30);
  gCtx.strokeText(txt, 50, 30);
}
