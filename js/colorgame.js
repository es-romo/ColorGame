let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#messageDisplay");
let bgContainer = document.querySelector("#bgContainer");
let resetButton = document.querySelector("#reset");
let easyButton = document.querySelector("#easyButton");
let hardButton = document.querySelector("#hardButton");

let cant = squares.length;
let colors = generateRandomColors(cant);
let pickedColor = pickColor();
let blocked = false;
colorDisplay.textContent = pickedColor;

resetButton.addEventListener("click", function () {
    newGame(cant);
})

easyButton.addEventListener("click", function () {
    if (cant != 3) {
        cant = 3;
        newGame(cant);
        easyButton.classList.add("btn-active");
        hardButton.classList.remove("btn-active");
    }
})

hardButton.addEventListener("click", function () {
    if (cant != squares.length) {
        cant = squares.length;
        newGame(cant);
        hardButton.classList.add("btn-active");
        easyButton.classList.remove("btn-active");
    }
})

//add click listeners to squares
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
        if (!blocked) {
            let squareColor = this.style.backgroundColor;
            if (squareColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                display(cant);
                bgContainer.style.backgroundColor = pickedColor;
                changeColors(squareColor);
                blocked = true;
            } else {
                this.classList.add("hidden");
                messageDisplay.textContent = "Try Again!";
            }
        }
    })
}

document.body.onkeyup = function (e) {
    switch (e.keyCode) {
        case 32: //Space 
            newGame(cant);
            break;
        case 81: //Q
            switcMode();
            break;
    }
}

//set Inital Colors
changeColors(colors);

function generateRandomColors(num) {
    //make an array
    let arr = [];
    //repeat num times
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    //return array
    return arr;
}
function randomColor() {
    //pick each color from 0 - 255
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


function changeColors(color) {

    for (let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = function () {
            if (Array.isArray(color)) return color[i];
            return color;
        }();
    }
}

function pickColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function display(cant) {
    for (let i = 0; i < squares.length; i++) {
        if (i < cant) {
            squares[i].classList.remove("hidden");
        } else {
            squares[i].classList.add("hidden");
        }
    }
}

function newGame(cant) {
    blocked = false;
    display(cant);
    colors = generateRandomColors(cant);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    bgContainer.style.backgroundColor = null;
    changeColors(colors);
};

function switcMode() {
    if (cant === 6) {
        cant = 3;
        newGame(cant);
        easyButton.classList.add("btn-active");
        hardButton.classList.remove("btn-active");
    } else if (cant === 3) {
        cant = 6;
        newGame(cant);
        hardButton.classList.add("btn-active");
        easyButton.classList.remove("btn-active");
    }
};