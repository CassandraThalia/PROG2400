function countFun(myArr){
    var totals = [];
    var tallies = [];
    var total = 0;
    var tally = 0;
    var lastNum;

    for (let i = 0; i < myArr.length; i++){ 
        //If total is zero, perform first number check
        if (total === 0){
            if (myArr[i + 1] === myArr[i] + 1){
                total += myArr[i]
                tally += 1;
            }
        }
        //If total has already been started, check against lastNum
        else if (myArr[i] === lastNum + 1){
            total += myArr[i];
            tally += 1;
        }
        //If nothing to add, proceed to add Totals and Tallies to their respective lists
        else {
            if (total > 0){
                totals.push(total);
                total = 0;
                tallies.push(tally);
                tally = 0;
            }
            if (myArr[i + 1] === myArr[i] + 1){
                total += myArr[i]
                tally += 1;
            }
        }
        lastNum = myArr[i]
    }

    //Find highest number of tallies
    const max = Math.max.apply(null, tallies);
    //Get the index of that number
    const index = tallies.indexOf(max);
    //Apply index to Totals list
    console.log(totals[index]);
}

const arr =	[100, 101, 102, 3, 4, 5, 6, 9];

countFun(arr);

//Resources:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
//https://bobbyhadz.com/blog/javascript-get-index-of-max-value-in-array