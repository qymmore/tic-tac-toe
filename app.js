const gameContainer = document.querySelector('#game-container');

const gameStatus = document.querySelector('#game-status');

const cells = document.querySelectorAll('.cell');

let playerMarker = 'X';

//display messages
const winnerMessage = `Player1 has won the game!`;
const drawMessage = `Game was a draw.`;


//let players add marker to the board 
const placeMarker = () => {
    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            if(cell.innerHTML == '' || cell.innerHTML == null) {
                cell.innerHTML = playerMarker;
            } else {
                return;
            }
        });
    });
};

placeMarker();


