'use strict';
const PAGE_SIZE = 4;
const STORAGE_KEY = 'savedMemesDB';

var gSavedMemes;
var gPageIdx = 0;
var gFilter = '';
var gImgs = [];
createImgs();
var gKeywordsMap = loadFromStorage('keywordsMap') || mapKeywords();
var gStickers = [1, 2, 3, 4];
var gMeme = {
  selectedImgId: 2,
  selectedLineIdx: -1,
  selectedStickerIdx: 0,
  gIsClickOnSticker: false,
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

function getSavedMemes() {
  var memes = loadFromStorage(STORAGE_KEY);
  if (!memes || !memes.length) memes = [];
  return memes;
}

function getKeywordsMap() {
  return gKeywordsMap;
}

function saveMeme(url) {
  var memes = loadFromStorage(STORAGE_KEY);
  if (!memes || !memes.length) memes = [];
  gMeme.url = url;
  memes.push(gMeme);
  gSavedMemes = memes;
  _saveMemeToStorage();
}

function _saveMemeToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes);
}

function _saveKeysToStorage() {
  saveToStorage('keywordsMap', gKeywordsMap);
}

function updateLineTxt(txt) {
  if (txt === undefined) txt = '';
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function createImgs() {
  gImgs = [];
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
    keywords: ['funny', 'cats', 'animals'],
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
  if (isLineNotSelected()) return;
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function strokeColor(color) {
  if (isLineNotSelected()) return;
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}
function changeAligment(location) {
  if (isLineNotSelected()) return;
  gMeme.lines[gMeme.selectedLineIdx].align = location;
}

function changeFontSize(operator) {
  if (gMeme.gIsClickOnSticker) {
    var currSticker = gMeme.stickers[gMeme.selectedStickerIdx];
    console.log(currSticker.size);
    currSticker.size += 5 * operator;
    console.log(currSticker.size);
  }
  if (isLineNotSelected()) return;
  var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
  gMeme.lines[gMeme.selectedLineIdx].size = fontSize + 3 * operator;
}

function switchLine() {
  gMeme.selectedLineIdx++;
  console.log(gMeme.lines[gMeme.selectedLineIdx]);
  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  }

  console.log(gMeme.selectedLineIdx);
}

function setLineDrag(isDrag) {
  if (isLineNotSelected()) return;
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
  if (isLineNotSelected()) return;
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
  if (gMeme.gIsClickOnSticker) {
    gMeme.stickers.splice(gMeme.selectedStickerIdx, 1);
    gMeme.gIsClickOnSticker = false;
    return;
  }
  console.log('removeline service');
  if (!gMeme.lines.length) return;
  if (isLineNotSelected()) return;
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  gMeme.selectedLineIdx = -1;
}

function selectFont(font) {
  if (isLineNotSelected()) return;
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function getStickers() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gStickers.slice(startIdx, startIdx + PAGE_SIZE);
}

function setNextPage(operator) {
  gPageIdx += operator;
  console.log(gPageIdx);
  if (gPageIdx * PAGE_SIZE >= gStickers.length || gPageIdx < 0) {
    gPageIdx = 0;
  }
  console.log(gPageIdx);
}

function setFilter(filterBy) {
  gFilter = filterBy.toLowerCase();
}

function getImgsForDisplay() {
  return gImgs.filter(img => {
    return img.keywords.some(word => {
      return word.includes(gFilter);
    });
  });
}

function isLineNotSelected() {
  if (gMeme.selectedLineIdx === -1) return true;
  return false;
}

function updateKeywordSize(keyword) {
  gKeywordsMap[keyword] += 0.2;
  _saveKeysToStorage();
}

function getKeySize(keyword) {
  return gKeywordsMap[keyword];
}

function mapKeywords() {
  return gImgs.reduce((objMap, img) => {
    img.keywords.forEach(keyword => {
      objMap[keyword] = 0.8;
    });
    return objMap;
  }, {});
}
