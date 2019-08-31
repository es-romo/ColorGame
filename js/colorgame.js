class RGBcolor {
    constructor(R, G, B) {
        this.R = R;
        this.G = G;
        this.B = B;
    }
    toText() {
        return "rgb(" + this.R + ", " + this.G + ", " + this.B + ")";
    }
}

let gamemodeButtons = document.querySelectorAll("#gameModes button");
let squareContainer = document.querySelector("#squareContainer");
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let titleDisplay = document.querySelector("#titleDisplay");
let messageDisplay = document.querySelector("#messageDisplay");
let bgContainer = document.querySelector("#bgContainer");
let resetButton = document.querySelector("#reset");
let easyButton = document.querySelector("#easyButton");
let hardButton = document.querySelector("#hardButton");

//Global Variables
let cant = squares.length;
let colors;
let pickedColor;
let blocked;

//entry point
main();

function main() {
    resetButton.addEventListener("click", function () {
        newGame(cant);
    })
    
    for (i = 0; i < gamemodeButtons.length; i++) {
        gamemodeButtons[i].addEventListener("click",
            function () {
                switch (this.textContent) {
                    case "EASY":
                        if (gameMode()!=0) {
                            gamemodeButtons[1].classList.remove("btn-active");
                            gameMode(0);
                            this.classList.add("btn-active");
                        }
                        break;
                    case "HARD":
                        if (gameMode()!=1) {
                            gamemodeButtons[0].classList.remove("btn-active");
                            gameMode(1);
                            this.classList.add("btn-active");
                        }
                        break;
                }
            }
        )
    }
    
    //add click listeners to squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            if (!blocked) {
                let squareColor = this.style.backgroundColor;
                //If color is correct
                if (squareColor === pickedColor.toText()) {
                    //Block click event
                    blocked = true;
                    //Show "Correct!"
                    messageDisplay.textContent = "Correct!";
                    //Change all squares to pickedColor
                    changeColors(pickedColor);
                    //Display all squares
                    display(cant);
                    //Change background color to to picked color 
                    bgContainer.style.backgroundColor = pickedColor.toText();
                    //Change title color depending on pickedColor brightness
                    if ((pickedColor.R * 0.299 + pickedColor.G * 0.587 + pickedColor.B * 0.114) > 186) {
                        titleDisplay.classList.add("dark");
                        titleDisplay.classList.remove("white");
                    } else {
                        titleDisplay.classList.add("white");
                        titleDisplay.classList.remove("dark");
                    }
                } else { //If its not correct
                    this.classList.add("hidden");
                    messageDisplay.textContent = "Try Again!";
                }
            }
        })
    }
    //GameCode
    newGame(cant);
}

//functions
window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 32: //Space
            newGame(cant);
            return false;
            break;
        case 81: //Q
            //switchMode();
            gameMode("toggle");
            return false;
            // gamemode()
            break;
    }
}

function gameMode(mode) {

    switch (mode) {
        case null:
        case undefined:
            return (cant == 3) ? 0 : 1;
            break;
        case 0:
            cant = 3;
            easyButton.classList.add("btn-active");
            hardButton.classList.remove("btn-active");
            newGame(cant);
            return 0;
            break;
        case 1:
            cant = 6;
            hardButton.classList.add("btn-active");
            easyButton.classList.remove("btn-active");
            newGame(cant);
            break
        case "toggle":
            return ((cant === 3) ? gameMode(1) : gameMode(0));
            break;
    }
}

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
            //RGB color object
            return new RGBcolor(r, g, b);
        }());
    }
    //return array
    return arr;
}

function changeColors(color) {

    for (let i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = function () {
            if (Array.isArray(color)) return color[i].toText();
            return color.toText();
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
    colors = generateRandomColors(cant);
    pickedColor = pickColor();
    changeColors(colors);
    display(cant);
    colorDisplay.textContent = pickedColor.toText();
    messageDisplay.textContent = null;
    bgContainer.style.backgroundColor = null;
    //reset titleDisplay color to white
    if (titleDisplay.classList.contains("dark")) titleDisplay.classList.remove("dark");
    titleDisplay.classList.add("white");
    blocked = false;
};