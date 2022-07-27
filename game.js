var gameCeilFilled = new Array;
var gameCeil = new Array;
var cross = 'cross';
var circle = 'circle;'
var lastRole = cross;
var mode;
var numberOfCellsToWin = 3;
var size;
var playerNumber = 2; // 0 - computer
// var firstChoiseMode = true;

function showGameArea() {
    const box = document.getElementsByClassName('table-game')[0];
    box.style.visibility = 'visible';
    let select = document.getElementById("game-area");
    size = select.value;
    document.getElementById('btn-start').setAttribute('disabled', 'true');
    firstChoiseMode = false;
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
    return id = 'cell' + Math.floor(Math.random() * size);
}

function zero(id) {
    role = circle;
    id = generateNumberOfCell(9);
    if (gameCeilFilled.includes(id)) {
        zero(generateNumberOfCell(9), role);
    } else {
        playerNumber = 0;
        gameCeilFilled.push(id);
        document.getElementById(id).innerHTML = '<img src="./circle.png">';;
        let i = +(id.slice(4, 5));
        gameCeil[i] = role;
        if (checkWin()) {
            getWinnerMessage(playerNumber, 2);
            setTimeout(clearGameTable, 1000);
        }

    }
}

function checkWin() {
    for (let i = 0; i < (size * size); i += numberOfCellsToWin) {
        if (gameCeil[i] == circle && gameCeil[i + 1] == circle && gameCeil[i + 2] == circle ||
            gameCeil[i] == cross && gameCeil[i + 1] == cross && gameCeil[i + 2] == cross) {
            return true;
        }
    }

    for (let i = 0; i < size; i++) {
        if (gameCeil[i] == circle && gameCeil[i + numberOfCellsToWin] == circle && gameCeil[i + 2 * numberOfCellsToWin] == circle ||
            gameCeil[i] == cross && gameCeil[i + numberOfCellsToWin] == cross && gameCeil[i + 2 * numberOfCellsToWin] == cross) {
            return true;
        }
    }

    for (let i = 0; i < size; i++) {
        if (gameCeil[i] == circle && gameCeil[i + numberOfCellsToWin + 1] == circle && gameCeil[i + 2 * numberOfCellsToWin + 2] == circle ||
            gameCeil[i] == cross && gameCeil[i + numberOfCellsToWin + 1] == cross && gameCeil[i + 2 * numberOfCellsToWin + 2] == cross) {
            return true;
        }
        if (gameCeil[size - 1] == circle && gameCeil[2 * size - i - 1] == circle && gameCeil[3 * size - 2 * i - 1] == circle ||
            gameCeil[size - 1] == cross && gameCeil[2 * size - i - 1] == cross && gameCeil[3 * size - 2 * i - 1] == cross) {
            return true;
        }
    }
    if (gameCeil[0] && gameCeil[1] && gameCeil[2] && gameCeil[3] && gameCeil[4] && gameCeil[5] && gameCeil[6] && gameCeil[7] && gameCeil[8]) {
        getDrawMessage();
    };
}


// if (gameCeil[0] == circle && gameCeil[4] == circle && gameCeil[8] == circle ||
//     gameCeil[0] == cross && gameCeil[4] == cross && gameCeil[8] == cross) return true;

// if (gameCeil[2] == circle && gameCeil[4] == circle && gameCeil[6] == circle ||
//     gameCeil[2] == cross && gameCeil[4] == cross && gameCeil[6] == cross) return true;

// if (gameCeil[0] && gameCeil[1] && gameCeil[2] && gameCeil[3] && gameCeil[4] && gameCeil[5] && gameCeil[6] && gameCeil[7] && gameCeil[8]) {
//     getDrawMessage();
// };


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
        gameCeilFilled.push(id);
        let i = +(id.slice(4, 5));
        gameCeil[i] = role;
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
    if (lastRole == cross) {
        role = circle;
        document.getElementById(id).innerHTML = '<img src="./cross.png">';
        gameCeilFilled.push(id);
        let i = +(id.slice(4, 5));
        gameCeil[i] = role;
        lastRole = role;
        playerNumber = 1;

        return;
    }
    if (lastRole == circle) {
        role = cross;
        document.getElementById(id).innerHTML = '<img src="./circle.png">';
        gameCeilFilled.push(id);
        let i = +(id.slice(4, 5));
        gameCeil[i] = role;
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


    gameCeilFilled = [];
    gameCeil = [];
    playerNumber = 2;
    document.getElementById('btn-start').setAttribute('disabled', 'false');

    showGameArea();
}