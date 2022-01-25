function letterFun(myWord){
    if (myWord.charAt(0).toUpperCase() == myWord.charAt(myWord.length-1).toUpperCase()){
        const reversedWord = myWord.split("").reverse().join("");
        console.log(reversedWord);
    }
    else {
        let newWord = myWord.substring(1, myWord.length-1);
        console.log(newWord);
    }
}

const myWord1 = "Snakes"
const myWord2 = "Snake"


letterFun(myWord1);
letterFun(myWord2);



//References:
//Reversed string: https://www.freecodecamp.org/news/how-to-reverse-a-string-in-javascript-in-3-different-ways-75e4763c68cb/

