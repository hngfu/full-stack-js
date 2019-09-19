var board = document.querySelector('.game-board');

var col = 3;
var row = 4;

var openedCardCount = 0;

var playFlag = false;
var clickedCards = [];

function getShuffledColors() {
    var colors = ['black', 'black', 'darkkhaki', 'darkkhaki', 'indigo', 'indigo', 'darkseagreen', 'darkseagreen', 'darkslategrey', 'darkslategrey', 'wheat', 'wheat'];
    var shuffledColors = [];
    while (colors.length !== 0) {
        shuffledColors.push(colors.splice(Math.floor(Math.random() * colors.length), 1)[0]);
    }
    return shuffledColors;
}

function makeCard(color) {
    var card = document.createElement('div');
    card.className = 'card';
    var front = document.createElement('div');
    front.className = 'card-front';
    var back = document.createElement('div');
    back.className = 'card-back';
    back.style.backgroundColor = color;
    card.appendChild(front);
    card.appendChild(back);
    return card;
}

function flip(e) {
    if (e.currentTarget.classList.contains('card')
        && !e.currentTarget.classList.contains('flipped')
        && playFlag === true) {
        e.currentTarget.classList.toggle('flipped');
        clickedCards.push(e.currentTarget);
        if (clickedCards.length === 2) {
            playFlag = false;
            var firstCardColor = clickedCards[0].querySelector('.card-back').style.backgroundColor;
            var secondCardColor = clickedCards[1].querySelector('.card-back').style.backgroundColor;
            if (firstCardColor !== secondCardColor) {
                setTimeout(() => {
                    clickedCards[0].classList.toggle('flipped');
                    clickedCards[1].classList.toggle('flipped');
                    clickedCards = [];
                    playFlag = true;
                }, 500)
            } else {
                clickedCards = [];
                playFlag = true;
                openedCardCount += 2;
                if (openedCardCount == col * row) {
                    board.innerHTML = '';
                    appendCards(board);
                    showHint(board);
                    openedCardCount = 0;
                }
            }
        }
    }
}

function appendCards(board) {
    var colors = getShuffledColors();
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            var card = makeCard(colors[i * col + j + i]);
            card.addEventListener('click', flip);
            board.appendChild(card);
        }
    }
}

function showHint(board) {
    board.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
            setTimeout(() => {
                card.classList.remove('flipped');
                if (index === col * row - 1) playFlag = true;
            }, 2000)
        }, 100 * index)
    });
}

appendCards(board);
showHint(board);