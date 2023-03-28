import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import AnotherHello from './AnotherHello';
import Today from './Today';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Hello/>
        <img src={logo} className="App-logo" alt="logo" />
       <AnotherHello  name = 'Arus' surname = 'Shahverdyan'/>
       <Today/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         
        </a>
      </header>
    </div>
  );
}

export default App;
