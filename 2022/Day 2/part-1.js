/* 
Restate the problem -
  Using an input file of 2 letter codes, separated by a space, and delineated by a new line,
  Determine the "Score" of each line.
  The first column is what your opponent plays, next is my play
      Opponent | Player | *Bonus Points
  Rock -     | A X | *1
  Paper -    | B Y | *2
  Scissors - | C Z | *3

  Winning a round gives you: 6 points / Draw is 3 / Losing is 0
  Bonus points for the shape selected: 1 for rock / 2 for paper / 3 for scissors

Example - 
  A Y - Opponent rock | Player Paper - Player wins (6 pts) + bonus for paper (2 pts) = 8
  B X - Opponent paper | player rock - Player loses (0 pts) + bonus for rock (1 pt) = 1
  C Z - Opponent scissors | player scissors - Player ties (3 pts) + bonus for scissors (3 pts) = 6
  Total Score = 8+1+6 = 15

Approach - 
  Loop through the list, determine the winning score of each line and sum it
  Return the final score

Code -
  Set total score to 0
  Loop through each line of the file
  Read the opponent's hand, converting the char to int
  Read the player's hand, converting the char to int, then subtract 23 (Player hand X is the same as opponent's hand A, etc)
  If the player's int minus the opponent's int is 1, or if the opponent's int minus the player's int is two:
    Then the player won, so add 6 to total score.
  Else, if the ints are the same, then the game is tied, so add 3 to the total score.
  Next, if the int value is 65 then assign give 1 bonus point, else if it's 66 then 2 points, otherwise 3 points
  Return the total sum

Test -
*/
const fs = require('fs').promises

async function readCSVFile(){
  try{
    const response = await fs.readFile('data.csv', 'utf-8')
    const lines = response.split('\n')
    return lines;
  } catch (error) {
    console.error("Error: ", error)
  }
}

async function processCSVFile(){
  try{
    let sum = 0;
    const lines = await readCSVFile();
    for (let i=0; i < lines.length; i++){
      let opponent = lines[i][0].charCodeAt(0)
      let player = lines[i][2].charCodeAt(0) - 23
      if (player - opponent === 1 || opponent - player === 2){
        sum += 6; // player wins
      } else if (player === opponent){
        sum += 3; // player ties
      } 
      sum += player - 64; // bonus points
    }
    console.log("Winning Score: ", sum);
  } catch (error){
    console.error("Error: ", error)
  }
}

console.log("Starting...")
processCSVFile()