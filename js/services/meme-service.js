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
      posX: 200,
      isFocus: false,
      isDrag: false,
    },
    {
      txt: 'I sometimes eat Falafel',
      size: 30,
      align: 'center',
      color: 'red',
      font: 'Arial',
      posY: 340,
      posX: 200,
      isFocus: false,
      isDrag: false,
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
    posX: 200,
    isFocus: false,
    isDrag: false,
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

function switchLine() {
  // gMeme.lines[gMeme.selectedLineIdx].focus = false;
  // console.log(gMeme.lines[gMeme.selectedLineIdx]);
  gMeme.selectedLineIdx++;
  console.log(gMeme.lines[gMeme.selectedLineIdx]);
  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  }
  // gMeme.lines[gMeme.selectedLineIdx].focus = true;

  console.log(gMeme.selectedLineIdx);
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag;
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function setLineFocus(isFocus) {
  gMeme.lines[gMeme.selectedLineIdx].focus = isFocus;
}

function moveCurrLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].posX += dx;
  gMeme.lines[gMeme.selectedLineIdx].posY += dy;
}

function removeLine() {
  if (!gMeme.lines.length) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = 0;
}
