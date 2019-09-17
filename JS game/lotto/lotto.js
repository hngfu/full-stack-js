var balls = Array(45)
    .fill()
    .map(function (element, index) {
    return index + 1;
})

var result = [];

for (var i = 0; i < 6+1; i++) {
    var x = balls.splice(Math.floor(Math.random() * balls.length), 1)[0];
    result.push(x);
}

var bonus = result.pop();
result.sort(function (a, b) {
    return a - b;
});

var resultView = document.querySelector('#result');
var bonusView = document.querySelector('#bonus');

function makeBall(number) {
    var ball = document.createElement('div');
    ball.textContent = number;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '50%';
    ball.style.width = '40px';
    ball.style.height = '40px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';
    ball.style.fontSize = '24px';
    ball.style.fontWeight = 'bold';
    ball.style.lineHeight = '40px';
    if (number <= 10) {
        ball.style.backgroundColor = 'red';
    } else if (number <= 20) {
        ball.style.backgroundColor = 'orange';
    } else if (number <= 30) {
        ball.style.backgroundColor = 'yellow';
    } else if (number <= 40) {
        ball.style.backgroundColor = 'blue';
    } else {
        ball.style.backgroundColor = 'green';
    }
    return ball
}

result.forEach(function(v, i) {
    setTimeout(() => {
        var ball = makeBall(v);
        resultView.appendChild(ball);
    }, i * 1000);
})

setTimeout(() => {
    var bonusBall = makeBall(bonus);
    bonusView.appendChild(bonusBall);
}, 6000);
