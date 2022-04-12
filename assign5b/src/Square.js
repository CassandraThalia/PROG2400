import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Game.js';
import './Board.js';

function Square(props) {
    return (
        //If props.isWinning is true, give the square the square--winning class
        <button className={"square " + (props.isWinning ? "square--winning" : null)} 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;