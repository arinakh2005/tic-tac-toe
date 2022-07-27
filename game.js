var gameCeilFilled = new Array(9);
var gameCeil = new Array;
var cross = 'cross';
var circle = 'circle;'
var lastRole = cross;
var mode;
var playerNumber = 2; // 0 - computer


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

function checkWin() { //
    if (gameCeil[0] == circle && gameCeil[1] == circle && gameCeil[2] == circle ||
        gameCeil[0] == cross && gameCeil[1] == cross && gameCeil[2] == cross) return true;

    if (gameCeil[3] == circle && gameCeil[4] == circle && gameCeil[5] == circle ||
        gameCeil[3] == cross && gameCeil[4] == cross && gameCeil[5] == cross) return true;

    if (gameCeil[6] == circle && gameCeil[7] == circle && gameCeil[8] == circle ||
        gameCeil[6] == cross && gameCeil[7] == cross && gameCeil[8] == cross) return true;

    if (gameCeil[0] == circle && gameCeil[3] == circle && gameCeil[6] == circle ||
        gameCeil[0] == cross && gameCeil[3] == cross && gameCeil[6] == cross) return true;

    if (gameCeil[1] == circle && gameCeil[4] == circle && gameCeil[7] == circle ||
        gameCeil[1] == cross && gameCeil[4] == cross && gameCeil[7] == cross) return true;

    if (gameCeil[2] == circle && gameCeil[5] == circle && gameCeil[8] == circle ||
        gameCeil[2] == cross && gameCeil[5] == cross && gameCeil[8] == cross) return true;

    if (gameCeil[0] == circle && gameCeil[4] == circle && gameCeil[8] == circle ||
        gameCeil[0] == cross && gameCeil[4] == cross && gameCeil[8] == cross) return true;

    if (gameCeil[2] == circle && gameCeil[4] == circle && gameCeil[6] == circle ||
        gameCeil[2] == cross && gameCeil[4] == cross && gameCeil[6] == cross) return true;

    if (gameCeil[0] && gameCeil[1] && gameCeil[2] && gameCeil[3] && gameCeil[4] && gameCeil[5] && gameCeil[6] && gameCeil[7] && gameCeil[8]) {
        getDrawMessage();
    };
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
        gameCeilFilled.push(id);
        let i = +(id.slice(4, 5));
        gameCeil[i] = role;
        playerNumber = 1;
    }
    if (checkWin()) {
        getWinnerMessage(playerNumber, 2);
        setTimeout(clearGameTable, 1000);
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
    location.reload();
}