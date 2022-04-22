import React from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

class ReachChart2 extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/something`)
            .then(res => {
                const resData = res.data;
                console.log("response data" + JSON.stringify(resData));
                console.log("response data one piece: " + resData[0].gdp);

                this.setState({ data: resData });
            })
    }

    render() {
        console.log("render called");
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };
        console.log("current state full: " + JSON.stringify(this.state));
        console.log("current state data: " + JSON.stringify(this.state.data));
        console.log("current state data[0]: " + JSON.stringify(this.state.data[0]));
        // console.log("current state data[0] gdp: " + JSON.stringify(this.state.data[0].gdp));
        let gdp = []
        try {

            console.log("current state data[0] gdp: " + JSON.stringify(this.state.data[0].gdp));
            for (let i = 0; i < 10; i++) {
                gdp[i] = this.state.data[i].gdp;
            }
        } catch (e) {
            console.log(e);
        }
        let array = []

        for (let i = 0; i < 10; i++) {
            array[i] = {
                x: i,
                y: gdp[i],
                // y: Math.random(),

            }
        }
        const data = {
            datasets: [
                {
                    label: 'A dataset',
                    data: array,
                    backgroundColor: 'rgba(0,0,0, 1)',
                },
            ],
        };

        console.log("data from dataset: " + JSON.stringify(data.datasets[0].data[0]));
        return (

            <Scatter options={options} data={data} />

        );
    }
}

export default ReachChart2;