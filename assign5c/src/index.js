import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Puzzle from './Puzzle';
import RandomPuzzle from './RandomPuzzle'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route path='standard' element={<Puzzle />} />
        <Route path='random' element={<RandomPuzzle />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
