// Oyun haritası: 10 satır x 10 sütun
// 1 = Duvar, 0 = Pellet, 2 = Pacman başlangıç, 4 = Yenen pellet (boş)
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
let ghosts = [
  { x: 8, y: 1 },
  { x: 8, y: 8 }
];

const gameBoardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const messageDiv = document.getElementById('message');
const messageText = document.getElementById('message-text');
const restartBtn = document.getElementById('restart-btn');

// Hayalet hareketlerini kontrol etmek için interval
let ghostInterval;

// Oyun alanını başlat
function setupBoard() {
  // 10 sütun, her hücre 24px olacak
  gameBoardElement.style.gridTemplateColumns = `repeat(${board[0].length}, 24px)`;
  drawBoard();
}

// Board dizisine göre ekranda oyunu çiz
function drawBoard() {
  gameBoardElement.innerHTML = '';
  
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      
      // Duvar
      if (board[y][x] === 1) {
        cellDiv.classList.add('wall');
      }
      // Pacman
      else if (pacmanPos.x === x && pacmanPos.y === y) {
        cellDiv.classList.add('pacman');
      }
      // Hayaletler
      else if (ghosts.some(g => g.x === x && g.y === y)) {
        cellDiv.classList.add('ghost');
      }
      // Pellet
      else if (board[y][x] === 0) {
        const pelletDiv = document.createElement('div');
        pelletDiv.classList.add('pellet');
        cellDiv.appendChild(pelletDiv);
      }

      gameBoardElement.appendChild(cellDiv);
    }
  }
  
  // Skoru güncelle
  scoreElement.textContent = `Skor: ${score}`;
}

// Pacman'i hareket ettir
function movePacman(dx, dy) {
  const newX = pacmanPos.x + dx;
  const newY = pacmanPos.y + dy;
  
  // Sınır ve duvar kontrolü
  if (newY < 0 || newY >= board.length || newX < 0 || newX >= board[0].length) return;
  if (board[newY][newX] === 1) return;
  
  // Pellet yeme
  if (board[newY][newX] === 0) {
    score++;
    board[newY][newX] = 4; // Yenen pellet artık boş
  }
  
  pacmanPos = { x: newX, y: newY };
  checkCollision();
  drawBoard();
  checkWinCondition();
}

// Hayaletleri hareket ettir: Pacman'e doğru yaklaşsınlar
function moveGhosts() {
  ghosts.forEach(ghost => {
    const directions = [
      { dx: 0, dy: -1 }, // Yukarı
      { dx: 0, dy: 1 },  // Aşağı
      { dx: -1, dy: 0 }, // Sol
      { dx: 1, dy: 0 }   // Sağ
    ];

    let bestMove = null;
    let minDistance = Infinity;
    
    directions.forEach(dir => {
      const newX = ghost.x + dir.dx;
      const newY = ghost.y + dir.dy;
      // Duvar veya harita dışı değilse
      if (newY >= 0 && newY < board.length && newX >= 0 && newX < board[0].length) {
        if (board[newY][newX] !== 1) {
          // Pacman'e olan Manhattan mesafesini hesapla
          const distance = Math.abs(pacmanPos.x - newX) + Math.abs(pacmanPos.y - newY);
          if (distance < minDistance) {
            minDistance = distance;
            bestMove = { x: newX, y: newY };
          }
        }
      }
    });
    
    // En iyi hamleyi uygula
    if (bestMove) {
      ghost.x = bestMove.x;
      ghost.y = bestMove.y;
    }
  });
  
  checkCollision();
  drawBoard();
}

// Pacman herhangi bir hayalet ile aynı konumda mı?
function checkCollision() {
  if (ghosts.some(ghost => ghost.x === pacmanPos.x && ghost.y === pacmanPos.y)) {
    endGame("Oyun Bitti! Pacman hayalet tarafından yakalandı.");
  }
}

// Tüm pelletler yendiyse kazan
function checkWinCondition() {
  for (let row of board) {
    if (row.includes(0)) return; // Hâlâ pellet varsa devam et
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
  // Tüm pelletleri geri yükle (4 -> 0)
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

// Klavye tuşlarıyla Pacman'i kontrol et
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

// "Yeniden Başlat" butonuna basıldığında oyunu sıfırla
restartBtn.addEventListener('click', resetGame);

// İlk açılışta oyun kurulumunu yap ve hayaletleri hareket ettirmeye başla
setupBoard();
ghostInterval = setInterval(moveGhosts, 500);
