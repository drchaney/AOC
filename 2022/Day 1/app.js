const targetElementId = "resultId"
const targetElement = document.getElementById(targetElementId);

async function readCSVFile(){
  try{
    const response = await fetch("data.csv");
    const text = await response.text();
    const lines = text.split('\n')
    return lines;
    
  } catch (error) {
    return ("Error: ", error)
  }
}

async function processCSVFile(){
  try{
    let highScore = 0;
    let sum = 0;
    const lines = await readCSVFile();
    for (let i=0; i < lines.length; i++){
      if (lines[i] === "\r"){
        if (sum > highScore){
          highScore = sum;
        }
        sum = 0;
        targetElement.innerHTML = highScore;
      }
      sum += Number(lines[i]);
    }
  } catch (error){
    console.error("Error: ", error)
  }
}

processCSVFile()
