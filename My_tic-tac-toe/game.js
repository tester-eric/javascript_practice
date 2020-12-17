const status_display = document.querySelector('.status');
let gameactive=true;
let currentPlayer = "X";
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
let gamestatus = ["", "", "", "", "", "", "", "", ""];

status_display.innerHTML = currentPlayerTurn();

function clicked_cell(target_cell){
    const clickedcell=target_cell.target;
    const clickedcellIndex = parseInt(clickedcell.getAttribute('data-index'));
    if (gamestatus[clickedcellIndex] !== "" || gameactive===false){
        return
    }
    makemove(clickedcell, clickedcellIndex);
    checkwinniner();
    checkdraw();
}

function makemove(clickedcell,clickedcellIndex){
    gamestatus[clickedcellIndex]=currentPlayer;
    clickedcell.innerHTML=currentPlayer;
}
function checkwinniner(){
    const winningPattern = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const combination of winningPattern) {
        const [a,b,c] = combination;
        if(gamestatus[a] &&(gamestatus[a] === gamestatus[b] && gamestatus[a]===gamestatus[c])){
            gameactive=false;
            console.log(winningMessage());
        }
    }
    }

function nextturn(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status_display.innerHTML = currentPlayerTurn();
}

function restart() {
    gamestatus = ["", "", "", "", "", "", "", "", ""];
    gameactive = true;
    currentPlayer = "X";
    status_display.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.board__num')
               .forEach(board__num => board__num.innerHTML = "");
}

function  checkdraw(){

if (gamestatus.includes("")){
nextturn();
}
else{
    console.log(drawMessage());
}
}

document.querySelectorAll('.board__num').forEach(board__num => board__num.addEventListener('click', clicked_cell));
document.querySelector('.reset').addEventListener('click', restart);