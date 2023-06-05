# Day 3 of 2022 advent of Code...

## Part 2 hit a snafu:
One of my groups of "3" didn't have anything in common in their backpack.  I provided the incorrect answer to AOC and had to dive in deeper.
1) Was this a fault in AOC generating 300 lines of strings?  Google/Reddit check made me think this was very unlikely.
2) Maybe that's a "gotcha" and should return a score of 0? Nope, I provided the answer to AOC and it was still incorrect.
3) Fine, I'll put the three strings into CHATGPT.
Nope, incorrect answer.

And, yet, these strings didn't have a single character in common?
`VPNddVTPPmdnVcPVZcdTmcDbQTFjMpjtFzbMtFjzsFTssT`
`lJCllWCrgvRlgwlJfRRvSzjSjQpbzMHpbwMQpszM`
`fRhGBBJJCgrNLsNPNVVhNq`

## Try ChatGPT!
![Image](https://github.com/drchaney/AOC/blob/main/2022/Day%203/Screenshot%202023-06-05%20150656.png)

That didn't help, clearly ChatGPT was guessing.

## Find another solution?
At this point, I used google to find a working solution and used it to quickly kick out the correct answer.  'results.txt' is the solution code's response, and 'results2.txt' is my own response.

## My code is wrong, but where?
What would make my code work for 299 lines, but not three random ones in the middle of the file?
![Image](https://github.com/drchaney/AOC/blob/main/2022/Day%203/Screenshot%202023-06-05%20154447.png)

### A dumb typo!  I typo'd a variable name, the highlighted variable was accidentally typed in as "teamMemberThree."
