let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let titleDisplay = document.querySelector("#titleDisplay");
let messageDisplay = document.querySelector("#messageDisplay");
let bgContainer = document.querySelector("#bgContainer");
let resetButton = document.querySelector("#reset");
let easyButton = document.querySelector("#easyButton");
let hardButton = document.querySelector("#hardButton");

let cant = squares.length;
let colors = generateRandomColors(cant);
let pickedColor = pickColor();
let blocked = false;
colorDisplay.textContent = rgbToText(pickedColor);

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
            if (squareColor === rgbToText(pickedColor)) {
                messageDisplay.textContent = "Correct!";
                display(cant);
                bgContainer.style.backgroundColor = rgbToText(pickedColor);
                changeColors(pickedColor);
                titleDisplay.style.color = getBack(pickedColor);
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
        arr.push(function () {
            //pick each color from 0 - 255
            let r = Math.floor(Math.random() * 255) + 1;
            let g = Math.floor(Math.random() * 255) + 1;
            let b = Math.floor(Math.random() * 255) + 1;
            //return "rgb(" + r + ", " + g + ", " + b + ")";
            return [r, g, b];
        }());
    }
    //return array
    return arr;
}

function rgbToText(rgb) {
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
}

function getBack(color) {
    if ((color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) > 186) {
        return "#232323";
    } else {
        return "#f3f3f3";
    }
}

function changeColors(color) {

    for (let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = function () {
            if (Array.isArray(color[0])) return rgbToText(color[i]);
            return rgbToText(color);
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
    colorDisplay.textContent = rgbToText(pickedColor);
    titleDisplay.style.color = "#f3f3f3"
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