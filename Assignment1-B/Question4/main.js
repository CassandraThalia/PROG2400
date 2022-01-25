let numArr = [];

for (let i = 0; i < 10; i++){
    let rNum = Math.floor(Math.random() * 100);
    numArr.push(rNum);
}

let msg = ""

for (let i = 0; i < numArr.length; i++){
    let isPrime = true;
    if (numArr[i] <= 1){
        isPrime = false;
    }
    else if (numArr[i] > 1) {
        for (let j = 2; j < numArr[i] - 1; j++) {
            if (numArr[i] % j === 0) {
                isPrime = false;
                break;
            }
        }
    }

    if(isPrime){
        msg += numArr[i] + "-yes "
    }
    else{
        msg += numArr[i] + "-no " 
    }
}

console.log(msg);

//References:
//https://www.geeksforgeeks.org/check-a-number-is-prime-or-not-using-javascript/