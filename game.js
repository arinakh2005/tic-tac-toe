'use strict'
var gameCellFilled;
var gameCell;
var cross = 'cross';
var circle = 'circle;'
var lastRole = cross;
var mode;
var numberOfCellsToWin = 3;
var size;
var playerNumber = 2; // 0 - computer

function showGameArea() {
    const box = document.getElementsByClassName('table-game')[0];
    box.style.visibility = 'visible';
    let select = document.getElementById("game-area");
    size = select.value;
    gameCell = new Array(size * size);
    gameCellFilled = new Array(size * size);
    document.getElementById('btn-start').setAttribute('disabled', 'true');
    buildGameArea(size);
}

function buildGameArea(size) {
    const table = document.querySelector('table');

    for (let i = 0; i < size; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < size; j++) {
            const td = document.createElement('td');
            td.classList.add("cell");
            let id = "cell" + ((i * size) + j);
            td.id = id;
            td.setAttribute('onclick', 'doStep("' +
                id + '")');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function generateNumberOfCell(size) {
    return ('cell' + Math.floor(Math.random() * size)); //return id
}

function zero(id) {
    let role = circle;
    id = generateNumberOfCell(size * size);
    if (gameCellFilled.includes(id)) {
        zero(generateNumberOfCell(size * size), role);
    } else {
        playerNumber = 0;
        gameCellFilled.push(id);
        document.getElementById(id).innerHTML = '<img src="./circle.png">';;
        let i = +(id.slice(4, 6));
        gameCell[i] = role;
        if (checkWin()) {
            getWinnerMessage(playerNumber, 2);
            setTimeout(clearGameTable, 1000);
        }
    }
}

function checkWin() {
    // Check for row
    let step = 0;
    do {
        for (let i = size - numberOfCellsToWin - step; i < (size * size); i += numberOfCellsToWin + (size - numberOfCellsToWin)) {
            if (gameCell[i] == circle && gameCell[i + 1] == circle && gameCell[i + 2] == circle ||
                gameCell[i] == cross && gameCell[i + 1] == cross && gameCell[i + 2] == cross) {
                return true;
            }
        }
        step++;
    } while (size - numberOfCellsToWin - step >= 0);

    //Check for column
    step = size - numberOfCellsToWin;
    for (let i = 0; i < size * size; i++) {
        if (gameCell[i] == circle && gameCell[i + numberOfCellsToWin + step] == circle && gameCell[i + 2 * (numberOfCellsToWin + step)] == circle ||
            gameCell[i] == cross && gameCell[i + numberOfCellsToWin + step] == cross && gameCell[i + 2 * (numberOfCellsToWin + step)] == cross) {
            return true;
        }
    }

    //Check for diagonal
    step = size - numberOfCellsToWin + 1;
    for (let i = 0; i < (size * size) / 2; i++) {
        // Main diagonal
        let index1 = +i + +size + 1;
        let index2 = +i + 2 * (+size + 1);
        if (gameCell[i] == circle && gameCell[index1] == circle && gameCell[index2] == circle ||
            gameCell[i] == cross && gameCell[index1] == cross && gameCell[index2] == cross) {
            return true;
        }
    }
    for (let i = 0; i < (size * size); i++) {
        // Anti-diagonal
        let index1 = i + +size - 1;
        let index2 = i + 2 * (+size - 1);
        if (gameCell[i] == circle && gameCell[index1] == circle && gameCell[index2] == circle ||
            gameCell[i] == cross && gameCell[index1] == cross && gameCell[index2] == cross) {
            return true;
        }
    }

    // Check empty Cells
    if (size == 3) {
        if (gameCell[0] && gameCell[1] && gameCell[2] && gameCell[3] && gameCell[4] && gameCell[5] &&
            gameCell[6] && gameCell[7] && gameCell[8]) {
            getDrawMessage();
        };
    } else if (size == 4) {
        if (gameCell[0] && gameCell[1] && gameCell[2] && gameCell[3] && gameCell[4] && gameCell[5] &&
            gameCell[6] && gameCell[7] && gameCell[8] && gameCell[9] && gameCell[10] && gameCell[11] &&
            gameCell[12] && gameCell[13] && gameCell[14] && gameCell[15]) {
            getDrawMessage();
        };
    } else if (size == 5) {
        if (gameCell[0] && gameCell[1] && gameCell[2] && gameCell[3] && gameCell[4] && gameCell[5] &&
            gameCell[6] && gameCell[7] && gameCell[8] && gameCell[9] && gameCell[10] && gameCell[11] &&
            gameCell[12] && gameCell[13] && gameCell[14] && gameCell[15] && gameCell[16] && gameCell[17] &&
            gameCell[18] && gameCell[19] && gameCell[20] && gameCell[11] && gameCell[22] && gameCell[23] &&
            gameCell[24]) {
            getDrawMessage();
        };
    }
}

function doStep(id) {
    var select = document.getElementById("game-mode");
    var mode = select.value;
    if (mode == 1) {
        document.getElementById('player-number').innerText = "Хід: гравець " + playerNumber;
        playPvP(id);
        if (checkWin()) {
            getWinnerMessage(playerNumber, mode);
            setTimeout(clearGameTable, 1000);
        }
    } else if (mode == 2) {
        playPvC(id, cross);
    }
}

function playPvC(id, role) {
    if (role == cross) {
        document.getElementById(id).innerHTML = '<img src="./cross.png">';
        gameCellFilled.push(id);
        let i = +(id.slice(4, 6));
        gameCell[i] = role;
        playerNumber = 1;
    }
    if (checkWin()) {
        getWinnerMessage(playerNumber, 2);
        setTimeout(clearGameTable, 500);
        return;
    }
    setTimeout(zero, 500, generateNumberOfCell(9));
}

function playPvP(id) {
    let role;
    if (lastRole == cross) {
        role = circle;
        document.getElementById(id).innerHTML = '<img src="./cross.png">';
        gameCellFilled.push(id);
        let i = +(id.slice(4, 6));
        gameCell[i] = role;
        lastRole = role;
        playerNumber = 1;
        return;
    }
    if (lastRole == circle) {
        role = cross;
        document.getElementById(id).innerHTML = '<img src="./circle.png">';
        gameCellFilled.push(id);
        let i = +(id.slice(4, 6));
        gameCell[i] = role;
        lastRole = role;
        playerNumber = 2;
        return;
    }
}

function getWinnerMessage(playerNumber, mode) {
    if (mode == 2) {
        if (playerNumber == 0) {
            alert("Переміг комп'ютер!");
        } else {
            alert("Переміг гравець!");
        }
    } else {
        alert("Переміг гравець " + playerNumber);
    }
}

function getDrawMessage() {
    alert("Нічия");
    clearGameTable();
}

function clearGameTable() {
    let elem = document.getElementsByClassName("table")[0];
    elem.parentNode.removeChild(elem);
    const spaceForTableGrid = document.getElementsByClassName('table-game')[0];
    const table = document.createElement('table');
    table.classList.add('table');
    spaceForTableGrid.appendChild(table);

    elem = document.getElementById("player-number");
    elem.parentNode.removeChild(elem);
    const spaceForLabelWithPlayersNumber = document.getElementsByClassName('table-game')[0];
    const labelWithPlayersNumber = document.createElement('p');
    labelWithPlayersNumber.id = 'player-number';
    labelWithPlayersNumber.textContent = "Хід: гравець";
    spaceForLabelWithPlayersNumber.appendChild(labelWithPlayersNumber);

    gameCellFilled = [];
    gameCell = [];
    playerNumber = 2;
    document.getElementById('btn-start').setAttribute('disabled', 'false');

    showGameArea();
}