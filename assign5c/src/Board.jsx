import React from 'react';
import axios from 'axios';
import Square from './Square';

export default class Board extends React.Component {
    renderSquare(i) {
        return this.props.squares[i].map((square, index) => {

            const row = i;
            const col = index;

            return (
                <td>
                    <Square 
                        canToggle={square.canToggle}
                        onClick={() => this.props.onClick(row, col)}
                        style={square.style}
                        currentState={square.currentState}
                        correctState={square.correctState}
                        col={col}
                        row={row}
                        isWrong={square.isWrong} />
                </td>
            )
        })
    }

    renderTableData() {
        return this.props.squares.map((row, index) => {
            return (
                <tr>
                    {this.renderSquare(index)}
                </tr>
            )
        })
    }

    render() {
        return(
            <table className='boardTable'>
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </table>
        );
    }
}