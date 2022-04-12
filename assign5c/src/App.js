import './App.css';
import { Outlet, Link } from 'react-router-dom';
import Puzzle from './Puzzle';

function App() {
  return (
    <div className="App">
      <h1>Three in a Row Puzzle</h1>
      <nav>
        <Link to="/standard">Standard Puzzle</Link> | {" "}
        <Link to="/random">Random Puzzle</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
