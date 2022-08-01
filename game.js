'use strict'
const gameMark = {
    cross: 'cross',
    circle: 'circle'
}
const playerRole = {
    computer: 0,
    player1: 1,
    player2: 2,
    player: 3
}
const gameMode = {
    playerWithPlayer: 1,
    playerWithComputer: 2
}

let gameMapSize;
let allGameCells = [];
let occupiedGameCells = [];
const numberOfCellsToWin = 3;
let lastPlayerRole = gameMark.cross;
let playerWhoMadeLastStep = playerRole.player2;
let chosenGameMode;
const nobodyWonFlag = -1;

function showGameArea() {
    const box = document.getElementsByClassName('table-game')[0];
    box.style.visibility = 'visible';
    
    let size = document.getElementById("game-area");
    gameMapSize = +(size.value);

    let mode = document.getElementById("game-mode");
    chosenGameMode = +(mode.value);
    
    document.getElementById('btn-start').setAttribute('disabled', 'true');
    createGameTable(gameMapSize);
}

function createGameTable(size) {
    const table = document.querySelector('table');

    for (let i = 0; i < size; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < size; j++) {
            const td = document.createElement('td');
            td.classList.add("cell");
            let id = `cell${((i * size) + j)}`;
            td.id = id;
            td.setAttribute('onclick', `doStep("${id}")`);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function generateNumberOfCellForComputerStep(size) {
    return (`cell${Math.floor(Math.random() * size)}`);
}

function doStepByComputer(id) {
    let role = gameMark.circle;
    id = generateNumberOfCellForComputerStep(gameMapSize * gameMapSize);

    if (occupiedGameCells.includes(id)) {
        doStepByComputer(generateNumberOfCellForComputerStep(gameMapSize * gameMapSize), role);
    } else {
        playerWhoMadeLastStep = 0;
        occupiedGameCells.push(id);

        document.getElementById(id).innerHTML = `<img src="./${gameMark.circle}.png" alt="${gameMark.circle}">`;
        let i = +(id.slice(4, 6));
        allGameCells[i] = role;
        isGameOver(playerWhoMadeLastStep, 2);
    }
}

function isPlayerWon() {

    if (isWonInRow()) return true;
    if (isWonInColumn()) return true;

    if (isWonInMainDiagonal(gameMapSize)) return true;
    if (isWonInAntiDiagonal(gameMapSize)) return true;

    if (isAllCellsOccupied(allGameCells, gameMapSize)) {
        return nobodyWonFlag;
    }
}

function isWonInRow() {
    let step = 0;
    do {
        for (let i = gameMapSize - numberOfCellsToWin - step; i < (gameMapSize * gameMapSize); i += numberOfCellsToWin + (gameMapSize - numberOfCellsToWin)) {
            if (allGameCells[i] === gameMark.circle && allGameCells[i + 1] === gameMark.circle && allGameCells[i + 2] === gameMark.circle ||
                allGameCells[i] === gameMark.cross && allGameCells[i + 1] === gameMark.cross && allGameCells[i + 2] === gameMark.cross) {
                return true;
            }
        }
        step++;
    } while (gameMapSize - numberOfCellsToWin - step >= 0);
}

function isWonInColumn() {
    let step = gameMapSize - numberOfCellsToWin;
    for (let i = 0; i < gameMapSize * gameMapSize; i++) {
        if (allGameCells[i] === gameMark.circle && allGameCells[i + numberOfCellsToWin + step] === gameMark.circle && allGameCells[i + 2 * (numberOfCellsToWin + step)] === gameMark.circle ||
            allGameCells[i] === gameMark.cross && allGameCells[i + numberOfCellsToWin + step] === gameMark.cross && allGameCells[i + 2 * (numberOfCellsToWin + step)] === gameMark.cross) {
            return true;
        }
    }
}

function isWonInMainDiagonal(size) {
    let index1;
    let index2;
    let allowableIndexes = [];

    if (size === 3) {
        allowableIndexes = [0];
    } else if (size === 4) {
        allowableIndexes = [0, 1, 4, 5];
    } else if (size === 5) {
        allowableIndexes = [0, 1, 2, 5, 6, 7, 10, 11, 12];
    }

    let k = 0;
    let i = 0;
    while (k < allowableIndexes.length) {
        i = allowableIndexes[k];
        index1 = i + size + 1;
        index2 = i + 2 * (size + 1);
        if (allGameCells[i] === gameMark.circle && allGameCells[index1] === gameMark.circle && allGameCells[index2] === gameMark.circle ||
            allGameCells[i] === gameMark.cross && allGameCells[index1] === gameMark.cross && allGameCells[index2] === gameMark.cross) {
            return true;
        }
        i = allowableIndexes[k];
        k++;
    }
}

function isWonInAntiDiagonal(size) {
    let index1;
    let index2;
    let allowableIndexes = [];

    if (size === 3) {
        allowableIndexes = [2];
    } else if (size === 4) {
        allowableIndexes = [2, 3, 6, 7];
    } else if (size === 5) {
        allowableIndexes = [2, 3, 4, 7, 8, 9, 12, 13, 14];
    }

    let k = 0;
    let i = 0;
    while (k < allowableIndexes.length) {
        i = allowableIndexes[k];
        index1 = i + size - 1;
        index2 = i + 2 * (size - 1);
        if (allGameCells[i] === gameMark.circle && allGameCells[index1] === gameMark.circle && allGameCells[index2] === gameMark.circle ||
            allGameCells[i] === gameMark.cross && allGameCells[index1] === gameMark.cross && allGameCells[index2] === gameMark.cross) {
            return true;
        }
        i = allowableIndexes[k];
        k++;
    }
}

function isAllCellsOccupied(arr, size) {
    let counter = 0;
    arr.forEach(function(item) { if (item) counter++; });

    if (counter === size ** 2) {
        return true;
    } else {
        return false;
    }
}

function isCellOccupied(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === id) {
            return true;
        }
    }
}

function doStep(id) {
    if (isCellOccupied(occupiedGameCells, id)) {
        return;
    }
    if (chosenGameMode === gameMode.playerWithPlayer) {
        document.getElementById('player-number').innerText = `Хід: гравець ${playerWhoMadeLastStep}`;
        doStepInModePlayerWithPlayer(id);
        isGameOver(playerWhoMadeLastStep, chosenGameMode);
    } else if (chosenGameMode === gameMode.playerWithComputer) {
        doStepInModePlayerWithComputer(id, gameMark.cross);
    }
}

function isGameOver(playerNumber, gameMode) {
    if (isPlayerWon() === nobodyWonFlag) {
        setTimeout(getDrawMessage, 200);
        setTimeout(clearGameTable, 500);
        return true;
    } else if (isPlayerWon()) {
        setTimeout(getWinnerMessage, 200, playerNumber, gameMode);
        setTimeout(clearGameTable, 500);
        return true;
    } else {
        return false;
    }
}

function doStepInModePlayerWithComputer(id, markToFill) {
    if (markToFill === gameMark.cross) {
        let elem = document.getElementById(id);
        elem.innerHTML = `<img src="./${gameMark.cross}.png" alt="${gameMark.cross}">`;
        occupiedGameCells.push(id);
        let i = +(id.slice(4, 6));
        allGameCells[i] = markToFill;
        playerWhoMadeLastStep = playerRole.player;
    }
    if (isGameOver(playerWhoMadeLastStep, gameMode.playerWithComputer)) {
        return;
    } else if (!isGameOver(playerWhoMadeLastStep, gameMode.playerWithComputer)){
        doStepByComputer(generateNumberOfCellForComputerStep(gameMapSize ** 2));
    }
}

function doStepInModePlayerWithPlayer(id) {
    occupiedGameCells.push(id);
    let i = +(id.slice(4, 6));
    if (lastPlayerRole === gameMark.cross) {
        document.getElementById(id).innerHTML = `<img src="./${gameMark.cross}.png" alt="${gameMark.cross}">`;
        allGameCells[i] = gameMark.circle;
        lastPlayerRole = gameMark.circle;
        playerWhoMadeLastStep = playerRole.player1;
        return;
    }
    if (lastPlayerRole === gameMark.circle) {
        document.getElementById(id).innerHTML = `<img src="./${gameMark.circle}.png" alt="${gameMark.circle}"> `;
        allGameCells[i] = gameMark.cross;
        lastPlayerRole = gameMark.cross;
        playerWhoMadeLastStep = playerRole.player2;
        return;
    }
}

function getWinnerMessage(playerNumber, gameModeValue) {
    if (gameModeValue === gameMode.playerWithComputer) {
        if (playerNumber === playerRole.computer) {
            alert("Переміг комп'ютер!");
        } else {
            alert("Переміг гравець!");
        }
    } else {
        alert(`Переміг гравець ${playerNumber}`);
    }
}

function getDrawMessage() {
    alert("Нічия");
}

function clearGameTable() {
    let elem = document.getElementsByClassName("table")[0];
    elem.parentNode.removeChild(elem);

    const spaceForGame = document.getElementsByClassName('table-game')[0];
    const table = document.createElement('table');
    table.classList.add('table');
    spaceForGame.appendChild(table);

    elem = document.getElementById("player-number");
    elem.parentNode.removeChild(elem);

    const labelWithPlayersNumber = document.createElement('p');
    labelWithPlayersNumber.id = 'player-number';
    labelWithPlayersNumber.textContent = "Хід: ...";
    spaceForGame.appendChild(labelWithPlayersNumber);

    occupiedGameCells = [];
    allGameCells = [];
    playerWhoMadeLastStep = 2;
    lastPlayerRole = gameMark.cross;
    document.getElementById('btn-start').setAttribute('disabled', 'false');

    showGameArea();
}
