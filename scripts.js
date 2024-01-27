document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultScreen = document.querySelector('.result-screen');
    const resultMessage = document.querySelector('.result-message');
    const newGameButton = document.querySelector('.new-game-button');
    const playerInputs = document.querySelector('.player-inputs');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const currentPlayerDisplay = document.getElementById('currentPlayer');
    const warningMessage = document.querySelector('.warning-message');

    let currentPlayer;
    let gameBoard;
    let player1Name = "";
    let player2Name = "";

    function initializeGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayerDisplay.textContent = `${player1Name}'s turn`;

        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = 'linear-gradient(45deg, #8a2387, #e94057, #f27121)';
            cell.addEventListener('click', handleCellClick);
        });

        resultScreen.style.display = 'none';
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === '' && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.style.backgroundColor = 'linear-gradient(45deg, #f27121, #e94057, #8a2387)';

            const winner = checkWinner();
            if (winner) {
                showResult(winner);
            } else if (!gameBoard.includes('')) {
                showResult('draw');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                currentPlayerDisplay.textContent = `${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return '';
    }

    function showResult(winner) {
        if (winner === 'draw') {
            resultMessage.textContent = "It's a draw!";
        } else {
            resultMessage.textContent = `${winner === 'X' ? player1Name : player2Name} wins!`;
        }
        resultScreen.style.display = 'flex';
    }

    playerInputs.addEventListener('submit', (event) => {
        event.preventDefault();
        player1Name = player1Input.value.trim();
        player2Name = player2Input.value.trim();

        if (player1Name === player2Name) {
            warningMessage.textContent = "Both players cannot have the same name.";
        } else {
            warningMessage.textContent = '';
            initializeGame();
        }
    });

    newGameButton.addEventListener('click', () => {
        initializeGame();
    });

    initializeGame();
});
