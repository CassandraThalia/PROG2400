(function(){
const thisDate = Date.now();
const birthdate = new Date("07/22/2022");

let timeDif = birthdate.getTime() - thisDate;

var seconds = (timeDif / 1000) | 0;
timeDif -= seconds * 1000;

var minutes = (seconds / 60) | 0;
seconds -= minutes * 60;

var hours = (minutes / 60) | 0;
minutes -= hours * 60;

var days = (hours / 24) | 0;
hours -= days * 24;

var weeks = (days / 7) | 0;
days -= weeks * 7;

console.log("There are " + 
    weeks + " weeks, " + 
    days + " days, " + 
    hours  + " hours, " +
    minutes + " minutes, and " + 
    seconds + " seconds left until my birthday!")

})


//References:
//https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript
//https://stackoverflow.com/questions/9407426/calculate-number-of-weeks-days-and-hours-from-milliseconds