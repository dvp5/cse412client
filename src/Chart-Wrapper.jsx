import React from 'react';
import ReachChart2 from "./React-chart-2";
import table from "./tableMap.json";

class ChartWrapper extends React.Component {

    state = {
        table1: "netCon",
        table2: "finances",
        attr1: "internet_users",
        attr2: "gdp"
    }


    renderButton(attribute) {
        return (
            <button key={attribute} onClick={() => {
                if(table[attribute]===table[this.state.attr2])return;
                console.log("changing 1");
                this.setState({ attr1: attribute, table1: table[attribute] })
            }}>
                {attribute}
            </button>
        )
    }

    renderButton1(attribute) {
        return (
            <button key={attribute} onClick={() => {
                
                if(table[attribute]===table[this.state.attr1])return;
                console.log("changing 2");
                this.setState({ attr2: attribute, table2: table[attribute] });
            }}>{attribute}</button>
        )
    }



    render() {


        let options = [];
        for (let key in Object.keys(table)) {
            options.push(Object.keys(table)[key]);
        }
        console.log(options);
        const listButtons = options.map((option) => this.renderButton(option));
        const listButtons1 = options.map((option) => this.renderButton(option));
        console.log("state" + JSON.stringify(this.state));
        return (
            <>
                <ReachChart2 table1={this.state.table1} table2={this.state.table2} attribute1={this.state.attr1} attribute2={this.state.attr2}></ReachChart2>
                <p>{this.state.table1} {this.state.attr1}</p>
                <ul>{listButtons}</ul>
                <p>{this.state.table2} {this.state.attr2}</p>
                <ul>{listButtons1}</ul>
                
            </>);
    };


}

export default ChartWrapper;