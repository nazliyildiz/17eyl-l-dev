let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

const gameBoard = document.getElementById("game-board");
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");
const resetButton = document.getElementById("reset-button");

function createButton() {
    const button = document.createElement("button");
    button.textContent = "";
    button.addEventListener("click", handleButtonClick);
    return button;
}

function handleButtonClick() {
    if (this.textContent === "") {
        this.textContent = currentPlayer === 1 ? "X" : "O";
        
        if (checkWinner()) {
            currentPlayer === 1 ? player1Score++ : player2Score++;
            updateScoreboard();
            resetBoard();
        } else if (checkDraw()) {
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }
}
