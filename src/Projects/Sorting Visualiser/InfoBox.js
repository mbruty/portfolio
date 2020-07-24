import React, { Component } from 'react'
import Speed from './Speed';
import showCode from './ShowCode';

export default class InfoBox extends Component {

    constructor(props){
        super(props);
        this.algorithms = ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Quick Sort'];
    }

    render() {
        if(this.props.width <= 845){
            return(
                <div className="info-box-mob">
                    <h2>Algorithm</h2>
                    <select className="algo-select" name="algorithm" id="algorithm" onChange={this.props.onChange}>
                        {this.algorithms.map((element) => {
                        return <option value={element}>{element}</option>
                        })}
                    </select>
                    <i class="material-icons" onClick={() => {showCode(`${document.getElementById('algorithm').value}`)}}>code</i>
                    <h2>Number of elements</h2>
                    <input onChange={this.props.handleChange} id="samples" type="number" min="1" max="700" defaultValue="25"/>
                    <h2>Delay between sorting iterations (ms)</h2>
                    <input onChange={this.props.handleChange} id="delay" type="number" min="0" max="1000" defaultValue="25"/>
                    <a href="something" class="button" onClick={this.props.sort}>Sort</a>
                    <a href="something" class="button" onClick={this.props.reset}>Reset</a>
                    <Speed/>
                </div>
            )
        }
        else{
            return(
                <div className="info-box">
                    <h2>Algorithm</h2>
                    <select className="algo-select" name="algorithm" id="algorithm" onChange={this.props.onChange}>
                        {this.algorithms.map((element) => {
                        return <option value={element}>{element}</option>
                        })}
                    </select>
                    <i class="material-icons" onClick={() => {showCode(`${document.getElementById('algorithm').value}`)}}>code</i>
                    <h2>Number of elements</h2>
                    <input onChange={this.props.handleChange} id="samples" type="number" min="1" max="700" defaultValue="25"/>
                    <h2>Delay between sorting iterations (ms)</h2>
                    <input onChange={this.props.handleChange} id="delay" type="number" min="0" max="1000" defaultValue="25"/>
                    <a href="something" class="button" onClick={this.props.sort}>Sort</a>
                    <a href="something" class="button" onClick={this.props.reset}>Reset</a>
                    <Speed/>
                </div>
            )
        }
    }
}
