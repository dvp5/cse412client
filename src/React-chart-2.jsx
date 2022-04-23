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
import './chartwrapper.css'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

class ReachChart2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
            data: {
                datasets: [
                    {
                        label: 'A dataset',
                        data: [{ x: 0.5, y: 0.5 }, { x: 0, y: 1 }],
                        backgroundColor: 'rgba(0,0,0, 1)',
                    },
                ],
            },
            perCountryData: {},

        }
    }
    loadData() {
        axios.get(`http://localhost:3001/custom/${this.props.table1}/${this.props.table2}/${this.props.attribute1}/${this.props.attribute2}`)
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
                    countryData[this.props.attribute1] = resData[i][Object.keys(resData[i])[3]];
                    countryData[this.props.attribute2] = resData[i][Object.keys(resData[i])[4]];
                    preComputation[year].push(countryData);

                }
                console.log("post compute" + JSON.stringify(preComputation));
                this.setState({ perCountryData: preComputation });
            })
    }


    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.table1 !== prevProps.table1) {
            console.log("updated");
            this.loadData();
        }
        
    }

    generateRandomColor() {
        const ret = Math.random().toString(16).substr(-6);
        console.log(ret);
        return "#" + ret.toString();
    }

    getData(year) {
        console.log("render called");
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        console.log("current state: " + JSON.stringify(this.state.perCountryData));
        let datasets = [];
        console.log(" PROPS" + typeof (this.props.attribute1) + " " + typeof (this.props.attribute2));
        try {
            let oneYear = this.state.perCountryData[year];
            console.log("oneYear" + JSON.stringify(oneYear));

            for (let i = 0; i < oneYear.length; i++) {

                let point = {
                    x: oneYear[i][this.props.attribute1],
                    y: oneYear[i][this.props.attribute2],
                }
                let point1 = {
                    x: 0,
                    y: 0,
                }
                let obj = {
                    label: oneYear[i].name,
                    backgroundColor: this.generateRandomColor(),
                    data: [point, point1]
                };
                datasets.push(obj);
            }
        } catch (e) {
            console.log(e);
        }



        const data = {
            datasets: datasets,
        };

        console.log("data from dataset: " + JSON.stringify(data));
        this.setState({
            data: data,
            options: options
        })

    }

    renderButton(year) {
        return (
            <button className='button0' key={year} onClick={() => this.getData(year)}>{year}</button>
        )
    }

    render() {
        let years = [];
        for (let i = 0; i < 19; i++) {
            years[i] = i + 2000;
        }
        const listButtons = years.map((year) => this.renderButton(year));



        return (
            <>
                <Scatter className='Main-chart' options={this.state.options} data={this.state.data} />
                <ul>{listButtons}</ul>
            </>



        );
    }
}

export default ReachChart2;
