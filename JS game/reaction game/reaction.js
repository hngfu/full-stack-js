var gameView = document.querySelector('#gameView');
var gameStatus = {
    ready: 'ready',
    wating: 'wating',
    start: 'start'
}
var startTime;
var endTime;
var timeOut;

gameView.addEventListener('click', e => {
    if (e.target.classList.contains(gameStatus.ready)) {
        e.target.classList.replace(gameStatus.ready, gameStatus.wating);
        e.target.textContent = '화면색이 바뀌면 클릭해주세요!';
        timeOut = setTimeout(() => {
            e.target.classList.replace(gameStatus.wating, gameStatus.start);
            e.target.textContent = '클릭하세요!!!';
            startTime = new Date();
        }, Math.random() * 3000 + 2000);
    } else if (e.target.classList.contains(gameStatus.start)) {
        endTime = new Date();
        e.target.classList.replace(gameStatus.start, gameStatus.ready);
        e.target.textContent = (endTime - startTime) / 1000 + '초\n';
        startTime = null;
        endTime = null;
    } else {
        e.target.classList.replace(gameStatus.wating, gameStatus.ready);
        e.target.textContent = '부정출발☠︎';
        startTime = null;
        clearTimeout(timeOut);
    }
})