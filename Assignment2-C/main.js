(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        fetch("https://deckofcardsapi.com/api/deck/" + data['deck_id'] + "/draw/?count=5")
        //fetch("http://pokerhand-tester.herokuapp.com/flush")
        //fetch("http://pokerhand-tester.herokuapp.com/straight")
        //fetch("http://pokerhand-tester.herokuapp.com/royalflush")
        //fetch("http://pokerhand-tester.herokuapp.com/onepair")
        //fetch("http://pokerhand-tester.herokuapp.com/threeofakind")
        //fetch("http://pokerhand-tester.herokuapp.com/fourofakind")
        //fetch("http://pokerhand-tester.herokuapp.com/twopair")
        //fetch("http://pokerhand-tester.herokuapp.com/fullhouse")
        //fetch("http://pokerhand-tester.herokuapp.com/straightflush")
        //fetch("http://pokerhand-tester.herokuapp.com/highcard")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let htmlOutput = "";
    
            let hand = []
            data['cards'].forEach(element => {
                let card = {}
                card['value'] = element.value;
                card['suit'] = element.suit;
                hand.push({card: card});
                htmlOutput += "<img src=\"" + element.image + "\">";
            });
            document.querySelector("#myData").innerHTML = htmlOutput;
            getBestHand(hand);
            document.querySelector("#bestHand").innerHTML = getBestHand(hand);
        });
    });

    function getBestHand(hand){

        //Sort hand by card value
        let valueOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
        let sortedHand = [];
        for (let i = 0; i < valueOrder.length; i++) { 
            for (let j = 0; j < hand.length; j++){
                if (hand[j].card.value === valueOrder[i]) {
                    sortedHand.push(hand[j]);
                }
            }
        }

        //Check for flush
        let flush = checkForFlush(hand);
        
        //Check for royal flush
        let royalFlush = checkForRoyalFlush(sortedHand, valueOrder, flush);

        //Check for straight
        let straight = checkForStraight(sortedHand, valueOrder);

        //Check for all matching cards sequences
        let pair = false;
        if (checkForMatches(sortedHand) === 1){
            pair = true;
        }
        let threeOfAKind = false;
        if (checkForMatches(sortedHand) === 2){
            threeOfAKind = true;
        }
        let fourOfAKind = false;
        if (checkForMatches(sortedHand) === 3){
            fourOfAKind = true;
        }
        let twoPair = false;
        if (checkForMatches(sortedHand) === 4){
            twoPair = true;
        }
        let fullHouse = false;
        if (checkForMatches(sortedHand) === 5){
            fullHouse = true;
        }  

        //Get response based on bools
        if (royalFlush === true){
            return "Royal Flush";
        }
        else if (straight === true && flush === true){
            return "Straight Flush";
        }
        else if (fourOfAKind === true){
            return "Four of a Kind";
        }
        else if (fullHouse === true){
            return "Full House";
        }
        else if (flush === true){
            return "Flush";
        }
        else if (straight === true){
            return "Straight";
        }
        else if (threeOfAKind === true){
            return "Three of a Kind";
        }
        else if (twoPair === true){
            return "Two Pairs"
        }
        else if (pair === true){
            return "Pair"
        }
        else
        {
            return "High Card"
        }
    }

    function checkForFlush(hand){
        let suit = hand[0].card.suit;
        if (hand[1].card.suit === suit &&
            hand[2].card.suit === suit &&
            hand[3].card.suit === suit &&
            hand[4].card.suit === suit) {
                return true;
            }
        else {
            return false;
        }
    }

    function checkForRoyalFlush(sortedHand, valueOrder, flush){
        if (sortedHand[0].card.value === valueOrder[8] &&
            sortedHand[1].card.value === valueOrder[9] &&
            sortedHand[2].card.value === valueOrder[10] &&
            sortedHand[3].card.value === valueOrder[11] &&
            sortedHand[4].card.value === valueOrder[12] && 
            flush === true){
                return true;
            }
        else {
            return false;
        }
    }

    function checkForStraight(sortedHand, valueOrder){
        let startIndex = 0;
        for (let i = 0; i < valueOrder.length; i++){
            if (valueOrder[i] === sortedHand[0].card.value){
                startIndex = i;
            }
        }
        //First account for Aces being high or low 
        if (sortedHand[0].card.value === valueOrder[0] &&
            sortedHand[1].card.value === valueOrder[1] &&
            sortedHand[2].card.value === valueOrder[2] &&
            sortedHand[3].card.value === valueOrder[3] &&
            sortedHand[4].card.value === valueOrder[12]){
                return true;
            }
        else if (sortedHand[0].card.value === valueOrder[startIndex] &&
            sortedHand[1].card.value === valueOrder[startIndex + 1] &&
            sortedHand[2].card.value === valueOrder[startIndex + 2] &&
            sortedHand[3].card.value === valueOrder[startIndex + 3] &&
            sortedHand[4].card.value === valueOrder[startIndex + 4]) {
                return true;
            }
        else {
            return false;
        }
    }

    function checkForMatches(sortedHand){
        let sameCount = 0;
        let value = "";

        for (let i = 1; i < sortedHand.length; i++){
            if (sortedHand[i - 1].card.value === sortedHand[i].card.value){
                sameCount++;
                if (sameCount > 1 && value != sortedHand[i].card.value) {
                    sameCount += 2;
                }
                value = sortedHand[i].card.value;
            }
        }
        return sameCount;
    }
        
})();