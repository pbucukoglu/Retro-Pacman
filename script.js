// Oyun haritası: 
// 1 = Duvar, 0 = Pellet, 2 = Pacman başlangıç, 
// 4 = Pellet yendi (boş)
const board = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,1,0,1],
  [1,0,0,0,1,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1]
];

let score = 0;
let pacmanPos = { x: 1, y: 1 };
// Birden fazla hayalet ekliyoruz
let ghosts = [
  { x: 8, y: 1 },
  { x: 8, y: 8 }
];

const gameBoardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const messageDiv = document.getElementById('message');
const messageText = document.getElementById('message-text');
const restartBtn = document.getElementById('restart-btn');

let ghostInterval; // Hayalet hareket interval'ını kontrol etmek için

// Oyun alanını başlat
function setupBoard() {
  gameBoardElement.style.gridTemplateColumns = `repeat(${board[0].length}, 24px)`;
  drawBoard();
}

// Haritayı ekrana çiz
function drawBoard() {
  gameBoardElement.innerHTML = '';
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      
      if (board[y][x] === 1) {
        cellDiv.classList.add('wall');
      } else if (pacmanPos.x === x && pacmanPos.y === y) {
        cellDiv.classList.add('pacman');
      } else if (ghosts.some(g => g.x === x && g.y === y)) {
        cellDiv.classList.add('ghost');
      } else if (board[y][x] === 0) {
        const pelletDiv = document.createElement('div');
        pelletDiv.classList.add('pellet');
        cellDiv.appendChild(pelletDiv);
      }
      gameBoardElement.appendChild(cellDiv);
    }
  }
  scoreElement.textContent = `Skor: ${score}`;
}

// Pacman hareketi
function movePacman(dx, dy) {
  const newX = pacmanPos.x + dx;
  const newY = pacmanPos.y + dy;
  
  // Sınır ve duvar kontrolü
  if (newY < 0 || newY >= board.length || newX < 0 || newX >= board[0].length) return;
  if (board[newY][newX] === 1) return;
  
  // Pellet yeme
  if (board[newY][newX] === 0) {
    score++;
    board[newY][newX] = 4; // Pellet yendi, boş olarak işaretle
  }
  
  pacmanPos = { x: newX, y: newY };
  checkCollision();
  drawBoard();
  checkWinCondition();
}

// Hayalet hareketi: Pacman'e en yakın hamleyi yapacak şekilde hareket
function moveGhosts() {
  ghosts.forEach(ghost => {
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
      if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
        if (board[newY][newX] !== 1) {
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

// Çarpışma kontrolü: Pacman herhangi bir hayalet ile aynı konumda mı?
function checkCollision() {
  if (ghosts.some(ghost => ghost.x === pacmanPos.x && ghost.y === pacmanPos.y)) {
    endGame("Oyun Bitti! Pacman hayalet tarafından yakalandı.");
  }
}

// Tüm pelletler yendiyse oyunu kazan
function checkWinCondition() {
  for (let row of board) {
    if (row.includes(0)) return;
  }
  endGame("Kazandınız! Tüm pelletler yendi.");
}

// Oyun bittiğinde mesaj göster ve hayalet hareketini durdur
function endGame(text) {
  clearInterval(ghostInterval);
  showMessage(text);
}

// Oyun Sonu mesajını göster
function showMessage(text) {
  messageText.textContent = text;
  messageDiv.classList.remove('hidden');
}

// Mesajı gizle
function hideMessage() {
  messageDiv.classList.add('hidden');
}

// Oyunu yeniden başlat
function resetGame() {
  // Yenen pelletleri yeniden aktif hale getir (4 -> 0)
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 4) {
        board[y][x] = 0;
      }
    }
  }
  pacmanPos = { x: 1, y: 1 };
  ghosts = [
    { x: 8, y: 1 },
    { x: 8, y: 8 }
  ];
  score = 0;
  hideMessage();
  drawBoard();
  ghostInterval = setInterval(moveGhosts, 500);
}

// Klavye kontrolü
document.addEventListener('keydown', function(e) {
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

// Yeniden Başlat butonuna tıklayınca oyunu sıfırla
restartBtn.addEventListener('click', resetGame);

// Oyunu başlat
setupBoard();
ghostInterval = setInterval(moveGhosts, 500);
