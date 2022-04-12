import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

class Game extends React.Component {
    constructor(props) {    
        super(props);    
        this.state = {      
            history: [{        
                squares: Array(9).fill(null),      
            }],    
            stepNumber: 0,  
            xIsNext: true,
            xCount: 0,
            oCount: 0,
        };  
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);    
        const current = history[history.length - 1];    
        const squares = current.squares.slice();

        let xCount = this.state.xCount;
        let oCount = this.state.oCount;

        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        if (this.state.xIsNext) {
            xCount++;
        }
        else if (!this.state.xIsNext) {
            oCount++;
        }

        this.setState({
            history: history.concat([{        
              squares: squares,      
            }]),   
            stepNumber: history.length,   
            xIsNext: !this.state.xIsNext,
            xCount: xCount,
            oCount: oCount
        });
    }

    jumpTo(step) { 
        this.setState({      
            stepNumber: step,      
            xIsNext: (step % 2) === 0,
            xCount: step % 2 === 0 ? step / 2 : Math.ceil(step / 2),
            oCount: step % 2 != 0 ? Math.floor(step / 2) : step / 2
        });  
    }

    render() {
        const history = this.state.history;    
        const current = history[this.state.stepNumber];   
        const winner = calculateWinner(current.squares);  
                
        const moves = history.map((step, move) => {      
            const desc = move ?        
            'Go to move #' + move :        
            'Go to game start';     
            return (        
                <li key={move}>       
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>        
                </li>      
            );    
        });
        
        let status;    
        if (winner) {      
            status = 'Winner: ' + winner.player; 
        } 
        else if (!winner && this.state.stepNumber === 9){
            status = "It's a draw";
        }
        else {      
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    
        }

        return (
          <div className="game">
            <div className="game-board">
                <Board  
                    //If there is a winner, include the line array, otherwise leave array blank
                    winningSquares={winner ? winner.line : []}          
                    squares={current.squares}            
                    onClick={(i) => this.handleClick(i)}          
                />  
                <div>
                    <div>X Count: {this.state.xCount}</div>
                    <div>O Count: {this.state.oCount}</div>
                </div>      
            </div>
            <div className="game-info">
              <div>{status}</div>          
              <ol>{moves}</ol>
            </div>
          </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //Return array of winning squares along with winner
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }

export default Game;