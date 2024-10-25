const GAME_WIDTH = 160;
const GAME_HEIGHT = 160;
const GAME_TILE = 32;
const ROWS = GAME_HEIGHT / GAME_TILE;
const COLUMNS = GAME_WIDTH / GAME_TILE;

const LEVEL1 = [
  9, 9, 9, 9, 9, 1, 2, 2, 2, 3, 6, 7, 7, 7, 8, 6, 7, 7, 7, 8, 11, 12, 12, 12,
  13,
];
function getRandomTile() {
  return Math.floor(Math.random() * 25) + 1;
}

function createRandomLevel() {
  const level = [];
  for (let i = 0; i < ROWS * COLUMNS; i++) {
    level.push(getRandomTile());
  }
  return level;
}

const LEVEL2 = createRandomLevel();

const LEVEL3 = [
  14, 6, 25, 25, 20, 14, 11, 17, 23, 25, 2, 3, 11, 12, 12, 19, 21, 2, 3, 14, 24,
  19, 19, 8, 14,
];

function getTile(map, col, row) {
  return map[row * COLUMNS + col];
}

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  //canvas settings
  ctx.imageSmoothingEnabled = false;

  const TILE_IMAGE = document.getElementById("tilemap");
  const IMAGE_TILE = 32;
  const IMAGE_COLUMNS = TILE_IMAGE.width / IMAGE_TILE;
  let debug = false;

  let currentLevel = LEVEL1;

  function drawLevel(level) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS; col++) {
        const tile = getTile(level, col, row);
        ctx.drawImage(
          TILE_IMAGE,
          ((tile - 1) * IMAGE_TILE) % TILE_IMAGE.width,
          Math.floor((tile - 1) / IMAGE_COLUMNS) * IMAGE_TILE,
          IMAGE_TILE,
          IMAGE_TILE,
          col * GAME_TILE,
          row * GAME_TILE,
          GAME_TILE,
          GAME_TILE
        );
        if (debug) {
          ctx.strokeRect(
            col * GAME_TILE,
            row * GAME_TILE,
            GAME_TILE,
            GAME_TILE
          );
        }
      }
    }
  }
  drawLevel(currentLevel);
  //controls
  const debugCheckbox = document.getElementById("debugButton");
  const level1Button = document.getElementById("level1button");
  const level2Button = document.getElementById("level2button");
  const level3Button = document.getElementById("level3button");

  debugCheckbox.addEventListener("click", function () {
    debug = !debug;
    drawLevel(currentLevel);
  });

  level1Button.addEventListener("click", function () {
    currentLevel = LEVEL1;
    drawLevel(currentLevel);
  });

  level2Button.addEventListener("click", function () {
    currentLevel = LEVEL2;
    drawLevel(currentLevel);
  });

  level3Button.addEventListener("click", function () {
    currentLevel = LEVEL3;
    drawLevel(currentLevel);
  });
});
