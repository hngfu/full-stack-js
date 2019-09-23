
function print() {
    const lists = document.querySelectorAll('li');
    const result = Array.from(lists).filter(e => {
        return e.innerText.includes('e');
    })
    console.log(result);
}

print();