/*
R - Restate the problem
  Each line has an even number of characters (upper and lower case)
  In each line there is only one character (case sensitive) that appears in the first half as well as the 2nd half of the line
  Find out what that character is and assign it a point value (a-z = 1-26; A-Z = 27-52)
  Sum up all the point values from all lines and return that number.

E - Example
  abcdeABCDe - 10 characters, the first 5 is abcde and the last 5 is ABCDe
  e is the letter that appears in both, so the point value would be "5"

A - Approach
  Loop through the file, find the common letter on each line, assign it a value, sum that value

C - Code
  Start with sum = 0
  Get the first line of the csv file
  Slice/Split it in half
  Grab the first letter from the first half and see if it is included in the 2nd half
  If so, grab the int value of that character and score it, 1 to 52
  Return the sum

T - Test:
*/

const fs = require('fs').promises

function priorityScore(leftPocket, rightPocket){
  for (j = 0; j < leftPocket.length; j++){
    if (rightPocket.includes(leftPocket[j])){
      if(leftPocket[j].charCodeAt(0) >= 96){
        return leftPocket[j].charCodeAt(0) - 96
      } else {
        return leftPocket[j].charCodeAt(0) - 38
      }
    }
  }
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
    for (let i=0; i < lines.length; i++){
      let leftPocket = lines[i].slice(0, lines[i].length/2)
      let rightPocket = lines[i].slice (lines[i].length/2, lines[i].length)
      sum += priorityScore(leftPocket, rightPocket)
    }
    console.log("Winning Score: ", sum);
  } catch (error){
    console.error("Error: ", error)
  }
}

console.log("Starting...")
processCSVFile()