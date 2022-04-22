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
import './react-chart.css'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

class ReachChart2 extends React.Component {
    state = {
        
        perCountryData: {},
       
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/gdp-unemployment`)
            .then(res => {
                const resData = res.data;
                console.log("response data" + JSON.stringify(resData));
                let preComputation = {
                    2000: [],
                    2001: [],
                    2002: [],
                    2003: [],
                    2004: [],
                    2005: [],
                    2006: [],
                    2007: [],
                    2008: [],
                    2009: [],
                    2010: [],
                    2011: [],
                    2012: [],
                    2013: [],
                    2014: [],
                    2015: [],
                    2016: [],
                    2017: [],
                    2018: [],
                    2019: [],

                }

                for (let i = 0; i < resData.length; i++) {
                    let year = resData[i].yearkey;
                    let countryData = {};
                    countryData['name'] = resData[i].nationname;
                    countryData['gdp'] = resData[i].gdp;
                    countryData['unemployment'] = resData[i].unemployment;
                    preComputation[year].push(countryData);

                }
                console.log("post compute" + JSON.stringify(preComputation));
                this.setState({ perCountryData: preComputation });
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

        console.log("current state: " + JSON.stringify(this.state.perCountryData));
        let dataData = [];
        try {
            let oneYear = this.state.perCountryData[2000];
            console.log("oneYear" + JSON.stringify(oneYear));

            for (let i = 0; i < oneYear.length; i++) {
                let point = {};
                point['x'] = oneYear[i].unemployment;
                point['y'] = oneYear[i].gdp;

                dataData.push(point);
            }
        } catch (e) {
            console.log(e);
        }



        const data = {
            datasets: [
                {
                    label: 'A dataset',
                    data: dataData,
                    backgroundColor: 'rgba(0,0,0, 1)',
                },
            ],
        };

        console.log("data from dataset: " + JSON.stringify(data));
       

        return (
            <>
                <Scatter className='Main-chart' options={options} data={data} />
            </>


        );
    }
}

export default ReachChart2;
