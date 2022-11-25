const emojis = {
  '-': ' ',
  "H": "🪦",
  'X': '💣',
  'O': '🚪',
  'I': '🚪',
  'L': '🔒',
  "C": "🪙",
  'PLAYER': '💀',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
};
const playerEmojis = {
  01 : "💀",
  02 : "⚽",
  03 : "🐱",
  04 : "🕷️",
  05 : "♟️",
}
const obstacleEmojis = {
  01 : "💣",
  02 : "🥅",
  03 : "🧨",
  04 : "👽",
  05 : "🦞",
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