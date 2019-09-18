var board = document.querySelector('.board');
var boardData;
var sign = {
    me: 'X',
    computer: 'O'
}
var playFlag = true;
var playCnt = 0;

function makeBoardData() {
    var boardData = [];
    for (var i = 0; i < 9; i++) {
        boardData[i] = '';
    }
    return boardData;
}

function isSameSign(col, row, sign) {
    var index = col * 3 + row;
    return boardData[index] === sign;
}

function isEnd(col, row, sign) {
    var check = true;

    for (var i = 0; i < 3; i++) {
        if (!isSameSign(col, i, sign)) {
            check = false;
            break;
        }
    }

    if (check) return true;
    check = true;

    for (var i = 0; i < 3; i++) {
        if (!isSameSign(i, row, sign)) {
            check = false;
            break;
        }
    }

    if (check) return true;
    check = true;

    if (col === row) {
        for (var i = 0; i < 3; i++) {
            if (!isSameSign(i, i, sign)) {
                check = false;
                break;
            }
        }
        if (check) return true;
        check = true;
    }


    if (col + row === 2) {
        for (var i = 0; i < 3; i++) {
            if (!isSameSign(i, 2 - i, sign)) {
                check = false;
                break;
            }
        }
        return check;
    }

    return false;
}

function showResult(message) {
    document.querySelector('#result').textContent = message;
}

function clearBoard() {
    Array.from(board.children).forEach(line => {
        Array.from(line.children).forEach(cell => {
            cell.textContent = '';
        })
    })
}

function computerTurn() {
    setTimeout(() => {
        var flag = true;
        while (flag) {
            var col = Math.floor(Math.random() * 3);
            var row = Math.floor(Math.random() * 3);
            if (boardData[col * 3 + row] === '') {
                boardData[col * 3 + row] = sign.computer;
                board.children[col].children[row].textContent = sign.computer;
                playCnt++;
                if (isEnd(col, row, sign.computer)) {
                    boardData = makeBoardData();
                    clearBoard();
                    playCnt = 0;
                    showResult('zjavbxj가 승리하였습니다😡');
                }
                flag = false;
            }
            playFlag = true;
        }
    }, 1000);
}

boardData = makeBoardData();
board.addEventListener('click', e => {
    var line = e.target.parentNode;
    var col = Array.from(board.children).indexOf(line);
    var row = Array.from(line.children).indexOf(e.target);
    if (boardData[col * 3 + row] === '' && playFlag === true) {
        boardData[col * 3 + row] = sign.me;
        board.children[col].children[row].textContent = sign.me;
        playCnt++;
        playFlag = false;
        if (isEnd(col, row, sign.me)) {
            boardData = makeBoardData();
            clearBoard();
            playCnt = 0;
            showResult('플레이어가 승리하였습니다~!🥳');
        } else if (playCnt === 9) {
            boardData = makeBoardData();
            clearBoard();
            playCnt = 0;
            showResult('무.승.부');
            playFlag = true;
        } else {
            computerTurn();
        }
    }
})