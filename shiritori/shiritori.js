var body = document.body;

var word = document.createElement('div');
word.textContent = '흥푸';
body.appendChild(word);

var form = document.createElement('form');
var input = document.createElement('input');
form.appendChild(input);
var button = document.createElement('button');
button.textContent = '입력';
form.appendChild(button);
body.appendChild(form);
var result = document.createElement('div');
body.appendChild(result);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    var lastWord = word.textContent[word.textContent.length - 1];
    var firstWord = input.value[0];
    if (lastWord === firstWord) 
    {
        result.textContent = '정답~!';
        word.textContent = input.value;
    }
    else
    {
        result.textContent = '땡!!';
    }
    input.value = '';
});