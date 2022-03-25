(() => {

    fetch('https://threeinarowpuzzle.herokuapp.com/sample')
    //fetch('https://threeinarowpuzzle.herokuapp.com/random')
    .then((response) => response.json())
    .then((json) => {

        /* ----------------------- PAGE SETUP --------------------- */

        let data = json;
        let colorCycle = ["lightgray", "palevioletred", "darkslateblue"];

        //Build the table
        createTable(data);
        
        //Set up HTML elements
        let targetDOM = document.querySelector('#theGame');
        let checkBtn;
        let checkMsg;
        let checkAnsBx;
        let hardModeBx;

        //Build & fill the count cells
        appendCountCells();
        adjustCount();

        //Create HTML elements
        createHTML();

        /* ----------------------- LISTENER FUNCTIONS --------------------- */

        //for hard mode
        let currentNode;
        //Listener for entire game table
        targetDOM.addEventListener('click', (e) => {
            let targetNode = document.querySelector("#" + e.target.id);

            //for hard mode
            if (hardModeBx.checked) {
                if (currentNode != null) {
                    if (targetNode != currentNode && currentNode.style.backgroundColor != colorCycle[0]) {
                        currentNode.dataset.canToggle = "false"
                    }
                }
            }

            //If we can, toggle the color of the cell using the colour cycle
            if (targetNode.dataset.canToggle == "true"){     
                if (targetNode.style.backgroundColor === colorCycle[0]) {
                    targetNode.style.backgroundColor = colorCycle[1]
                }
                else if (targetNode.style.backgroundColor === colorCycle[1]) {
                    targetNode.style.backgroundColor = colorCycle[2]
                }
                else if (targetNode.style.backgroundColor === colorCycle[2]) {
                    targetNode.style.backgroundColor = colorCycle[0]
                }
            }

            //Adjust colour row & column count
            adjustCount();

            //for hard mode
            currentNode = targetNode;

        })

        //Listener for hard mode checkbox
        hardModeBx.addEventListener('click', () => {
            if (hardModeBx.checked) {
                //If checked, disable checking options
                checkBtn.disabled = true;
                checkAnsBx.disabled = true;
                checkMsg.innerHTML = "";
            }
            else {
                //If unckecked, reinable checking options
                checkBtn.disabled = false;
                checkAnsBx.disabled = false;
            }
        })

        
        //Listener for check wrong squares checkbox
        checkAnsBx.addEventListener('click', (e) => {
            //Set border style options
            let borderStyle;
            if (checkAnsBx.checked){
                borderStyle = "5px groove red";
            }
            else {
                borderStyle = "1px solid black"
            }
            //Call function to decide which squares to change
            changeSquares(borderStyle);
        })

        //Listener for check answer button
        checkBtn.addEventListener('click', (e) => {
            checkAnswer();
        })

        /* ----------------------- HELPER FUNCTIONS --------------------- */

        let changeSquares = (borderStyle) => {
            let tableNodes = targetDOM.getElementsByTagName("td");
            //Loop through all table nodes
            for (let i = 0; i < tableNodes.length; i++){
                //Omit count cells
                if (tableNodes[i].id != "countCell") {
                    //If the node is not currently in its correct state, apply border colour change
                    if (tableNodes[i].style.backgroundColor != colorCycle[tableNodes[i].dataset.correctState] && tableNodes[i].style.backgroundColor != colorCycle[0]){
                        tableNodes[i].style.border = borderStyle;
                    }
                }
            }
        }

        let checkAnswer = () => {
            //Bools for message
            let won = false;
            let gettingThere = false;
            let mistakes = false;
            let msg;

            //Get all table nodes, then filter out the count cells
            let tableNodes = targetDOM.getElementsByTagName("td");
            let fTable = [...tableNodes].filter(node => node.id != "countCell")

            //Logic to determine check message
            won = [...fTable].every(node => node.style.backgroundColor === colorCycle[node.dataset.correctState])

            mistakes = [...fTable].some(node => node.style.backgroundColor != colorCycle[node.dataset.correctState])

            gettingThere = [...fTable].filter(node => node.style.backgroundColor != colorCycle[0]).every(node => node.style.backgroundColor === colorCycle[node.dataset.correctState])

            if (won) {
                msg = "You did it!"
            }
            else if (gettingThere) {
                msg = "So far so good..."
            }
            else if (mistakes) {
                msg = "Something is wrong"
            }
            checkMsg.innerHTML = msg;
        }

        /* ----------------------- CREATION FUNCTIONS --------------------- */

        function createTable(data) {
            //Create table programmatically
            var myTable = document.createElement("table"), row = myTable.insertRow(), cell;
            //Set id count to create unique id for each cell
            let idCount = 0;
            //Loop through data to create table cells
            for(var i = 0; i < data['rows'].length; i++) {
                for(var j = 0; j < data['rows'][i].length; j++){
                    cell = row.insertCell();
                    cell.id = "id" + idCount;
                    //Get data info and assign to each cell in a dataset
                    cell.dataset.canToggle = data['rows'][i][j]['canToggle'];
                    cell.dataset.currentState = data['rows'][i][j]['currentState'];
                    cell.dataset.correctState = data['rows'][i][j]['correctState'];
                    //Use colour cycle to determine starting colour
                    let startingColor;
                    for (let k = 0; k < colorCycle.length; k++) {
                        if (data['rows'][i][j]['currentState'] === k) {
                            startingColor = colorCycle[k];
                        }
                    }
                    //Apply other cell styles
                    cell.style.boxSizing = "border-box"
                    cell.style.border = "1px solid black"
                    cell.style.backgroundColor = startingColor;
                    //If at the end of the loop, insert a new row 
                    if (j == data['rows'][i].length - 1) {
                        row = myTable.insertRow();
                    }
                    idCount++;
                }
            }
            document.querySelector('#theGame').appendChild(myTable);
        }

        //Function to create HTML elements
        function createHTML () {
            //Create check answer button
            checkBtn = document.createElement("button")
            checkBtn.type = "button"
            checkBtn.innerHTML = "Check Answer"
            checkBtn.style.display = "inline-block"
            targetDOM.appendChild(checkBtn);

            //Create div for answer message
            checkMsg = document.createElement("div")
            checkMsg.innerHTML = ""
            checkMsg.style.display = "inline-block"
            checkMsg.style.color = "red"
            targetDOM.appendChild(checkMsg);

            targetDOM.appendChild(document.createElement("br"))

            //Create check answer checkbox
            checkAnsBx = document.createElement("input");
            checkAnsBx.type = "checkbox"
            checkAnsBx.id = "checkAnsBx"
            let checkAnsLabel = document.createElement("label")
            checkAnsLabel.htmlFor = "checkAnsBx"
            checkAnsLabel.appendChild(document.createTextNode("See Wrong Squares"))
            targetDOM.appendChild(checkAnsBx);
            targetDOM.appendChild(checkAnsLabel)

            targetDOM.appendChild(document.createElement("hr"))

            //Create hard mode check box
            hardModeBx = document.createElement("input");
            hardModeBx.type = "checkbox"
            hardModeBx.id = "hardModeBx"
            let hardModeLabel = document.createElement("label")
            hardModeLabel.htmlFor = "hardModeBx"
            hardModeLabel.appendChild(document.createTextNode("Hard Mode"))
            targetDOM.appendChild(hardModeBx);
            targetDOM.appendChild(hardModeLabel)

            //Create instructions for hard mode (p and ul)
            let hmInstructions = document.createElement("p")
            hmInstructions.innerHTML = "In Hard Mode:"
            let instUl = hmInstructions.appendChild(document.createElement("ul"))
            let instUl1 = instUl.appendChild(document.createElement("li"))
            instUl1.innerHTML = "You can't check your answer or see wrong squares"
            let instUl2 = instUl.appendChild(document.createElement("li"))
            instUl2.innerHTML = "Your answer is locked in as soon as you click anywhere else"
            targetDOM.appendChild(hmInstructions);
        }

        function appendCountCells() {
            //Get table dom
            let table = targetDOM.firstChild;
            var rowCount = table.rows.length;
            var cellCount = table.rows[0].cells.length;
            //Loop through rows, append new cell to end of row
            for (let i = 0; i < rowCount; i++) {
                let newCell = table.rows[i].insertCell();
                newCell.style.paddingLeft = "20px"
                newCell.id = "countCell"
                //Also insert new cells in last row of table
                if (i == rowCount - 1){
                    for (let j = 0; j < cellCount; j++) {
                        let curCell = table.rows[i].insertCell(j);
                        curCell.id = "countCell"
                    }
                }
            }
        }

        function adjustCount(){
            //Get table dom
            let table = targetDOM.firstChild;
            var rowCount = table.rows.length;
            var cellCount = table.rows[0].cells.length;
            //Set up vars for counting
            let firstColList = [];
            let secondColList = [];
            let firstColorColCount = 0;
            let secondColorColCount = 0;
            //Loop through each cell in table
            for (let i = 0; i < rowCount; i++) {
                for (let j = 0; j < cellCount; j++) {
                    let curCell = table.rows[i].cells[j];
                    //If cell color matches, increase the colour count and push the index to colour list
                    if (curCell.style.backgroundColor === colorCycle[1]) {
                        firstColorColCount++
                        firstColList.push(j)
                    }
                    else if (curCell.style.backgroundColor === colorCycle[2]) {
                        secondColorColCount++
                        secondColList.push(j)
                    }
                    //If we are on last cell of row, output the row count and then reset it
                    if (j === cellCount - 1) {
                        curCell.style.color = "lightgray"
                        curCell.innerHTML = firstColorColCount + " / " + secondColorColCount;
                        firstColorColCount = 0;
                        secondColorColCount = 0;
                    }
                    //When we have reached last row, output column counts
                    if (i === rowCount - 1) {
                        curCell.style.color = "lightgray"
                        //Filter list to only include matches to the current column count, then count length 
                        curCell.innerHTML = firstColList.filter(item => { return item === j } ).length + " / " 
                        + secondColList.filter(item => { return item === j }).length;
                    }
                    //Leave corner cell blank
                    if (j === cellCount - 1 && i === rowCount - 1)
                    {
                        curCell.innerHTML = ""
                    }
                }
            }
        }
    })
})();

//https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
//https://stackoverflow.com/questions/69590917/how-to-check-if-all-elements-in-an-htmlcollection-contain-a-certain-value-for-a
//https://code-boxx.com/create-table-from-array-javascript/
//https://www.techiedelight.com/dynamically-create-checkbox-with-javascript/

        