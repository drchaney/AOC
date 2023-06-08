/* 
Restate the problem -
  In the file, each line has a pair of ranges of numbers.  Some of the pairs of numbers overlap.
  Count the number of lines where a pair of numbers has an overlap

Example - 
  3-5, 5-6 = Yes, Overlaps at 5
  3-7, 4-6 = Yes, Overlaps at 4, 5 and 6
  2-4, 6-8 = No, zero overlap
  
Approach - 
  Loop through the file, grabbing both pairs of numbers in a line at a time.
  The first set of numbers are assigned to variables, then the second set.
  Comparing these variables, count the number of times a set of numbers overlaps the other.

Code -
  Initialize count to 0
  While we're not EOF, get the next line.
  Assign the first number to "FirstPairLowerNumber" then "FirstPairUpperNumber"
  Then assign the next set of numbers to to "SecondPairLowerNumber" then "SecondPairUpperNumber"
  If the FirstPairLowerNumber = SecondPairLowerNumber, or FirstPairUpperNumber = SecondPairUpperNumber, then count +=1
  Else look a the pairs of numbers and, using a nested IF statement, determine if they have an overlap

Test -
*/
const fs = require('fs').promises

function parseString(string) {
  const [firstPair, secondPair] = string.split(',');
  const [firstLower, firstUpper] = firstPair.split('-');
  const [secondLower, secondUpper] = secondPair.split('-');

  return {
    firstPairLowerNumber: parseInt(firstLower),
    firstPairUpperNumber: parseInt(firstUpper),
    secondPairLowerNumber: parseInt(secondLower),
    secondPairUpperNumber: parseInt(secondUpper)
  };
}

async function readCSVFile(){
  try{
    const response = await fs.readFile('data.txt', 'utf-8')
    const lines = response.split('\n')
    return lines;
  } catch (error) {
    console.error("Error: ", error)
  }
}

async function processCSVFile(){
  try{
    let count = 0;
    const lines = await readCSVFile();
    for (let i=0; i < lines.length; i++){
      const {firstPairLowerNumber, firstPairUpperNumber, secondPairLowerNumber, secondPairUpperNumber} = parseString(lines[i])
      if (firstPairLowerNumber == secondPairLowerNumber || firstPairUpperNumber == secondPairUpperNumber){
        count += 1;
      } else if (firstPairLowerNumber <= secondPairLowerNumber){
        if (firstPairUpperNumber >= secondPairLowerNumber){
          count += 1;
      }
      } else if (secondPairLowerNumber <= firstPairLowerNumber){
        if (secondPairUpperNumber >= firstPairLowerNumber){
          count += 1;
        }
      }
    }
    console.log("Total overlap count: ", count);
  } catch (error){
    console.error("Error: ", error)
  }
}

console.log("Starting...")
processCSVFile()