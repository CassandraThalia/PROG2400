import React from 'react';

function Square(props){
    return (
        <div className={"square square" + props.currentState + " wrong" + props.isWrong}
            onClick={props.onClick}
            currentState={props.currentState}
            correctState={props.correctState}
            isWrong={props.isWrong} >
        </div>
    );
}

export default Square;