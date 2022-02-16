'use strict';
var gImgs = [];
var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 30,
      align: 'center',
      color: 'red',
      font: 'Arial',
      posY: 40,
    },
    {
      txt: 'I sometimes eat Falafel',
      size: 30,
      align: 'center',
      color: 'red',
      font: 'Arial',
      posY: 340,
    },
  ],
};

function getMeme() {
  return gMeme;
}

function setLineTxt(txt) {
  gMeme.lines.push({
    txt,
    size: 30,
    align: 'center',
    color: 'red',
    font: 'Arial',
    posY: 200,
  });
}

function createImgs() {
  gImgs.push({
    id: 1,
    url: './images/meme-imgs/1.jpg',
    keywords: ['trump', 'politics'],
  });
  gImgs.push({
    id: 2,
    url: './images/meme-imgs/2.jpg',
    keywords: ['funny', 'cat'],
  });
}

function getImgs() {
  return gImgs;
}

function setImg(id) {
  gMeme.selectedImgId = id;
}

function fillColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function changeFontSize(operator) {
  var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
  gMeme.lines[gMeme.selectedLineIdx].size = fontSize + 3 * operator;
}
