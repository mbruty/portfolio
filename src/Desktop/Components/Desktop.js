import React, { Component } from 'react'
import data from '../../projects.json';
import display from '../../display.json';
import Project from './Project';
import { DragDropContext } from 'react-beautiful-dnd';
import ChromeWindow from './ChromeWindow';
import StartBar from './StartBar';
import '../desktop.css';
import '../../material.css';

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
        this.minimize = this.minimize.bind(this);
        this.unMinimize = this.unMinimize.bind(this);
    }

    showWindow(e){
        const target = e.target.getElementsByTagName('h3')[0].innerText;
        const icon = e.target.getElementsByTagName('i')[0].innerText;
        let openWindowsCoppy = [...this.state.openWindows];
        let top = openWindowsCoppy.length;
        let window = openWindowsCoppy.filter(x => x.windowToShow === target)[0];
        if(window){
            this.bringWindowToFront({id: window.windowToShow, z: window.z, bypass: true});
        }
        else{
            openWindowsCoppy.push({showChrome: true, windowToShow: target, z: top, icon: icon})
            this.setState({...this.state, openWindows: openWindowsCoppy});
        }
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
        if(toBringToFront.z === top && !toBringToFront.bypass) return;
        let currIdx = toBringToFront.z;
        let arrCoppy = [...this.state.openWindows];
        //Bring anything on top of it down
        arrCoppy.map(element => {
            if(element.z > currIdx){
                element.z -= 1;
            }
            else if(element.windowToShow === toBringToFront.id){
                element.z = top;
                element.showChrome = true;
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
        this.setState({...this.state, openWindows: openWindowsCoppy});
    }

    unMinimize(e){
        const target = e.target.id;
        console.log(target);
        let openWindowsCoppy = [...this.state.openWindows];
        openWindowsCoppy.map(obj =>  {
            if(obj.windowToShow === target){
                obj.showChrome = true;
                obj.minimized = false;
            }
        });
        const z = this.state.openWindows.filter(x => x.windowToShow === target)[0];
        this.bringWindowToFront({id: e.target.id, z: z.z});
        this.setState({...this.state, openWindows: openWindowsCoppy});
    }

    componentDidMount(){
        document.title = "Windows Bruty Edition";
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

    minimize(target){
        let openWindowsCoppy = [...this.state.openWindows];
        openWindowsCoppy.map(obj =>  {
            if(obj.windowToShow === target){
                obj.minimized = true;
                obj.showChrome = false;
            }
        });
        this.setState({...this.state, openWindows: openWindowsCoppy});
    }
    render() {
        if(!this.state.loaded) return null;
        return (
            <>
                <div className="desktop noselect">
                    {this.state.openWindows.map(element => <ChromeWindow minimize={this.minimize} show={element.showChrome} target={element.windowToShow} 
                    closeChrome={this.closeChrome} bringToFront={this.bringWindowToFront} z={element.z} showWindow={this.showWindow}/>)}
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
                <StartBar openWindows={this.state.openWindows} unMinimize={this.unMinimize} showWindow={this.showWindowFromString}/>
            </>
        )
    }
}
