/* 
Restate the problem -
  There are 9 stacks, numbered from left to right as "1" through "9"
  
    [B]             [B] [S]        
    [M]             [P] [L] [B] [J]
    [D]     [R]     [V] [D] [Q] [D]
    [T] [R] [Z]     [H] [H] [G] [C]
    [P] [W] [J] [B] [J] [F] [J] [S]
[N] [S] [Z] [V] [M] [N] [Z] [F] [M]
[W] [Z] [H] [D] [H] [G] [Q] [S] [W]
[B] [L] [Q] [W] [S] [L] [J] [W] [Z]
 1   2   3   4   5   6   7   8   9 

  Each stack has containers ("[B]", "[W]", etc.)
  A crane receives instructions (input file) to move containers between stacks ("move 3 from 5 to 2")
  This results in containers being offloaded NOT one at a time, but all at a time, and re-stacked so that the containers 
  needing offloaded first are on top of the stack
  After the input file (commands of stacks to move) is complete, what containers are on top?
  "NBRRBBSBJ" is currently on top.

Example - 
  "move 3 from 5 to 2"
  Means lift the 3 top-most containers from stack 5 and move them to stack 2 in one move of the crane.
  So this:

      [B]
      [M]
      [H]
      [B]             [B] [S]        
      [M]             [P] [L] [B] [J]
      [D]     [R]     [V] [D] [Q] [D]
      [T] [R] [Z]     [H] [H] [G] [C]
      [P] [W] [J]     [J] [F] [J] [S]
  [N] [S] [Z] [V]     [N] [Z] [F] [M]
  [W] [Z] [H] [D]     [G] [Q] [S] [W]
  [B] [L] [Q] [W] [S] [L] [J] [W] [Z]
  1   2   3   4   5   6   7   8   9 
  
Approach - 
  Read the file to get the starting arrangement of containers and map them into a matrix
  For example: 
  ship = [["B", "W", "N"],
          ["B", "M", "D"...]] and so on.

  Then read the file and process the move requests.
  "move 3 from 5 to 2"
  function moveCargo(qty, from, to){}
  That function will be recursive
  When complete, return the "top" containers:
  NHRRSBSBJ

Code -
  function parseStartingCargo(string){
    Until a new lines starts with a number,
    starting with the 2nd character, get every 4th character until newline, and shift each character into its assigned array
    ([['B','W','N'],['L','Z','S', and so on...],["Q"]...])
    return the matrix array
  }

  function moveCargo(qty, from, to){
    if qty = 0, then return
    Else, 
    crane = array[from][(array[from].length)].pop
    array[to].push(crane)
    qty =- 1
    moveCargo(qty, from, to)
  }

Test -
*/
const fs = require('fs').promises
let containerShip = []

async function parseFile(){
  try{
    const response = await fs.readFile('data.txt', 'utf-8')
    const lines = response.split('\n')
    return lines;
  } catch (error) {
    console.error("Error: ", error)
  }
}

async function parseCargo(lines){
  let row = 0;
  for (let line of lines){
    let stack = 0;
    for (let i=1; i<line.length; i+=4){
      if (line[i] === "1"){
        console.table(containerShip)
        return row; // exit when the file is down to the row numbers in the text file
      }
      if (row === 0){
        if (line[i] === " "){
          containerShip.push([]);
        } else {
          containerShip.push([line[i]]);  
        }
      } else {
        if (line[i] != " "){
          containerShip[stack].unshift(line[i]);
        }
      }
        stack += 1;
    }
    row += 1;
  }
}

function operateCrane(qty, from, to){
  let crane = []
  for (let i = qty; i>0; i--){
    let clamps = containerShip[from-1].pop()
    crane.push(clamps)
  }
  for (let i = qty; i>0; i--){
    let clamps = crane.pop()
    containerShip[to-1].push(clamps)
  } 
  return;
}

async function moveCargo(row, moves){
  for (let i = row; i<moves.length; i++){
    let instructions = moves[i].match(/\b\d{1,2}\b/g)
    operateCrane(instructions[0], instructions[1], instructions[2])
  }

  let topRow = ""
  for (let container of containerShip){
    topRow += container[container.length - 1]
  }
  return topRow;
}

async function crane(){
  const lines = await parseFile()
  const startingLine = await parseCargo(lines)
  const finalContainers = await moveCargo(startingLine + 2, lines)
  console.table(containerShip)
  console.log(finalContainers)
}

console.log("Starting...")
crane()