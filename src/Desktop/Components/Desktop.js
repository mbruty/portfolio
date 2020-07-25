import React, { Component } from 'react'
import data from '../projects.json';
import display from '../display.json';
import Project from './Project';
import { DragDropContext } from 'react-beautiful-dnd';
import ChromeWindow from './ChromeWindow';
import StartBar from './StartBar';
import '../desktop.css';
import '../material.css';

export default class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: null,
            loaded: false,
            openWindows: []
        }
        this.showWindow = this.showWindow.bind(this);
        this.showWindowFromString = this.showWindowFromString.bind(this);
        this.closeChrome = this.closeChrome.bind(this);
        this.bringWindowToFront = this.bringWindowToFront.bind(this);
    }

    showWindow(e){
        const target = e.target.getElementsByTagName('h3')[0].innerText;
        let openWindowsCoppy = [...this.state.openWindows];
        let top = openWindowsCoppy.length;
        openWindowsCoppy.push({showChrome: true, windowToShow: target, z: top})
        this.setState({...this.state, openWindows: openWindowsCoppy});
    }

    showWindowFromString(str){
        const target = str;
        let openWindowsCoppy = [...this.state.openWindows];
        let top = openWindowsCoppy.length;
        openWindowsCoppy.push({showChrome: true, windowToShow: target, z: top})
        this.setState({...this.state, openWindows: openWindowsCoppy});
    }
    //todo
    onDragEnd(destination, source){
        if(!destination){
            return;
        }

        //reorder(this.state.array, source, destination);
    }

    bringWindowToFront(toBringToFront){
        let top = this.state.openWindows.length;
        if(toBringToFront.z === top) return;
        let currIdx = toBringToFront.z;
        let arrCoppy = [...this.state.openWindows];
        //Bring anything on top of it down
        arrCoppy.map(element => {
            if(element.z > currIdx){
                element.z -= 1;
            }
            else if(element.windowToShow === toBringToFront.id){
                element.z = top;
            }
        })
        this.setState({...this.state, openWindows: arrCoppy});

    }

    closeChrome(toRemove){
        let openWindowsCoppy = [...this.state.openWindows];
        openWindowsCoppy.map(obj =>  {
            if(obj.windowToShow === toRemove){
                obj.showChrome = false;
            }
        });
        console.log({copy: openWindowsCoppy, orig: this.state.openWindows})
        this.setState({...this.state, openWindows: openWindowsCoppy});
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
        let items = display.concat(data);
        items.forEach((_item, index) => {
            const col = Math.floor(counter / 9)
            arr[index][col] = {...arr[index][col], item: _item};
            counter++;
        })

        
        this.setState({array: arr, loaded: true});
    }
    render() {
        if(!this.state.loaded) return null;
        console.log(this.state.openWindows);
        return (
            <>
                <div className="desktop">
                    {this.state.openWindows.map(element => <ChromeWindow show={element.showChrome} target={element.windowToShow} 
                    closeChrome={this.closeChrome} bringToFront={this.bringWindowToFront} z={element.z}/>)}
                    <table>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                        {this.state.array.map((row, idx) => (
                        <tr>
                            {row.map(element => (
                                <Project element={element} idx={idx} callback={this.showWindow} z={element.z}/>
                            ))}
                        </tr>
                        ))}
                    </DragDropContext>
                    </table>
                </div>
                <StartBar showWindow={this.showWindowFromString}/>
            </>
        )
    }
}
