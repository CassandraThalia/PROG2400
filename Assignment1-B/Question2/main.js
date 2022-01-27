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
        //If nothing else to add, proceed to add Totals and Tallies to their respective lists
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

    var highstTallyIndex = 0;
    //Begin loop through Tally array
    for (let i = 1; i < tallies.length; i++){
        //Check value of second tally against value of first tally; if higher, assign index
        if (tallies[i] > tallies[i-1]){
            highstTallyIndex = i;
        }
        //If tallies are the same, check their values in the Totals array, assign higher value to index
        else if (tallies[i] ===  tallies[i-1]){
            if (totals[i] > totals[i-1]){
                highstTallyIndex = i;
            }
            else {
                highstTallyIndex = i - 1;
            }
        }
        else {
            highstTallyIndex = i - 1;
        }
    }

    console.log(totals[highstTallyIndex]);
}


const testArr1 = [1, 2, 3, 6, 9, 34, 2, 6]; 	
const testArr2 = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3];
const testArr3 = [100, 101, 102, 3, 4, 5, 6, 9];

countFun(testArr1);




//References:
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
//https://bobbyhadz.com/blog/javascript-get-index-of-max-value-in-array