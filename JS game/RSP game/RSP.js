var rock = '-32';
var scissors = '-180';
var paper = '-333';
var rsp = [rock, scissors, paper];
var index = 0;

var enemy = document.querySelector('#enemy');
var resultView = document.querySelector('#result');

function makeInterval() {
    return setInterval(() => {
        if (index == 2) index = 0;
        else index++;
        enemy.style.backgroundPosition = rsp[index] + 'px 0px';
    }, 100);
}
var interval = makeInterval();

var buttons = document.querySelectorAll('.rsp');
buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        var clickedIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
        if (clickedIndex === index) resultView.textContent = '비겼습니다--';
        else if ([-1, 2].includes(clickedIndex - index)) resultView.textContent = '이겼습니다~!@#';
        else resultView.textContent = '졌.잘.싸ㅠ';
        clearInterval(interval);
        setTimeout(() => {
            interval = makeInterval();
        }, 1000);
    });
})