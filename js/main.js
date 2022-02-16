'use strict';

var gCtx;
var gElCanvas;

function init() {
  createCanvas();
  renderMeme('images/meme-imgs/1.jpg');
}

function createCanvas() {
  gElCanvas = document.getElementById('canvas');
  gCtx = gElCanvas.getContext('2d');
}

function renderMeme(imgUrl) {
  var img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  };
  drawText(line);
}

function drawLine() {}

function drawText(line) {
  var txt = line.txt;
  gCtx.lineWidth = 2;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.fillStyle = line.color;
  gCtx.strokeStyle = 'black';
  gCtx.textAlign = line.align;
  line.width = gCtx.measureText(txt).width;
  gCtx.fillText(txt, gElCanvas.width / 2, gElCanvas.height - 30);
  gCtx.strokeText(txt, gElCanvas.width / 2, gElCanvas.height - 30);
}
