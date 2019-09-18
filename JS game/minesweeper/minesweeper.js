var startButton = document.querySelector('#start');
var gameBoard = document.querySelector('#game');
var boardData;
var boardWidth;
var boardHeight;
var rightCheck;
var clickCheck;
var playFlag;
var openCnt;
var mine;

function counting(col, row, board) {
    var cnt = 0;
    [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(arr => {
        var line = col + arr[0];
        var cell = row + arr[1];
        if (line >= 0 && line < boardWidth && cell >= 0 && cell < boardHeight) {
            if (board[line][cell] === -1) cnt++;
        }
    })
    return cnt;
}

function makeBoardData(mine) {
    var arr = [];
    rightCheck = [];
    clickCheck = [];
    for (var i = 0; i < boardWidth; i++) {
        var subArr = [];
        var subRightArr = [];
        var subClickArr = [];
        for (var j = 0; j < boardHeight; j++) {
            subArr[j] = 0;
            subRightArr[j] = 0;
            subClickArr[j] = 0;
        }
        arr[i] = subArr;
        rightCheck[i] = subRightArr;
        clickCheck[i] = subClickArr;
    }
    var cnt = 0;
    while (cnt != mine) {
        var hor = Math.floor(Math.random() * boardWidth);
        var ver = Math.floor(Math.random() * boardHeight);
        if (arr[hor][ver] === 0) {
            arr[hor][ver] = -1;
            cnt++;
        }
    }
    for (var i = 0; i < boardWidth; i++) {
        for (var j = 0; j < boardHeight; j++) {
            if (arr[i][j] > -1) {
                arr[i][j] = counting(i, j, arr);
            }
        }
    }
    return arr;
}

function openBomb(board) {
    for (var i = 0; i < boardWidth; i++) {
        for (var j = 0; j <boardHeight; j++) {
            if (boardData[i][j] === -1) {
                board.children[i].children[j].textContent = '💥';
                board.children[i].children[j].classList.add('opened');
            }
        }
    }
}

function open(target) {
    var col = target.parentElement.rowIndex;
    var row = target.cellIndex;
    if (clickCheck[col][row] === 0) {
        target.classList.add('opened');
        openCnt++;
        clickCheck[col][row] = 1;
        if (boardData[col][row] === 0) {
            [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(arr => {
                var line = col + arr[0];
                var cell = row + arr[1];
                if (line >= 0 && line < boardWidth && cell >= 0 && cell < boardHeight) {
                    target.textContent = '';
                    open(target.parentElement.parentElement.children[line].children[cell]);
                }
            })
        } else {
            target.textContent = boardData[col][row];
        }
    }
}

function makeRoom() {
    var room = document.createElement('td');
    room.addEventListener('contextmenu', e => {
        e.preventDefault();
        var col = e.target.parentElement.rowIndex;
        var row = e.target.cellIndex;
        if (clickCheck[col][row] === 0 && playFlag === true) {
            e.target.textContent = (e.target.textContent === '')? '🚩' : '';
            rightCheck[col][row] = (rightCheck[col][row] === 0)? 1 : 0;
        }
    })
    room.addEventListener('click', e => {
        var line = e.target.parentElement
        var col = line.rowIndex;
        var row = e.target.cellIndex;
        if (rightCheck[col][row] === 0 && playFlag === true) {
            if (boardData[col][row] === -1) {
                e.target.textContent = '💥';
                e.target.id = 'boom';
                playFlag = false;
                openBomb(e.target.parentElement.parentElement);
                document.querySelector('#result').textContent = 'Game Over 😝';
            } else {
                open(e.target);
                if (openCnt === boardWidth * boardHeight - mine) {
                    playFlag = false;
                    document.querySelector('#result').textContent = '👑승리👑';
                }
            }
        }
    })
    return room;
}

function makeTable(col, row) {
    var table = document.createElement('table');
    for (var i = 0; i < col; i++) {
        var line = document.createElement('tr');
        for (var j = 0; j < row; j++) {
            line.appendChild(makeRoom());
        }
        table.appendChild(line);
    }
    return table;
}

startButton.addEventListener('click', function() {
    boardWidth = Number(document.querySelector('#col').value);
    boardHeight = Number(document.querySelector('#row').value);
    mine = Number(document.querySelector('#mine').value);
    playFlag = true;
    document.querySelector('#result').textContent = '';
    openCnt = 0;
    boardData = makeBoardData(mine);
    gameBoard.replaceChild(makeTable(boardWidth, boardHeight), gameBoard.firstChild);    
})