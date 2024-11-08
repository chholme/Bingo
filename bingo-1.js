// NOTE - if you'd like to write this to randomly generate the Bingo number, then have validation to make sure of no duplicates, you can do so.
// Just rework the code noting which function the event listener is attached to

// GOAL FOR BINGO 1:
// When the bingo ball is clicked, it displays a bingo number in the center of the ball
// The numbers are unique (no duplicates) and consist of a letter followed by a number, e.g. "B10"
// "B" (numbers 1–15), "I" (numbers 16–30), "N" (numbers 31–45), "G" (numbers 46–60), and "O" (numbers 61–75)
// https://en.wikipedia.org/wiki/Bingo_(American_version)

// global variables for bingo balls
let allBingoBalls = createBingoNumsList();
let bingoBallsCalled = [];

// BINGO NUMBERS LIST (for the bingo balls)
// output: [ "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "I11", … ]

function createBingoNumsList() {
  // need a list to store bingo nums

  // list of the letters in BINGO, or a "BINGO" string
  let bingoNumsList = [];
  let bingoLetters = ["B", "I", "N", "G", "O"];
  let minNumbers = [1, 16, 31, 46, 61];
  let maxNumbers = [15, 30, 45, 60, 75];

  // loop from 1-75
  // "B" (numbers 1–15), "I" (numbers 16–30), "N" (numbers 31–45), "G" (numbers 46–60), and "O" (numbers 61–75)
  for (let i = 0; i < bingoLetters.length; i++) {
    let letter = bingoLetters[i];
    let min = minNumbers[i];
    let max = maxNumbers[i];

    for (let j = min; j <= max; j++) {
      bingoNumsList.push(`${letter}${j}`);
    }
  }

  return bingoNumsList;
}

// test - should return a list of 75 bingo numbers
console.log(createBingoNumsList());

// GET A BINGO NUMBER
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// use Array.splice() to delete an element by index, thus destorying the list as you go
// we want to do this so we don't have to worry about checking for duplicates
// note: Array.splice() returns an element(s) in an ARRAY
// IF WE HAVE BINGO BALLS: console.log() an array of bingo balls called = bingoBallsCalled
// INTERFACE: number displayed on #bingo-ball updates when ball is clicked
//            notice that you'll need to put the number in the <span>
// OUT OF BALLS?: remove the event listener and output a console.log "error" message

function getBingoBall() {
  console.log(bingoBallsCalled);
  // Check if there are bingo balls left
  // get bingo number
  // of we have bingo balls left in our list:
  // randomly select a number from the entire list allBingoBalls (random index)
  // remove that number from the list (Array.splice())
  // add  number to a new list called bingoBallsCalled
  // console.log(bingoBallsCalled)
  if (allBingoBalls.length > 0) {
    // random index within range bingo balls
    let randomIndex = Math.floor(Math.random() * allBingoBalls.length);

    // Remove the selected ball from allBingoBalls
    let ball = allBingoBalls.splice(randomIndex, 1)[0];

    // Add the selected ball to the bingoBallsCalled list
    bingoBallsCalled.push(ball);

    // Display the selected ball number
    document.querySelector("#bingo-ball span").textContent = ball;

    // show updated bingoBallsCalled array
    console.log("Bingo Balls Called: ", bingoBallsCalled);
  } else {
    // else:
    // remove event listener
    // console.log() an error message
    //document.querySelector("#bingo-ball").removeEventListener("click", getBingoBall);
    // If there are no more bingo balls, remove the event listener
    // If there are no more bingo balls left, remove the event listener
    document
      .querySelector("#bingo-ball")
      .removeEventListener("click", getBingoBall);
    console.log("Error: No more bingo balls to choose from");
  }
}

// EVENT LISTENTER
// when #bingo-ball is clicked, call the function getBingoBall
document.querySelector("#bingo-ball").addEventListener("click", getBingoBall);
