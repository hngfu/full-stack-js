var body = document.body;

var result = document.createElement('h1');
body.appendChild(result);

var form = document.createElement('form');
var input = document.createElement('input');
form.appendChild(input);
input.maxLength = 4;
var button = document.createElement('button');
form.appendChild(button);
button.textContent = '입력';
body.appendChild(form);

function getRandomNumber() {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var result = [];
    for (var i = 0; i < 4; i++) {
        var x = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
        result.push(x);
    }
    return result;
}

var targetNumber = getRandomNumber();

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var strikeCnt = 0;
    var ballCnt = 0;
    for (var i = 0; i < 4; i++) {
        var index = targetNumber.indexOf(Number(input.value[i]));
        if (index > -1) {
            if (index === i) strikeCnt++;
            else ballCnt++;
        }
    }
    if (strikeCnt === 4) {
        result.textContent = '홈러어어어어언~⚾';
        targetNumber = getRandomNumber();
    } else {
        result.textContent = strikeCnt + '스트라이크 ' + ballCnt + '볼 입니다.';
    }
    input.value = '';
    input.focus();
});