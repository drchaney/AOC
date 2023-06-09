# Day 4
## Part 1
### Task: How many lines of two ranges of numbers have one of those ranges a subset of the other?
Challenge: Not as easy as it seems at first, I kept coming to the wrong answer because my code ommitted when the first 
range of numbers has the same starting value as the second range, but doesn't encapsulate the second range.

Fix: Once I console.log'd my way through it, I determined a quick solution would be to check for this specific scenario.

Notes: The incorrect version and console logs are saved in a previous merge so I can easily see the before & after

## Part 2
### Task: How many lines of two ranges of numbers have even the slightest of overlaps (not a subset, just overlap)?
Challenge: With part-1 solution in place, this solution was about 90 seconds to find. :)

## Cool things to reflect about:
I'm a fan of using deconstructed objects (don't know why, I think it's fun), so I was really happy with the function that turned 
a line like: 94-97,31-95 into "firstPairLowerNumber", "firstPairUpperNumber", "secondPairLowerNumber", "secondPairUpperNumber":


I pass one line at a time to parseString, and deconstruct the returned object like this:
```
const {
  firstPairLowerNumber, 
  firstPairUpperNumber, 
  secondPairLowerNumber, 
  secondPairUpperNumber
} = parseString(lines[i])
```

That turns this line into four variables...
94-97,31-95
| firstPairLowerNumber  | firstPairUpperNumber  | secondPairLowerNumber  | secondPairUpperNumber  |
|---|---|---|---|
| 94  | 97  | 31  | 94  |


...using the parseString function
```
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
```
