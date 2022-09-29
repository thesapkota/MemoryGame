const gameContainer = document.getElementById("game");
let bodyColor = document.querySelector('body');
let startButton = document.querySelector('button');
let yourScore = document.createElement("var");
let myTop = document.createElement("var");

let header = document.querySelector("h1");
let currentScore = document.createElement("div");
let topScore = document.createElement("div");


const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

// TODO: Implement this function!
let hasFlipped = false;
let timeOut = false;
let firstClick;
let secondClick;
let round = 0;
let matchCount = 0;

function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    if (!event.target.classList.contains("sameColor")) {
        if (!timeOut) {
            event.target.style.backgroundColor = event.target.className;

            if (hasFlipped === false) {
                hasFlipped = true;
                firstClick = event.target;
                //console.log({hasFlipped,firstClick});
            }
            else {
                // hasFlipped = false;
                secondClick = event.target;
                //console.log({hasFlipped,secondClick});
                if (secondClick !== firstClick) {
                    round = round + 1;


                    if (secondClick.className === firstClick.className) {
                        timeOut = true;
                        secondClick.classList.add("sameColor");
                        firstClick.classList.add("sameColor");
                        matchCount += 1;
                        setTimeout(function () {
                            timeOut = false;
                        }, 1000);
                        if (matchCount === COLORS.length / 2) {
                            if (JSON.parse(localStorage.getItem('myTop'))) {
                                if (round < JSON.parse(localStorage.getItem('myTop'))['myTop']) {
                                    localStorage.setItem("myTop", JSON.stringify({ 'myTop': round }));
                                    myTop.innerText = round;
                                    setTimeout(function () { alert("Congratulations On Beating Your Top Score") }, 20);
                                }
                                else {
                                    setTimeout(function () { alert("Congratulations On Solving the Memory Game") }, 20);
                                }
                            }
                            else {
                                localStorage.setItem("myTop", JSON.stringify({ 'myTop': round }));
                                myTop.innerText = round;
                                setTimeout(function () { alert("Congratulations on setting the first Top Score") }, 20);
                            }

                        }
                    }
                    else {
                        timeOut = true;
                        setTimeout(function () {
                            firstClick.style.background = bodyColor.style.background;
                            secondClick.style.background = bodyColor.style.background;
                            timeOut = false;
                        }, 1000);

                    }
                    hasFlipped = false;
                    yourScore.innerText = round;
                }
            }
        }
    }
}

startButton.addEventListener("click", function (e) {
    e.target.remove();

    createDivsForColors(shuffle(COLORS));
    const restartButton = document.createElement("button")
    restartButton.innerText = "Restart The Game";
    currentScore.innerText = "Your Current Score: ";
    topScore.innerText = "Your Top Score: ";
    restartButton.addEventListener("click", function () {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }
        createDivsForColors(shuffle(COLORS));
        hasFlipped = false;
        timeOut = false;
        firstClick;
        secondClick;
        round = 0;
        matchCount = 0;
        yourScore.innerText = 0;
    });
    myTop.innerText = (JSON.parse(localStorage.getItem("myTop"))) ?
        JSON.parse(localStorage.getItem("myTop"))["myTop"] : "N/A";
    yourScore.innerText = 0;

    currentScore.append(yourScore);
    topScore.append(myTop);

    header.append(restartButton);
    header.append(currentScore);
    header.append(topScore);
});



