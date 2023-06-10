# Day 5
## Part 1
### Task: Rearrange stacks of containers on a cargo ship so that the stacks that need to be unloaded first are on top
This was the first puzzle in the series so far that gave me the correct answer on my first attempt!
With that said, I think the code could use some optimization.

## Part 2
### Task: Rearrange stacks of containers on a cargo ship so that the stacks that need to be unloaded first are on top
Unlike part 1, instead of one container being moved at a time, entire stacks of containers are now being moved.

The solution was quick to implement and worked correctly on the first run, and I also used the opportunity to improve readability:

This clunky function would take a line from the input file like:
"move 2 from 8 to 7"
and turn it into:
"operateCrane(2, 8, 7)"
```
async function moveCargo(row, moves){
  for (let i = row; i<moves.length; i++){
    let nux = moves[i].split('move ')
    let nuy = nux[1].split(' from ')
    let nuz = nuy[1].split(' to ')
    let qty = nuy[0];
    let from = nuz[0];
    let to = nuz[1];
    operateCrane(qty, from, to)
  }
```
Was changed to:
```
async function moveCargo(row, moves){
  for (let i = row; i<moves.length; i++){
    let instructions = moves[i].match(/\b\d{1,2}\b/g)
    operateCrane(instructions[0], instructions[1], instructions[2])
  }
```
