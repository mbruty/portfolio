import React, { Component } from 'react';
import Draggable from 'react-draggable';
import SortingVis from '../../Projects/Sorting Visualiser/App';
import ReactResizeDetector from 'react-resize-detector';
export default class ChromeWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            grabbingCursor: 'grab',
            width: 700,
            height: 1000
        }
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    mouseDown(){
        this.setState({...this.state, grabbingCursor: 'grabbing'});
    }
    mouseUp(){
        this.setState({...this.state, grabbingCursor: 'grab'});
    }
    handleResize(w, h) {
        this.setState({...this.state, width: w, height: h});
    }
    render() {
        if(!this.props.show) return null;
        else if (!this.state.fullscreen) {
            return (
            <Draggable
                handle=".handle"
                bounds="parent"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[1, 1]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                    <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}>
                        <div className="chrome-box">
                            <div id="handle" className="handle" style={{cursor: this.state.grabbingCursor}}
                                onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}/>
                            <div className="chrome-content-box">
                                <SortingVis width={this.state.width} height={this.state.height}/>
                            </div>
                        </div>
                    </ReactResizeDetector>
                </Draggable>
            )
        }
        else{
            return(
                <div className="chrome-box-fs">
                        <div id="handle" className="handle" style={{cursor: 'default'}}/>
                        
                    </div>
            )
        }
    }
}
