var body = document.body;

var question = document.createElement('div');
body.appendChild(question);

var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
question.textContent = num1 + ' 곱하기 ' + num2 + '은?';

var form = document.createElement('form');
var input = document.createElement('input');
form.appendChild(input);
var button = document.createElement('button');
form.appendChild(button);
button.textContent = '입력';
body.appendChild(form);

var judge = document.createElement('div');
body.appendChild(judge);

form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (num1 * num2 == input.value) 
    {
        judge.textContent = '딩동댕~😋';
        num1 = Math.ceil(Math.random() * 9);
        num2 = Math.ceil(Math.random() * 9);
        question.textContent = num1 + ' 곱하기 ' + num2 + '은?';
    }
    else
    {
        judge.textContent = '땡!🤪'
    }
    input.value = '';
    input.focus();
});