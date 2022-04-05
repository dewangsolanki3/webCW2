import logo from './logo.svg';
import './App.css';
import Landing from './components/layout/Landing.jsx'
import {BrowserRouter as Router} from "react-router-dom";


function App() {
  return (
      <Router>
        <div className="App">
          <Landing />
        </div>
      </Router>
  );
}

export default App;
