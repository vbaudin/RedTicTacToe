import React, { Component } from 'react';
import { withStateHandlers } from 'recompose';
import { map , times , filter } from 'ramda'
import './App.css';

const App = ({ isOpen, turn, clicked, board, checkWinner, gameEnded }) => {
  return (
      <div id="game">
        <div id="head">
          RedTicTacToe
        </div>
        <div id="board" onClick={(e) => gameEnded === false ? clicked(e, turn, board, checkWinner, gameEnded) : 0}>
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
    checkWinner: () => (board, turn) => {
      const answers = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

      const checks = map(answer => {
        if (board[answer[0]] === turn && board[answer[1]] === turn && board[answer[2]] === turn ) {
          console.log("winner");
          return (1)
        }
      }, answers);
      console.log(checks);

      const filtered = filter(e => e !== undefined, checks);
      console.log(filtered);

      return (filtered[0] === 1 ? {gameEnded: true} : {gameEnded: false});
    },
    clicked: () => (e, turn, board, checkWinner, test) => {
      console.log(test);
      if (board[e.target.dataset.square] === "") {
        board[e.target.dataset.square] = turn;
        e.target.innerText = turn;
        console.log(board);
        checkWinner(board, turn);

        return ({
          turn: turn === 'X' ? 'O' : 'X',
        })
      }
    }
  }
)(App);
