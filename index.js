const grid = document.querySelector("#grid");
const button = document.getElementById("button");
let squares = [];
let direction = 1;
let snake = [2, 1, 0];
const width = 10;
let appleIndex = 0;
let score = 0;
let timepass = 1000;
let speed = 0.9;
let timerid = 0;

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid()

snake.forEach(index => {
    squares[index].classList.add("snake");
});

function startGame() {
    snake.forEach(index => {
        squares[index].classList.remove("snake");
    })
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerid)
    direction = 1;
    snake = [2, 1, 0];
    snake.forEach(index => {
        squares[index].classList.add("snake");
    });
    score = 0;
    document.getElementById("score").textContent = score;
    timepass = 1000;
    speed = 0.9;
    generateApples()
    timerid = setInterval(move, timepass)
}

button.addEventListener('click', startGame)

function move() {
    if (
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] % width === 9 && direction === 1) ||
        (snake[0] - width < 0 && direction === -width) ||
        (snake[0] + width >= 100 && direction === width) ||
        (squares[snake[0] + direction].classList.contains("snake"))
    ) {
        document.getElementById("overlay").style.display = 'block';
        document.getElementById("result").textContent = score;
        return clearInterval(timerid);
    }

    const tail = snake.pop();
    squares[tail].classList.remove("snake");
    snake.unshift(snake[0] + direction);
    if (squares[snake[0]].classList.contains("apple")) {
        //remove the class of apple
        squares[snake[0]].classList.remove("apple")
            //grow our snake by adding class of snake to it
        squares[snake[0]].classList.add("snake")
            //grow our snake array
        snake.unshift(appleIndex)
            //generate new apple
        generateApples()
            //add one to the score
        score++;
        //display our score
        document.getElementById("score").textContent = score;
        //speed up our snake
        clearInterval(timerid)
        timepass *= speed;
        timerid = setInterval(move, timepass)

    }
    squares[snake[0]].classList.add("snake");
}

document.getElementById("close").addEventListener('click', function() {
    document.getElementById("overlay").style.display = 'none';
})

function generateApples() {
    do {
        appleIndex = Math.floor(squares.length * Math.random());
    }
    while (squares[appleIndex].classList.contains("snake"))
    squares[appleIndex].classList.add("apple")
}

generateApples()

function controle(e) {
    if (e.which === 37) {
        direction = -1;
    } else if (e.which === 38) {
        direction = -width;
    } else if (e.which === 39) {
        direction = 1;
    } else if (e.which === 40) {
        direction = width;
    }
}

document.addEventListener('keyup', controle)