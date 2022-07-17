const gameContainer = document.querySelector('#game-container');

const gameStatus = document.querySelector('#game-status');

// const cells = document.querySelectorAll('.cell');

let gameActive = true; //use to pause the game

let playerMarker = 'X';

let gameState = ['','','','','','','','',''];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function resultValidation() {
    let roundWon = false;

    for(let i=0; i<=7; i++) {
        const winCondition = winningConditions[i];

        let x = gameState[winCondition[0]];
        let y = gameState[winCondition[1]];
        let z = gameState[winCondition[2]];

        if(x === '' || y === '' || z === '') {
            continue;
        }
        if(x === y && y === z) {
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        gameStatus.innerHTML = winnerMessage();
        gameActive = false;
        return;
    }

    //draw condition
    let roundDraw = !gameState.includes(''); //all cells are filled and no winner 

    if(roundDraw) {
        gameStatus.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    playerChange();
}

function playerChange() {
    playerMarker = playerMarker === 'X' ? 'O' : 'X';
    gameStatus.innerHTML = currentPlayerTurn();
}

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    cellPlayed(clickedCell, cellIndex);
    resultValidation();
}

//let players place marker on gameboard
function cellPlayed(cellClicked, cellIndex) {
    gameState[cellIndex] = playerMarker;
    cellClicked.innerHTML = playerMarker;
}

//reset the gameboard
function resetGame() {
    gameActive = true;
    playerMarker = 'X';
    gameState = ['','','','','','','','',''];

    gameStatus.innerHTML = currentPlayerTurn();

    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '');
}

document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', cellClicked);
});

document.querySelector('#reset-button').addEventListener('click', resetGame);

//display messages
const winnerMessage = () => `${playerMarker} has won the game!`;
const drawMessage = () => `Draw`;
const currentPlayerTurn = () => `It's ${playerMarker}'s turn`;

gameStatus.innerHTML = currentPlayerTurn();
