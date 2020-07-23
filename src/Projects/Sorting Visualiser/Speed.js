import React, { Component } from 'react'
import RandList from './RandList';
// eslint-disable-next-line
import Worker from 'worker-loader!./workers/AlgoTimer.worker.js';
export default class Speed extends Component {
    constructor(props){
        super(props);
        this.timeAlgos = this.timeAlgos.bind(this);
        this.state = {
            nTimes: 10000,
            results: []
        };
        this.processing = false;

        this.updateResults = this.updateResults.bind(this);
        this.speed = this.speed.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.worker = new Worker();
        this.worker.addEventListener('message', this.updateResults, false);
    }

    updateResults(res){
        this.setState({...this.state, results: res.data});
        this.processing = false;
    }

    timeAlgos(){
        const data = RandList(this.state.nTimes);
          
        this.worker.postMessage(data); // Send data to our worker.
    }

    handleChange(){
        this.setState({...this.state, nTimes: document.getElementById('ntimes').value});
    }

    speed(e){
        //Stop the form from re-rendering
        e.preventDefault();
        this.setState({...this.state, results: []})
        if(!this.processing){
            this.processing = true;
            this.timeAlgos();
        }
    }

    render() {
        return (
            <div>
                <h2>Number of elements for speed test</h2>
                <input onChange={this.handleChange} id="ntimes" type="number" min="0" max="1000" defaultValue="100000"/>
                <a href="something" class="button" onClick={this.speed}>Speed test</a>
                <h2>Results</h2>
                <table className="darkTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time taken (ms)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.results.map(element => {
                                return( 
                                    <tr key={element.name}>
                                        <td>{element.name}</td>
                                        <td>{element.result}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}
