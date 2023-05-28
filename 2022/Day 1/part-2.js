const fs = require('fs').promises

function calcTopScores(array){
    return array.reduce((sum, current) => sum + current, 0);
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
    let highScores = [0, 0, 0];
    let sum = 0;
    const lines = await readCSVFile();
    for (let i=0; i < lines.length; i++){
      if (lines[i] === "\r"){
        if (sum > highScores[0]){
          highScores.push(sum);
          highScores.sort();
          highScores.shift();
        }
        sum = 0;
      }
      sum += Number(lines[i]);
    }
    let sumScores = calcTopScores(highScores);
    console.log(`The sum of ${highScores} is ${sumScores}`)
  } catch (error){
    console.error("Error: ", error)
  }
}

console.log("Starting...")
processCSVFile()