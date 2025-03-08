// Oyun haritası: 
// 1 = Duvar, 0 = Pellet, 2 = Pacman başlangıç, 3 = Hayalet başlangıç, 
// 4 = Boş (pellet yendi)
const board = [
  [1,1,1,1,1,1,1,1,1,1],
  [1,2,0,0,0,0,0,0,3,1],
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
let ghostPos = { x: 8, y: 1 };

const gameBoardElement = document.getElementById('game-board');
const scoreElement = document.getElementById('score');

// Oyun alanının başlangıç ayarlarını yap
function setupBoard() {
  // Satır uzunluğuna göre grid kolonlarını ayarla
  gameBoardElement.style.gridTemplateColumns = `repeat(${board[0].length}, 20px)`;
  drawBoard();
}

// Haritayı ekrana çiz
function drawBoard() {
  gameBoardElement.innerHTML = '';
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      
      // Hücre değerine göre stil belirle
      if (board[y][x] === 1) {
        cellDiv.classList.add('wall');
      } else if (x === pacmanPos.x && y === pacmanPos.y) {
        cellDiv.classList.add('pacman');
      } else if (x === ghostPos.x && y === ghostPos.y) {
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

// Pacman hareketini kontrol et
function movePacman(dx, dy) {
  const newX = pacmanPos.x + dx;
  const newY = pacmanPos.y + dy;
  
  // Harita sınırlarını kontrol et
  if (newY < 0 || newY >= board.length || newX < 0 || newX >= board[0].length) {
    return;
  }
  // Duvar kontrolü
  if (board[newY][newX] === 1) {
    return;
  }
  
  // Pellet varsa yedi ve skora ekle
  if (board[newY][newX] === 0) {
    score++;
    // Pellet yendiğinde hücre boş olarak işaretlensin
    board[newY][newX] = 4;
  }
  
  pacmanPos = { x: newX, y: newY };
  checkCollision();
  drawBoard();
}

// Hayalet için rastgele hareket algoritması
function moveGhost() {
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 }
  ];
  
  // Rastgele yön seçmek için diziyi karıştır
  directions.sort(() => Math.random() - 0.5);
  
  for (let dir of directions) {
    const newX = ghostPos.x + dir.dx;
    const newY = ghostPos.y + dir.dy;
    // Sınır kontrolü
    if (newY < 0 || newY >= board.length || newX < 0 || newX >= board[0].length) {
      continue;
    }
    // Duvar değilse hareket edebilir
    if (board[newY][newX] !== 1) {
      ghostPos = { x: newX, y: newY };
      break;
    }
  }
  checkCollision();
  drawBoard();
}

// Çarpışma kontrolü: Pacman ile hayalet aynı konumda mı?
function checkCollision() {
  if (pacmanPos.x === ghostPos.x && pacmanPos.y === ghostPos.y) {
    alert("Oyun Bitti! Pacman hayalet tarafından yakalandı.");
    resetGame();
  }
}

// Oyun bittiğinde yeniden başlatma
function resetGame() {
  // Tüm pelletleri yeniden yerleştir (yeni bir oyun için boş hücreler pellet olarak ayarlanır)
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 4) { // boş hücre
        board[y][x] = 0;
      }
    }
  }
  // Başlangıç konumlarını sıfırla
  pacmanPos = { x: 1, y: 1 };
  ghostPos = { x: 8, y: 1 };
  score = 0;
  drawBoard();
}

// Klavye ile kontrol
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

// Oyunu başlat
setupBoard();
// Her 500ms'de bir hayaletin hareket etmesi
setInterval(moveGhost, 500);
