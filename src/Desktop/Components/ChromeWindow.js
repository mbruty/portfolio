import React, { Component } from 'react';
import Draggable from 'react-draggable';
import SortingVis from '../../Projects/Sorting Visualiser/App';
import ReactResizeDetector from 'react-resize-detector';
export default class ChromeWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            fullscreenIcon: 'fullscreen',
            grabbingCursor: 'grab',
            width: 700,
            height: 1000
        }
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.maximize = this.maximize.bind(this);
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
    maximize() {
        if(this.state.fullscreen) this.setState({...this.state, fullscreen: false, fullscreenIcon: 'fullscreen'});
        else this.setState({...this.state, fullscreen: true, fullscreenIcon: 'fullscreen_exit'});
    }
    renderContent(toRender) {
        console.log(toRender);
        switch(toRender){
            case 'Sorting Vis':
                return (<SortingVis width={this.state.width} height={this.state.height}/>)
            default:
                break;
        }
    }
    render() {
        if(!this.props.show) return null;
        else if (!this.state.fullscreen) {
            return (
                    <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize}>
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
                        <div className="chrome-box">
                            <div id="handle" className="handle" style={{cursor: this.state.grabbingCursor}}
                                onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
                                    <div className="chrome-x"><i className="material-icons" onClick={this.props.closeChrome}>close</i></div>
                                    <div className="chrome-btn"><i className="material-icons" onClick={this.maximize}>{this.state.fullscreenIcon}</i></div>
                                    <div className="chrome-btn"><i className="material-icons">minimize</i></div>
                                </div>
                            <div className="chrome-content-box">
                                {this.renderContent(this.props.target)}
                            </div>
                        </div>
                    </Draggable>
                </ReactResizeDetector>
            )
        }
        else{
            console.log({width: this.state.width, height: this.state.height});
            return(
                <div className="chrome-box-fs">
                        <div id="handle" className="handle" style={{cursor: 'default'}}>
                            <div className="chrome-x"><i className="material-icons" onClick={this.close}>close</i></div>
                            <div className="chrome-btn"><i className="material-icons" onClick={this.maximize}>{this.state.fullscreenIcon}</i></div>
                            <div className="chrome-btn"><i className="material-icons">minimize</i></div>
                        </div>
                        <div className="chrome-content-box">
                            <SortingVis width={this.state.width} height={window.innerHeight - 43}/>
                        </div>
                </div>
            )
        }
    }
}
