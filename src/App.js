import React, { Component } from 'react';
import { withStateHandlers } from 'recompose';
import { times } from 'ramda'
import Popup from 'react-popup';
import './App.css';

const App = ({ isOpen, turn, clicked, board, checkWinner }) => {
  return (
      <div id="game">
        <div id="head">
          RedTicTacToe
        </div>
        <div id="board" onClick={(e) => clicked(e, turn, board, checkWinner)}>
          {times(n => <div key={n} className="square" data-square={n}></div>, 9)}
        </div>
      </div>
    );
}

export default withStateHandlers(
  {
    turn: 'X',
    gameEnded: false,
    isOpen: 'true',
    board: times(() => '', 9)
  },
  {
    checkWinner: () => (board) => {
      // console.log("coucou");
      const answers = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

      if (board[0] === board[1] && board[1] === board[2]) {
        console.log('You Win !');
      }
    },
    clicked: () => (e, turn, board, checkWinner) => {
      if (board[e.target.dataset.square] === "") {
        board[e.target.dataset.square] = turn;
        e.target.innerText = turn;
        console.log(board);
        checkWinner(board);

        return ({
          turn: turn === 'X' ? 'O' : 'X',
        })
      }
    }
  }
)(App);
