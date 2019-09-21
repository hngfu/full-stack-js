class View {
    constructor(name) {
        this.field = document.querySelector(`div.${name} div.field`);
        this.hero = document.querySelector(`div.${name} div.hero`);
        this.hand = document.querySelector(`div.${name} div.hand`);
    }
}

class Hero {
    constructor(name) {
        this.name = name
        this.hp = 30;
    }
}

class Card {
    constructor(cost, power, hp) {
        this.cost = cost;
        this.power = power;
        this.hp = hp;
    }
}

function getRandomNumber() {
    return Math.ceil(Math.random() * 5);
}


class Game {
    constructor() {
        this.enemyField = [];
        this.myField = [];
    }

    start() {
        this.setCards(this.enemyField);
        this.setCards(this.myField);
    }

    setCards(field) {
        for (let i = 0; i < 5; i++) {
            const card = new Card(getRandomNumber(), getRandomNumber(), getRandomNumber());
            field.push(card);
        }
    }
}


const enemyView = new View('enemy');
const myView = new View('my');
const game = new Game();
game.start();
