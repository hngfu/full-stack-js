var body = document.body;

var checkData = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

var turn = 'X';
function check(col, row) {
    var cnt = 0;
    for (var i = 0; i < 3; i++) {
        if (checkData[col][i] === turn) {
            cnt++;
        }
    }
    if (cnt === 3) return true;
    else cnt = 0;
    for (var i = 0; i < 3; i++) {
        if (checkData[i][row] === turn) {
            cnt++;
        }
    }
    if (cnt === 3) return true;
    else cnt = 0;
    if (col === row) {
        [[0, 0], [1, 1], [2, 2]].forEach(array => {
            if (checkData[array[0]][array[1]] === turn) {
                cnt++;
            }
        })
        if (cnt === 3) return true;
        else cnt = 0;
    }

    if (col + row === 2) {
        [[0, 2], [1, 1], [2, 0]].forEach(array => {
            if (checkData[array[0]][array[1]] === turn) {
                cnt++;
            }
        })
        if (cnt === 3) return true;
        else cnt = 0;
    }
    return false;
}

var result = document.createElement('div');
var table = document.createElement('table');
for (var i = 0; i < 3; i++) {
    var line = document.createElement('tr');
    table.appendChild(line);
    for (var j = 0; j < 3; j++) {
        var room = document.createElement('td');
        line.appendChild(room);
        room.addEventListener('click', function () {
            var line = this.parentElement;
            if (checkData[line.rowIndex][this.cellIndex] === '') {
                checkData[line.rowIndex][this.cellIndex] = turn;
                this.textContent = turn;
                if (check(line.rowIndex, this.cellIndex)) {
                    result.textContent = turn + '님의 승리입니다!🥳';
                    checkData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ];
                    table.childNodes.forEach(element => {
                        element.childNodes.forEach(cell => {
                            cell.textContent = '';
                        });
                    });
                    turn = 'X';
                } else turn = (turn === 'X')? 'O' : 'X';
            }
        });
    }
}
body.appendChild(table);
body.appendChild(result);
