import './App.css';
import ChartWrapper from './Chart-Wrapper';
import logo from './clipart.png';



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    CSE 412 Group 16
                </p>
            </header>
            <div className='App-body'>
                <ChartWrapper/>
            </div>
        </div>
    );
}


export default App;
