// --- Seviye Haritaları ---
// Level 1
const board1 = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,5,0,0,0,0,1],
  [1,0,1,0,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,1,0,5,0,0,1,0,1],
  [1,0,0,0,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

// Level 2
const board2 = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,5,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,1,0,1,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,5,1,1,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

// Level 3
const board3 = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,1],
  [1,0,1,0,0,0,1,0,0,1],
  [1,0,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,5,0,0,0,1],
  [1,0,1,1,1,1,1,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

// Level 4
const board4 = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,0,0,1],
  [1,0,0,0,0,0,1,0,1,1],
  [1,0,1,1,1,0,1,0,0,1],
  [1,0,0,0,1,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1],
  [1,0,0,5,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

// Level 5
const board5 = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,5,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,1,0,1,0,1],
  [1,0,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1],
  [1,0,0,5,0,0,0,1,0,1],
  [1,0,0,0,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

// --- Seviye Konfigürasyonu ---
const levels = [
  {
    board: board1,
    ghostCount: 1,
    ghostColors: ['red'],
    ghostPositions: [{ x: 8, y: 1 }]
  },
  {
    board: board2,
    ghostCount: 2,
    ghostColors: ['red', 'green'],
    ghostPositions: [{ x: 8, y: 1 }, { x: 8, y: 8 }]
  },
  {
    board: board3,
    ghostCount: 2,
    ghostColors: ['red', 'blue'],
    ghostPositions: [{ x: 8, y: 1 }, { x: 8, y: 8 }]
  },
  {
    board: board4,
    ghostCount: 4,
    ghostColors: ['red', 'green', 'blue', 'yellow'],
    ghostPositions: [{ x: 8, y: 1 }, { x: 8, y: 8 }, { x: 1, y: 8 }, { x: 5, y: 5 }]
  },
  {
    board: board5,
    ghostCount: 4,
    ghostColors: ['magenta', 'cyan', 'orange', 'purple'],
    ghostPositions: [{ x: 8, y: 1 }, { x: 8, y: 8 }, { x: 1, y: 8 }, { x: 5, y: 1 }]
  }
];

let currentLevel = 1;       // Başlangıç seviyesi
let currentBoard;           // Seviye board'u (kopyalanmış)
let pacmanPos;              // Pacman konumu (her seviyede {x:1,y:1} olarak)
let ghosts;                 // Hayalet dizisi (her biri {id, x, y, initialPos, color})
let score = 0;              // Toplam skor (seviye geçtikçe artar)
let powerMode = false;      // Güç modu (power pellet etkisi)
const POWER_MODE_DURATION = 10000; // 10 sn
const GHOST_EATEN_DURATION = 2000;   // 2 sn

const gameBoardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const messageDiv = document.getElementById('message');
const messageText = document.getElementById('message-text');
const restartBtn = document.getElementById('restart-btn');

let ghostInterval;

// --- Yardımcı Fonksiyonlar ---
function deepCopyBoard(board) {
  return JSON.parse(JSON.stringify(board));
}

// Seviye konfigürasyonunu yükler
function loadLevel(level) {
  const config = levels[level - 1];
  currentBoard = deepCopyBoard(config.board);
  pacmanPos = { x: 1, y: 1 }; // Pacman her seviye sol üst köşeden başlasın
  ghosts = config.ghostPositions.map((pos, index) => ({
    id: index,
    x: pos.x,
    y: pos.y,
    initialPos: { ...pos },
    color: config.ghostColors[index]
  }));
  powerMode = false;
  updateScoreDisplay();
  updateLevelDisplay();
  drawBoard();
}

// Seviye atlama: Eğer mevcut seviye 5 değilse artır, değilse oyunu tamamlandı mesajı ver.
function nextLevel() {
  clearInterval(ghostInterval);
  if (currentLevel < 5) {
    showMessage(`Tebrikler! Seviye ${currentLevel} tamamlandı. Yükleniyor...`);
    setTimeout(() => {
      currentLevel++;
      loadLevel(currentLevel);
      ghostInterval = setInterval(moveGhosts, 500);
      hideMessage();
    }, 2000);
  } else {
    // En son seviyede kazandıysanız
    endGame("Tüm seviyeler tamamlandı! Tebrikler!");
  }
}

function updateScoreDisplay() {
  scoreElement.textContent = `Skor: ${score} | Seviye: ${currentLevel}`;
}

/* Mesaj kutusunu gizle */
function hideMessage() {
  messageText.textContent = "";
  messageDiv.classList.add('hidden');
}

/* Mesaj kutusunu göster */
function showMessage(text) {
  messageText.textContent = text;
  messageDiv.classList.remove('hidden');
}

function updateLevelDisplay() {
  updateScoreDisplay();
}

/* Oyun alanını çiz */
function drawBoard() {
  gameBoardElement.innerHTML = '';
  for (let y = 0; y < currentBoard.length; y++) {
    for (let x = 0; x < currentBoard[y].length; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      
      if (currentBoard[y][x] === 1) {
        cellDiv.classList.add('wall');
      }
      else if (pacmanPos.x === x && pacmanPos.y === y) {
        cellDiv.classList.add('pacman');
      }
      else if (ghosts.some(g => g.x === x && g.y === y)) {
        // Bulunan hayaleti al
        const ghost = ghosts.find(g => g.x === x && g.y === y);
        if (powerMode) {
          cellDiv.classList.add('vulnerable');
        } else {
          cellDiv.classList.add('ghost');
          // Hayaletin rengini inline olarak ayarla
          cellDiv.style.background = ghost.color;
        }
      }
      else if (currentBoard[y][x] === 0) {
        const pelletDiv = document.createElement('div');
        pelletDiv.classList.add('pellet');
        cellDiv.appendChild(pelletDiv);
      }
      else if (currentBoard[y][x] === 5) {
        const powerDiv = document.createElement('div');
        powerDiv.classList.add('power');
        cellDiv.appendChild(powerDiv);
      }
      
      gameBoardElement.appendChild(cellDiv);
    }
  }
  updateScoreDisplay();
}

/* Pacman hareketi */
function movePacman(dx, dy) {
  const newX = pacmanPos.x + dx;
  const newY = pacmanPos.y + dy;
  
  if (newY < 0 || newY >= currentBoard.length || newX < 0 || newX >= currentBoard[0].length) return;
  if (currentBoard[newY][newX] === 1) return;
  
  if (currentBoard[newY][newX] === 0) {
    score++;
    currentBoard[newY][newX] = 4;
  }
  else if (currentBoard[newY][newX] === 5) {
    score += 5;
    currentBoard[newY][newX] = 4;
    powerMode = true;
    setTimeout(() => {
      powerMode = false;
      drawBoard();
    }, POWER_MODE_DURATION);
  }
  
  pacmanPos = { x: newX, y: newY };
  checkCollision();
  drawBoard();
  checkWinCondition();
}

/* Hayaletleri Pacman'e yaklaştır */
function moveGhosts() {
  ghosts.forEach((ghost) => {
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];
    let bestMove = null;
    let minDistance = Infinity;
    directions.forEach(dir => {
      const newX = ghost.x + dir.dx;
      const newY = ghost.y + dir.dy;
      if (newY >= 0 && newY < currentBoard.length && newX >= 0 && newX < currentBoard[0].length) {
        if (currentBoard[newY][newX] !== 1) {
          const distance = Math.abs(pacmanPos.x - newX) + Math.abs(pacmanPos.y - newY);
          if (distance < minDistance) {
            minDistance = distance;
            bestMove = { x: newX, y: newY };
          }
        }
      }
    });
    if (bestMove) {
      ghost.x = bestMove.x;
      ghost.y = bestMove.y;
    }
  });
  checkCollision();
  drawBoard();
}

/* Çarpışma kontrolü */
function checkCollision() {
  for (let i = 0; i < ghosts.length; i++) {
    let ghost = ghosts[i];
    if (ghost.x === pacmanPos.x && ghost.y === pacmanPos.y) {
      if (powerMode) {
        score += 10;
        let removedGhost = ghosts.splice(i, 1)[0];
        setTimeout(() => {
          ghosts.push({ 
            ...removedGhost, 
            x: removedGhost.initialPos.x, 
            y: removedGhost.initialPos.y 
          });
          drawBoard();
        }, GHOST_EATEN_DURATION);
        i--;
        drawBoard();
      } else {
        endGame("Oyun Bitti! Pacman hayalet tarafından yakalandı.");
        return;
      }
    }
  }
}

/* Pellet ve power pellet bitti mi? Seviye bitirme kontrolü */
function checkWinCondition() {
  for (let row of currentBoard) {
    if (row.includes(0) || row.includes(5)) return;
  }
  nextLevel();
}

/* Oyun bittiğinde mesaj göster ve hayalet hareketini durdur */
function endGame(text) {
  clearInterval(ghostInterval);
  showMessage(text);
}

function resetGame() {
  hideMessage();               // Mesaj kutusunu gizle
  loadLevel(currentLevel);     // Aynı seviyeyi yeniden yükle
  ghostInterval = setInterval(moveGhosts, 500);
}


/* Seviyeyi yükselt */
function nextLevel() {
  clearInterval(ghostInterval);
  if (currentLevel < 5) {
    showMessage(`Tebrikler! Seviye ${currentLevel} tamamlandı. Yükleniyor...`);
    setTimeout(() => {
      currentLevel++;
      loadLevel(currentLevel);
      ghostInterval = setInterval(moveGhosts, 500);
      hideMessage();
    }, 2000);
  } else {
    endGame("Tüm seviyeler tamamlandı! Tebrikler!");
  }
}

/* Klavye kontrolü */
document.addEventListener('keydown', function(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
  switch(e.key) {
    case "ArrowUp":
      movePacman(0, -1);
      break;
    case "ArrowDown":
      movePacman(0, 1);
      break;
    case "ArrowLeft":
      movePacman(-1, 0);
      break;
    case "ArrowRight":
      movePacman(1, 0);
      break;
  }
});

restartBtn.addEventListener('click', resetGame);

/* Başlangıç: Seviye 1'i yükle */
loadLevel(currentLevel);
ghostInterval = setInterval(moveGhosts, 500);
