import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
        return (
          <Square
            //Bool logic for isWinning prop of square (if the line array includes this square (i), isWinning is true)
            isWinning={this.props.winningSquares.includes(i)}
            value={this.props.squares[i]}        
            onClick={() => this.props.onClick(i)}      
        />
        );
    }

    render() {
        return (
        <div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

export default Board;