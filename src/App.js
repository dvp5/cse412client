import './App.css';
import logo from './clipart.png';

// import { ReactChart } from './React-chart';
import ReachChart2 from './React-chart-2';


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
                <ReachChart2 table1={"netcon"} table2={"finances"} attribute1={"internet_users"} attribute2={"gdp"}></ReachChart2>
            </div>
        </div>
    );
}


export default App;
