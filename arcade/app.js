
let players = ['X', 'O']
let playerX = players[0];
let playerO = players[1];
let game = {
    rows: 3,
    columns: 3,
    entries:  [null, null, null,
            null, null, null,
             null, null, null
    ]
}
let gameMode = "singlePlayer"
let currentPlayer = playerX;
let clickCounter = 0;
let player1_name = document.getElementById("player1").value;
let player2_name = document.getElementById("player2").value;
let gridSpace = document.getElementsByClassName("gridSpace");
let twoPlayerGameMode = false;
const gameStatusText = document.getElementById("gameStatusText");
const resetButton = document.getElementById("reset")
let isGameOver = false;
const mapCurrentPlayerToName = {
    "X": null,
    "O": "computer"
}


//game functions

function setMapCurrentPlayerToName(key, value) {
    mapCurrentPlayerToName[key] = value
}

function onePlayerGame(){
    document.getElementById("playerNames1").style.display = "block";
    document.getElementById("numOfPlayers1").style.display = "none";
    document.getElementById("numOfPlayers2").style.display = "none";
    document.getElementById("playerTurnDisplay").style.display = "none";
    document.getElementById("player2Info").innerText = "Player 2: Computer"
    gameMode = "singlePlayer"
}

function computerPlayer(){
        chooseRandomSpace();
        winCheck();
}

function renderCell(location, value, state) {
    state[location] = value;
    (document.getElementById(`space${location}`).innerText = value);
}

function chooseRandomSpace() {
    // cellIsEmpty = game.entries[n]
    if (winCheck() || checkForStalemate()) {
        return;
    }
    let n = Math.floor(Math.random() * 9);
    if (game.entries[n] === null) {
            renderCell(n, playerO, game.entries);
            if(winCheck(playerO)){
               return
            }
            toggleCurrentPlayer();
    } else { //cellIsFull
        if(currentPlayer === playerO){
            chooseRandomSpace();
            }
    }

}

function twoPlayerGame(){
    document.getElementById("playerNames1").style.display = "block";
    document.getElementById("playerNames2").style.display = "block";
    document.getElementById("numOfPlayers1").style.display = "none";
    document.getElementById("numOfPlayers2").style.display = "none";
    setGameMode("twoPlayer")
}

function toggleCurrentPlayer() {
    if (currentPlayer === playerX) {
        currentPlayer = playerO
    } else {
        currentPlayer = playerX
    }
}

function setGameMode(_gameMode) {
    gameMode = _gameMode
}

function userNameInput1(){
    let player1_name = document.getElementById("player1").value;
    document.getElementById("player1Info").innerText = "Player 1: " + player1_name;
    document.getElementById("playerNames2").style.display = "block";
    document.getElementById("playerTurnDisplay").style.display = "block";
    document.getElementById("gameBoard").style.pointerEvents = "all";
    document.getElementById("gameDisplay").style.display = "block";
    setMapCurrentPlayerToName("X", player1_name)

}

function userNameInput2(){
    let player2_name = document.getElementById("player2").value;
    document.getElementById("player2Info").innerText = "Player 2: " + player2_name;
    document.getElementById("gameBoard").style.pointerEvents = "all";
    document.getElementById("gameDisplay").style.display = "block";
    setMapCurrentPlayerToName("O", player2_name)
}

function newGame() {
    location.reload();
    document.getElementById('space0').value ='';
    document.getElementById('space1').value ='';
    document.getElementById('space2').value ='';
    document.getElementById('space3').value ='';
    document.getElementById('space4').value ='';
    document.getElementById('space5').value ='';
    document.getElementById('space6').value ='';
    document.getElementById('space7').value ='';
    document.getElementById('space8').value ='';
}

function checkHorizontal(symbol){
    const horizLine1 = gridSpace[0].textContent === symbol &&  gridSpace[1].textContent === symbol && gridSpace[2].textContent === symbol;
    const horizLine2 = gridSpace[3].textContent === symbol &&  gridSpace[4].textContent === symbol && gridSpace[5].textContent === symbol;
    const horizLine3 = gridSpace[6].textContent === symbol &&  gridSpace[7].textContent === symbol && gridSpace[8].textContent === symbol;
    return horizLine1 || horizLine2 || horizLine3;
    
}

function checkVertical(symbol){
    const vertLine1 = gridSpace[0].textContent === symbol &&  gridSpace[3].textContent === symbol && gridSpace[6].textContent === symbol;
    const vertLine2 = gridSpace[1].textContent === symbol &&  gridSpace[4].textContent === symbol && gridSpace[7].textContent === symbol;
    const vertLine3 = gridSpace[2].textContent === symbol &&  gridSpace[5].textContent === symbol && gridSpace[8].textContent === symbol;
    return vertLine1 || vertLine2 || vertLine3;
}

function checkDiagonal(symbol){
    const diagLine1 = gridSpace[0].textContent === symbol &&  gridSpace[4].textContent === symbol && gridSpace[8].textContent === symbol;
    const diagLine2 = gridSpace[2].textContent === symbol &&  gridSpace[4].textContent === symbol && gridSpace[6].textContent === symbol;
    return diagLine1 || diagLine2;
}

function winCheck(symbol){
    const didUserWinHortizontal = checkHorizontal(symbol);
    const didUserWinVertical = checkVertical(symbol);
    const didUserWinDiagonal = checkDiagonal(symbol);
    const isWin = didUserWinHortizontal || didUserWinVertical || didUserWinDiagonal;
    if(isWin){
        gameOver(isWin);
        renderWinner();
    }
    return isWin;
    
}

function checkForStalemate(symbol){
    if(winCheck(symbol) === false && clickCounter === 9){
       document.getElementById("playerTurnDisplay").innerText = "Draw!"
       document.getElementById("reset").style.display = "block"
    }
    return;
}

function gameOver(shouldDisable){
    if(shouldDisable){
        document.getElementById("gameBoard").style.pointerEvents = "none";
        document.getElementById("reset").style.display = "block";
    }
    isGameOver = true;
    // displayWinner();
    
}

function disableComputerAi(){
    if(twoPlayerGameMode === true){
        twoPlayerGameMode === false;
    }
}
function renderTurn() {
    const name = mapCurrentPlayerToName[currentPlayer]
    document.getElementById("playerTurnDisplay")
    .innerText = `It is ${name}\'s turn`
}

function renderWinner() {
        console.log("winCheck", currentPlayer)
        const name = mapCurrentPlayerToName[currentPlayer]
        document.getElementById("playerTurnDisplay")
            .innerText = `${name} wins!`
}

function updateClickCounter() {
    clickCounter++
    document.getElementById("clickCounter").innerText = clickCounter;
}

for(let i = 0; i < gridSpace.length; i++){
    gridSpace[i].addEventListener('click', function(){
        renderTurn();
        if(this.innerText !== ''){
            return;
        }
        if (gameMode === "singlePlayer"){
            if (currentPlayer === playerO){
                chooseRandomSpace();
            } else {
                renderCell(i, playerX, game.entries);
                console.log("playerX", winCheck("X"))
                if(winCheck(currentPlayer)){
                    return;
                }
                toggleCurrentPlayer();
                renderTurn();
                chooseRandomSpace();
            }

        } else { 
            if (game.entries[i] === null) {
                    renderCell(i, currentPlayer, game.entries)
                    if(winCheck(currentPlayer)){
                        return;
                    }
                    toggleCurrentPlayer()
                    renderTurn();
            } 
        }
    })
}




//Event Listeners

document.getElementById("numOfPlayers1").addEventListener("click", onePlayerGame)

document.getElementById("numOfPlayers2").addEventListener("click", twoPlayerGame)

document.getElementById("nameEntryButton1").addEventListener("click", userNameInput1)

document.getElementById("nameEntryButton2").addEventListener("click", userNameInput2)

document.getElementById("reset").addEventListener("click", newGame)


