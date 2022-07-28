'use strict'
let gameCellFilled = [];
let gameCell = [];
const cross = 'cross';
const circle = 'circle;'
let lastRole = cross;
let mode;
const numberOfCellsToWin = 3;
let size;
let playerNumber = 2; // 0 - computer

function showGameArea() {
    const box = document.getElementsByClassName('table-game')[0];
    box.style.visibility = 'visible';
    let select = document.getElementById("game-area");
    size = Number(select.value);
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
            let id = `cell${((i * size) + j)}`;
            td.id = id;
            td.setAttribute('onclick', `doStep("${id}")`);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function generateNumberOfCell(size) {
    return (`cell${Math.floor(Math.random() * size)}`); //return id
}

function computerStep(id) {
    let role = circle;
    id = generateNumberOfCell(size * size);

    if (gameCellFilled.includes(id)) {
        computerStep(generateNumberOfCell(size * size), role);
    } else {
        playerNumber = 0;
        gameCellFilled.push(id);

        document.getElementById(id).innerHTML = '<img src="./circle.png">';
        let i = +(id.slice(4, 6));
        gameCell[i] = role;
        if (checkWin()) {
            getWinnerMessage(playerNumber, 2);
            setTimeout(clearGameTable, 500);
        }
    }
}

function checkWin() {
    // Check for row
    let step = 0;
    do {
        for (let i = size - numberOfCellsToWin - step; i < (size * size); i += numberOfCellsToWin + (size - numberOfCellsToWin)) {
            if (gameCell[i] === circle && gameCell[i + 1] === circle && gameCell[i + 2] === circle ||
                gameCell[i] === cross && gameCell[i + 1] === cross && gameCell[i + 2] === cross) {
                return true;
            }
        }
        step++;
    } while (size - numberOfCellsToWin - step >= 0);

    //Check for column
    step = size - numberOfCellsToWin;
    for (let i = 0; i < size * size; i++) {
        if (gameCell[i] === circle && gameCell[i + numberOfCellsToWin + step] === circle && gameCell[i + 2 * (numberOfCellsToWin + step)] === circle ||
            gameCell[i] === cross && gameCell[i + numberOfCellsToWin + step] === cross && gameCell[i + 2 * (numberOfCellsToWin + step)] === cross) {
            return true;
        }
    }

    //Check for diagonal
    if (checkMainDiagonail(size)) return true;
    if (checkAntiDiagonail(size)) return true;

    // Check empty Cells
    if (isAllCellsEmpty(gameCell, size)) {
        getDrawMessage();
    }
}

function checkMainDiagonail(size) {
    let index1;
    let index2;
    let allowableIndexes = [];

    if (size == 3) {
        allowableIndexes = [0];
    } else if (size == 4) {
        allowableIndexes = [0, 1, 4, 5];
    } else if (size == 5) {
        allowableIndexes = [0, 1, 2, 5, 6, 7, 10, 11, 12];
    }

    let k = 1;
    for (let i = allowableIndexes[0]; i < size ** 2; i++) {
        index1 = i + size + 1;
        index2 = i + 2 * (size + 1);
        if (gameCell[i] === circle && gameCell[index1] === circle && gameCell[index2] === circle ||
            gameCell[i] === cross && gameCell[index1] === cross && gameCell[index2] === cross) {
            return true;
        }
        i = allowableIndexes[k];
        k++;
    }
}

function checkAntiDiagonail(size) {
    let index1;
    let index2;
    let allowableIndexes = [];

    if (size == 3) {
        allowableIndexes = [2];
    } else if (size == 4) {
        allowableIndexes = [2, 3, 6, 7];
    } else if (size == 5) {
        allowableIndexes = [2, 3, 4, 7, 8, 9, 12, 13, 14];
    }

    let k = 1;
    for (let i = allowableIndexes[0]; i < size ** 2; i++) {
        index1 = i + size - 1;
        index2 = i + 2 * (size - 1);
        if (gameCell[i] === circle && gameCell[index1] === circle && gameCell[index2] === circle ||
            gameCell[i] === cross && gameCell[index1] === cross && gameCell[index2] === cross) {
            return true;
        }
        i = allowableIndexes[k];
        k++;
    }
}

function isAllCellsEmpty(arr, size) {
    let counter = 0;
    arr.forEach(function (item) {
        if (item) counter++;
    });
    if (counter == size ** 2) {
        return true;
    }
}

function isCellEmpty(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == id) return true;
    }
}

function doStep(id) {
    if (isCellEmpty(gameCellFilled, id)) {
        return;
    }

    let select = document.getElementById("game-mode");
    let mode = select.value;
    if (mode == 1) {
        document.getElementById('player-number').innerText = `Хід: гравець ${playerNumber}`;
        playerWithPlayerStep(id);
        if (checkWin()) {
            getWinnerMessage(playerNumber, mode);
            setTimeout(clearGameTable, 500);
        }
    } else if (mode == 2) {
        playerStepWithComputer(id, cross);
    }

}

function playerStepWithComputer(id, role) {
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
    setTimeout(computerStep, 500, generateNumberOfCell(9));
}

function playerWithPlayerStep(id) {
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
        alert(`Переміг гравець ${playerNumber}`);
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
    labelWithPlayersNumber.textContent = "Хід: ...";
    spaceForLabelWithPlayersNumber.appendChild(labelWithPlayersNumber);

    gameCellFilled = [];
    gameCell = [];
    playerNumber = 2;
    document.getElementById('btn-start').setAttribute('disabled', 'false');

    showGameArea();
}