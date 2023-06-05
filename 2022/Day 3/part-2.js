/* 
Restate the problem -
  Every 3 lines on the file have one letter in common.
  What is that letter, and what score would that letter give?
  Sum up all 3-line groups and provide the total score.

Example - 
  The letter "r" is the only letter found in all 3 lines below:
  vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  The letter "r" has a score of 18, so that score would be added to the total sum.
  (a-z = score 1-26)
  (A-Z = score 27-52)
  
Approach - 
  Loop through the file, grabbing 3 lines at a time.
  Using the shortest string of the 3 lines, test each letter to see if it's also in the other two strings
  When found, return a score and sum it to the total

Code -
  Initialize sum to 0
  Get strings 1, 2, 3
  Whichever is the shortest string is the search string
  Loop through each character of the search string, see if it's included in the other two strings.
  If so, return a priority score.
  Sum that score to the other scores.
  Return the sum
Test -
*/
const fs = require('fs').promises

function priorityScore(teamMemberOne, teamMemberTwo, teamMemberThree){
  for (j = 0; j < teamMemberOne.length; j++){
    if (teamMemberTwo.includes(teamMemberOne[j])){
      if(teamMemberThree.includes(teamMemberOne[j])){
        if (teamMemberOne[j].charCodeAt(0) >= 96){
          return teamMemberOne[j].charCodeAt(0) - 96
        } else {
          return teamMemberOne[j].charCodeAt(0) - 38
        }
      }
    }
  }
  console.log("Not match found!")
  return 0;
}

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
    for (let i=0; i < lines.length; i+=3){
      let teamMemberOne = lines[i]
      let teamMemberTwo = lines[i+1]
      let teamMemberThree = lines[i+2]
      sum += priorityScore(teamMemberOne, teamMemberTwo, teamMemberThree)
    }
    console.log("Answer :", sum)
  } catch (error){
    console.error("Error: ", error)
  }
}

console.log("Starting...")
processCSVFile()