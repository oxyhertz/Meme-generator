'use strict';
var gImgs = [
  { id: 1, url: './images/meme-imgs/1.jpg', keywords: ['funny', 'cat'] },
];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 30,
      align: 'left',
      color: 'red',
      font: 'Arial',
    },
  ],
};

function getMeme() {
  return gMeme;
}
