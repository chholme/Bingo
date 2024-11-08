// GOAL: COMPLETE THE BINGO GAME
// TO START: ADD IN YOUR CODE FROM BINGO 1 and BINGO 2 HERE

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

// Bingo 2:
// GOAL FOR BINGO 2:
// GET YOUR CODE BELOW TO WORK - ADD UNDERNEATH CODE FROM BINGO 1
// Dynamically create a Bingo Card and display it on the page

// global variables for bingo card
let allBingoSquares = createBingoNestedList();
let squaresStamped = [];

// leave this here for now
function init() {
  createBingoCard();
  console.log(allBingoSquares);
}
init();

// BINGO NUMBERS IN A NESTED LIST (for the bingo card)
// "B" (numbers 1–15), "I" (numbers 16–30), "N" (numbers 31–45), "G" (numbers 46–60), and "O" (numbers 61–75)
// Array(5) [ (15) […], (15) […], (15) […], (15) […], (15) […] ]
//    0: Array(15) [ "B1", "B2", "B3", … ]
//    1: Array(15) [ "I16", "I17", "I18", … ]
//    2: Array(15) [ "N31", "N32", "N33", … ]
//    3: Array(15) [ "G46", "G47", "G48", … ]
//    4: Array(15) [ "O61", "O62", "O63", … ]

function createBingoNestedList() {
  // List to store the nested Bingo numbers
  let bingoNumsNestedList = [];

  // List of the letters in BINGO
  let bingoLetters = ["B", "I", "N", "G", "O"];

  // Loop through the letters
  for (let i = 0; i < bingoLetters.length; i++) {
    let letter = bingoLetters[i];

    // List to store numbers for the current letter
    let letterNumbers = [];

    // Define the number range for the current letter
    let min = i * 15 + 1; // Start of the range
    let max = (i + 1) * 15; // End of the range

    // Loop through the numbers within the range
    for (let j = min; j <= max; j++) {
      letterNumbers.push(`${letter}${j}`);
    }

    // Add the list of numbers for the current letter to the nested list
    bingoNumsNestedList.push(letterNumbers);
  }
  return bingoNumsNestedList;
}

// GET A BINGO NUMBER FOR EACH SQUARE IN THE BINGO CARD
// Again: use Array.splice() and random to select an element
// Reminder: numbers for the bingo card squares are in NESTED list
// INPUT: a column index (0 is column "B", 1 is column "I", etc..)
// RETURN: a number to put into a bingo card square (e.g. "B8" for column 0)

function getSquare(col) {
  const numbers = allBingoSquares[col];
  if (numbers.length === 0) {
    return ""; // Return an empty string if no numbers left in the column
  }
  const randomIndex = Math.floor(Math.random() * numbers.length);

  return `${numbers.splice(randomIndex, 1)[0]}`;
}

// testing - should return a value starting with "G"
// getSquare(3);

// CREATE A 5x5 BINGO CARD
// Complete the table to display the full card
// Each column has values matching its header, e.g. "G" only shows "G46-G60"
// MIDDLE SQUARE IS ALWAYS "FREE"
// Choice to convert this to create New elements rather than using insertAdjacentHTML

function createBingoCard() {
  const letters = ["B", "I", "N", "G", "O"];
  const gameCard = document.querySelector("#game-card");

  let card = `<table>\n`;
  // header row
  card += `<tr class="header">`;
  for (let letter of letters) {
    card += `<th>${letter}</th>`;
  }
  card += `</tr>`;

  // add rest of rows <tr> and columns <td> (5 x 5)
  // middle square should look like this <td class="free">FREE</td>
  let middleSquare = `<td class="free">FREE</td>`;
  // loop to put in a TR
  // add <tr>
  // loop 5 times to put 5 TDs
  // add <TD>
  // decision -> is it the middle square??
  // if not, then call getSquare(column-num);
  // add </TR>
  // Loop to create rows
  for (let row = 0; row < 5; row++) {
    card += `<tr>`;
    // Loop to create columns
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        // Middle square
        card += middleSquare;
      } else {
        // Call getSquare to get a Bingo number based on the column
        let bingoNumber = getSquare(col);
        card += `<td>`;
        card += bingoNumber;
      }
      card += `</td>`;
    }
    card += `</tr>`;
  }

  card += `</table>`;

  gameCard.insertAdjacentHTML("afterbegin", card);
}

// STAMP THE BINGO CARD!
// add a class to the clicked <td> called "stamped"
//      remember event.target will help here
// then add the text from the <td> to our list of squaresStamped
//      we'll use this in the final round

function stampCard(event) {
  let selectedSquare = event.target;

  // Check if the square is already stamped (contains the "stamped" class)
  if (!selectedSquare.classList.contains("stamped")) {
    selectedSquare.classList.add("stamped");
    squaresStamped.push(selectedSquare.textContent);
  }
}

// EVENT LISTENER
// when ANY <td> is clicked, the function stampcard is called - you'll need forEach()
const tdElements = document.querySelectorAll("td");

tdElements.forEach((td) => {
  td.addEventListener("click", stampCard);
});

//Bingo 3:

// CHECK IF THE LIST OF 'SQUARES STAMPED' IS A SUBSET OF ALL 'BINGO BALLS CALLED'
function checkIfValid(fullList, subList) {
  console.log(fullList);
  console.log(subList);
  return subList.every((el) => {
    return fullList.includes(el);
  });
}
// "B" (numbers 1–15), "I" (numbers 16–30), "N" (numbers 31–45), "G" (numbers 46–60), and "O" (numbers 61–75)

// test - should return true, then false
// console.log(checkIfValid(['B6','I21', 'N33', 'G50', 'O75'], ['B6', 'N33']));
// console.log(checkIfValid(['B6','I21', 'N33', 'G50', 'O75'], ['B6', 'N42']));

// THINK YOU'VE GOT A BINGO?
// We won't completely check for this as that would be too much
// BUT WE CAN DO SOME VALIDATION:
//      use checkIfValid to see if the squaresStamped were bingoBallsCalled
//      make sure at least 5 squares were stamped on the card
// IF VALID:
//      document.querySelector("#game-over").style.display = "flex";
//      AND
//      update H2 message to say "Bingo!"
// IF NOT VALID:
//      document.querySelector("#game-over").style.display = "flex";
//      AND
//      update H2 message to say "Something isn't right..."

function gotBingo() {
  if (squaresStamped.length >= 5) {
    if (checkIfValid(bingoBallsCalled, squaresStamped)) {
      document.querySelector("#game-over").style.display = "flex";
      document.querySelector("h2").textContent = "Bingo!";
    } else {
      document.querySelector("#game-over").style.display = "flex";
      document.querySelector("h2").textContent = "Something isn't right...";
    }
  }
}

// PLAY BINGO GAME AGAIN
// re-hide end screen by setting #game-over div to display: none;
// reset all four global variables
// if the button clicked is "Play Again?"
//      delete the board and re-create it
// else
//      keep the current board, but remove all "stamped" classes on <td> tags

function playAgain(event) {
  // rehide  end screen
  document.querySelector("#game-over").style.display = "none";
  squaresStamped = [];
  bingoBallsCalled = [];
  allBingoBalls = createBingoNumsList();

  if (event.target.id == "play-again") {
    // delete the board and re-create it
    let gameCard = document.querySelector("#game-card");
    gameCard.textContent = "";
    createBingoCard();
    const tdElements = document.querySelectorAll("td");
    tdElements.forEach((td) => {
      td.addEventListener("click", stampCard);
    });
  } else if (event.target.id == "play-again-same-card") {
    // keep the current board
    let stampedSquares = document.querySelectorAll(".stamped");
    stampedSquares.forEach((square) => {
      square.classList.remove("stamped");
    });
  }
}

// EVENT LISTENERS
// (1) when #bingo button clicked, call the function gotBingo
// (2) when #play-again button clicked, call the function playAgain
// (3) when #play-again-same-board button clicked, call the function playAgain

document.querySelector("#bingo").addEventListener("click", gotBingo);
document.querySelector("#play-again").addEventListener("click", playAgain);
document
  .querySelector("#play-again-same-card")
  .addEventListener("click", playAgain);
