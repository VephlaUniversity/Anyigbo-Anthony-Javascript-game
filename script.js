const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
let currentPlayer = 'X';
let winner = null;
let moves = 0;

// Initialize the game
function init() {
  currentPlayer = 'X';
  winner = null;
  moves = 0;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = '#333'; 
    cell.addEventListener('click', handleClick);
  });
  message.textContent = 'Player X\'s turn';
}

// Handle cell click
function handleClick(event) {
  const cell = event.target;
  if (!cell.textContent && !winner) {
    cell.textContent = currentPlayer;
    moves++;
    checkWinner();
    if (!winner) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
    if (moves === 9 && !winner) {
      message.textContent = 'It\'s a draw!';
    }
  }
}

// Check for a winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ];
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      cells[a].style.color = 'green';
      cells[b].style.color = 'green';
      cells[c].style.color = 'green';
      winner = cells[a].textContent;
      message.textContent = `Player ${winner} wins!`;
      cells.forEach(cell => cell.removeEventListener('click', handleClick));
    }
  });
}

// Handle reset button click
resetBtn.addEventListener('click', init);

// Initialize the game
init();
