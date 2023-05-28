/* 
Restate the problem -
  Using an input file of 2 letter codes, separated by a space, and delineated by a new line,
  Determine the "hand" needed to play at each round, and calculate the sum of points after playing all the rounds
  The first column is what your opponent plays, next is the result of my hand
  A = Rock, B = Paper, C = Scissors
  X = Lose, Y = Ties, Z = Win
  Winning a round gives you: 6 points / Draw is 3 / Losing is 0
  Bonus points for the shape selected: 1 for rock / 2 for paper / 3 for scissors

      Opponent | Player | *Bonus Points
  Rock -     | A X | *1
  Paper -    | B Y | *2
  Scissors - | C Z | *3

Example - 
  A Y - Opponent rock ("A") | Player ties playing the same hand ("Y") | Player gets 3 pts for tie + 1 bonus pt for playing rock = 4
  B X - Opponent paper ("B") | player lost ("X") (played rock) | Player lost (0 pts) + bonus for rock (1 pt) = 1
  C Z - Opponent scissors ("C") | player wins ("Z") (played rock) | Player wins (6 pts) + bonus for rock (1 pts) = 7
  Total Score = 4+1+7 = 12

Approach - 
  Loop through the list, determine the winning score of each line and sum it
  Return the final score

Code -
  Set total score to 0
  Loop through each line of the file
  If the player has an Y then 3 pts, else if the player has a Z then 6 points
  
  If the opponent has an A and player has an X then player gets 3 points (scissors lost to rock)
  If the opponent has a B and the player has a Z then the player gets 3 bonus points (scissors beats paper)
  If the opponent has a C and the player has a Y then the player gets 3 bonus points (scissors tied with scissors)

  If the opponent has an A and player has a Y then player gets 1 bonus point (rock tied with rock)
  If the opponent has a B and the player has an X then the player gets 1 bonus points (rock lost to paper)
  If the opponent has a C and the player has a Z then the player gets 1 bonus points (rock beats scissors)

  If the opponent has an A and the player has a Z then the player gets 2 bonus points (paper beats rock)
  If the opponent has a B and the player has a Y then the player gets 2 bonus points (paper tied with paper)
  If the opponent has a C and the player has a X then the player gets 2 bonus points (paper lost to scissors)

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
      if ( (lines[i][0] === 'A' && lines[i][2] === 'X') || (lines[i][0] === 'B' && lines[i][2] === 'Z') || (lines[i][0] === 'C' && lines[i][2] === 'Y') ){
        sum += 3;
      }
      if ( (lines[i][0] === 'A' && lines[i][2] === 'Z') || (lines[i][0] === 'B' && lines[i][2] === 'Y') || (lines[i][0] === 'C' && lines[i][2] === 'X') ){
        sum += 2;
      }
      if ( (lines[i][0] === 'A' && lines[i][2] === 'Y') || (lines[i][0] === 'B' && lines[i][2] === 'X') || (lines[i][0] === 'C' && lines[i][2] === 'Z') ){
        sum += 1;
      }
      if (lines[i][2] === "Y"){
        sum += 3;
      } else if (lines[i][2] === "Z"){
        sum += 6;
      }
    }
    console.log("Winning Score: ", sum);
  } catch (error){
    console.error("Error: ", error)
  }
}

console.log("Starting...")
processCSVFile()