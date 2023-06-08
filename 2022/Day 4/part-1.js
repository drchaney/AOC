/* 
Restate the problem -
  In the file, each line has a pair of ranges of numbers.  Sum up the number of lines where
  one of the ranges encapsulates the other pair.

Example - 
  3-5, 5-6 = ..345.... , ....56... = doesn't encapsulate
  3-7, 4-6 = ..34567.., ...456... = encapsulated
  2-4, 6-8 = Encapsulated on lower end, but not on top end
  
Approach - 
  Loop through the file, grabbing both pairs of numbers in a line at a time.
  The first set of numbers are assigned to variables, then the second set.
  Comparing these variables, count the number of times a set of numbers is encapsulated by the other.

Code -
  Initialize count to 0
  While we're not EOF, get the next line.
  Assign the first number to "FirstPairLowerNumber" then "FirstPairUpperNumber"
  Then assign the next set of numbers to Assign the first number to "SecondPairLowerNumber" then "SecondPairUpperNumber"
  If FirstPairLowerNumber is less than or equal to SecondPairUpperNumber then it's encapsulated on the bottom end.
  If FirstPairUpperNumber is greater than or equal to SecondPairUpperNumber then it's encapsulated on the top end.
  If encapsulated on both ends, count += 1.
  Return count

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
      if (firstPairLowerNumber == secondPairLowerNumber){
        count += 1;
      } else if (firstPairLowerNumber <= secondPairLowerNumber){
        if (firstPairUpperNumber >= secondPairUpperNumber){
          count += 1;
      }
      } else if (secondPairLowerNumber <= firstPairLowerNumber){
        if (secondPairUpperNumber >= firstPairUpperNumber){
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