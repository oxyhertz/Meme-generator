'use strict';
var gImgs = [];
var gStickers = [1, 2, 3, 4];
var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  selectedStickerIdx: 0,
  lines: [
    {
      txt: 'Edit Me !',
      size: 40,
      align: 'center',

      color: 'white',
      strokeColor: 'black',
      font: 'Impact',
      posY: 40,
      posX: 0,
      isFocus: false,
      isDrag: false,
    },
    {
      txt: 'Edit Me !',
      size: 40,
      align: 'center',
      color: 'white',
      strokeColor: 'black',
      font: 'Impact',
      posY: 400,
      posX: 200,
      isFocus: false,
      isDrag: false,
    },
  ],
  stickers: [],
};

function getMeme() {
  return gMeme;
}

function setLineTxt(txt, posY, posX) {
  gMeme.lines.push({
    txt,
    size: 40,
    align: 'center',
    color: 'white',
    strokeColor: 'black',
    font: 'Impact',
    posY,
    posX,
    isFocus: false,
    isDrag: false,
  });
}

function setSticker(id, posY, posX) {
  gMeme.stickers.push({
    id,
    size: 60,
    posY,
    posX,
    isDrag: false,
  });
}

function getStickers() {
  return gStickers;
}

function updateLineTxt(txt) {
  if (txt === undefined) txt = '';
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
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
    keywords: ['animal', 'cute', 'dog'],
  });
  gImgs.push({
    id: 3,
    url: './images/meme-imgs/3.jpg',
    keywords: ['animal', 'cute', 'dog'],
  });
  gImgs.push({
    id: 4,
    url: './images/meme-imgs/4.jpg',
    keywords: ['funny', 'cat', 'animal'],
  });
  gImgs.push({
    id: 5,
    url: './images/meme-imgs/5.jpg',
    keywords: ['baby', 'funny'],
  });
  gImgs.push({
    id: 6,
    url: './images/meme-imgs/6.jpg',
    keywords: ['politics', 'funny'],
  });
  gImgs.push({
    id: 7,
    url: './images/meme-imgs/7.jpg',
    keywords: ['baby', 'explain'],
  });
  gImgs.push({
    id: 8,
    url: './images/meme-imgs/8.jpg',
    keywords: ['explain', 'cat'],
  });
  gImgs.push({
    id: 9,
    url: './images/meme-imgs/9.jpg',
    keywords: ['baby', 'funny'],
  });
  gImgs.push({
    id: 10,
    url: './images/meme-imgs/10.jpg',
    keywords: ['politics', 'funny'],
  });
  gImgs.push({
    id: 11,
    url: './images/meme-imgs/11.jpg',
    keywords: ['explain', 'sport'],
  });
  gImgs.push({
    id: 12,
    url: './images/meme-imgs/12.jpg',
    keywords: ['dontsay', 'explain'],
  });
  gImgs.push({
    id: 13,
    url: './images/meme-imgs/13.jpg',
    keywords: ['dontsay', 'explain'],
  });
  gImgs.push({
    id: 14,
    url: './images/meme-imgs/14.jpg',
    keywords: ['matrix', 'seriously'],
  });
  gImgs.push({
    id: 15,
    url: './images/meme-imgs/15.jpg',
    keywords: ['dontsay', 'explain'],
  });
  gImgs.push({
    id: 16,
    url: './images/meme-imgs/16.jpg',
    keywords: ['politics', 'person'],
  });
  gImgs.push({
    id: 17,
    url: './images/meme-imgs/17.jpg',
    keywords: ['politics', 'person'],
  });
  gImgs.push({
    id: 18,
    url: './images/meme-imgs/18.jpg',
    keywords: ['toy', 'show'],
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

function strokeColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}
function changeAligment(location) {
  gMeme.lines[gMeme.selectedLineIdx].align = location;
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

function setStickerDrag(isDrag) {
  gMeme.stickers[gMeme.selectedStickerIdx].isDrag = isDrag;
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function getCurrSticker() {
  return gMeme.stickers[gMeme.selectedStickerIdx];
}
function setLineFocus(isFocus) {
  gMeme.lines[gMeme.selectedLineIdx].focus = isFocus;
}

function moveCurrLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].posX += dx;
  gMeme.lines[gMeme.selectedLineIdx].posY += dy;
}

function moveCurrSticker(dx, dy) {
  gMeme.stickers[gMeme.selectedStickerIdx].posX += dx;
  gMeme.stickers[gMeme.selectedStickerIdx].posY += dy;
}

function removeLine() {
  if (!gMeme.lines.length) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = 0;
}

function selectFont(font) {
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}
