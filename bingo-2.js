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
  const letter = ["B", "I", "N", "G", "O"][col];
  const numbers = allBingoSquares[col];
  if (numbers.length === 0) {
    return ""; // Return an empty string if no numbers left in the column
  }
  const randomIndex = Math.floor(Math.random() * numbers.length);
  return `${letter}${numbers.splice(randomIndex, 1)[0]}`;
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
  let square = `<td class="free">FREE</td>`;

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
      card += `<td>`;
      if (row === 2 && col === 2) {
        // Middle square
        card += `<span class="free">FREE</span>`;
      } else {
        // Call getSquare to get a Bingo number based on the column
        let bingoNumber = getSquare(col);
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
  const selectedSquare = event.target;

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
