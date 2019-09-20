const lists = document.querySelectorAll('li');

function print(lists) {
    return Array.from(lists).filter(e => {
        return e.textContent.includes('e');
    })
}

console.log(print(lists));