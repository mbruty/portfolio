import React, { Component } from 'react'
import data from '../projects.json';
import Project from './Project';
import { DragDropContext } from 'react-beautiful-dnd';
import ChromeWindow from './ChromeWindow';

export default class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: null,
            loaded: false,
            showChrome: false,
            windowToShow: null,
        }
        this.showWindow = this.showWindow.bind(this);
        this.closeChrome = this.closeChrome.bind(this);
    }

    showWindow(e){
        const target = e.target.getElementsByTagName('h3')[0].innerText;
        this.setState({...this.state, showChrome: true, windowToShow: target});
    }

    onDragEnd(destination, source){
        if(!destination){
            return;
        }

        //reorder(this.state.array, source, destination);
    }

    closeChrome(){
        this.setState({...this.state, showChrome: false, windowToShow: null});
    }
    componentDidMount(){
        let arr = [];
        for(let i = 0; i < 9; ++i){
            arr[i] = [];
            for(let j = 0; j < 25; ++j){
                arr[i][j] = {id: `row${i} col${j}`};
            }
        }
        let counter = 0;
        data.forEach((_item, index) => {
            const col = Math.floor(counter / 9)
            arr[index][col] = {...arr[index][col], item: _item};
            counter++;
        })

        
        this.setState({array: arr, loaded: true});
    }
    render() {
        if(!this.state.loaded) return null;
        return (
            <div className="desktop">
                <ChromeWindow show={this.state.showChrome} target={this.state.windowToShow} closeChrome={this.closeChrome}/>
                <table>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                    {this.state.array.map((row, idx) => (
                    <tr>
                        {row.map(element => (
                            <Project  element={element} idx={idx} callback={this.showWindow}/>
                        ))}
                    </tr>
                    ))}
                </DragDropContext>
                </table>
                
            </div>
        )
    }
}
