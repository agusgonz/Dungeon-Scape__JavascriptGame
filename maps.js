const emojis = {
  '-': ' ',
  "H": "๐ชฆ",
  'X': '๐ฃ',
  'O': '๐ช',
  'I': '๐ช',
  'L': '๐',
  "C": "๐ช",
  'PLAYER': '๐',
  'BOMB_COLLISION': '๐ฅ',
  'GAME_OVER': '๐',
  'WIN': '๐',
};
const playerEmojis = {
  01 : "๐",
  02 : "โฝ",
  03 : "๐ฑ",
  04 : "๐ท๏ธ",
  05 : "โ๏ธ",
}
const obstacleEmojis = {
  01 : "๐ฃ",
  02 : "๐ฅ",
  03 : "๐งจ",
  04 : "๐ฝ",
  05 : "๐ฆ",
}
const maps = [];
maps.push(`
  XXXXXXXXXX
  XXXXXXXXXX
  XXXXXXXXXX
  ----------
  H--------I
  ----------
  XXXXXLXXXX
  XXXXX---XX
  XXXXXXX--I
  XXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  XCXXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXXCXXXX
  XX----XXXX
  XXCXXXXXXX
  XX-----XXX
  XXXXXXCXXX
  XX-----XXX
  XXCXXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);