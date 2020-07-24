import React, { Component } from 'react';
import Draggable from 'react-draggable';
import SortingVis from '../../Projects/Sorting Visualiser/App';
import UrlShortener from '../../Projects/URL Shortener/App';
import ReactResizeDetector from 'react-resize-detector';
export default class ChromeWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            fullscreenIcon: 'fullscreen',
            grabbingCursor: 'grab',
            width: 700,
            height: 1000,
        }
        this.mainDiv = React.createRef();
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.close = this.close.bind(this);
        this.maximize = this.maximize.bind(this);
        this.bringToFront = this.bringToFront.bind(this);
    }

    mouseDown(e){
        //Bring to front
        this.bringToFront();
        this.setState({...this.state, grabbingCursor: 'grabbing'});
    }
    mouseUp(){
        this.setState({...this.state, grabbingCursor: 'grab'});
    }
    handleResize(w, h) {
        this.setState({...this.state, width: w, height: h});
    }
    close(){
        this.props.closeChrome(this.props.target);
    }
    maximize() {
        if(this.state.fullscreen) this.setState({...this.state, fullscreen: false, fullscreenIcon: 'fullscreen'});
        else this.setState({...this.state, fullscreen: true, fullscreenIcon: 'fullscreen_exit',
         width: window.innerWidth, height: window.innerHeight - 43});
    }
    bringToFront(){
        this.props.bringToFront({id: this.props.target, z: this.props.z})
    }
    renderContent(toRender) {
        switch(toRender){
            case 'Sorting Vis':
                return (<div id="sorting-vis"><SortingVis width={this.state.width} height={this.state.height}/></div>)
            case 'URL Shortener':
                return (<div id="url-shortener"><UrlShortener width={this.state.width} height={this.state.height}/></div>)
            default:
                break;
        }
    }
    render() {
        console.log(this.state.top)
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
                            scale={1}>
                        <div className="chrome-box" ref={this.mainDiv} style={{zIndex: this.props.z}} onClick={this.bringToFront}>
                            <div id="handle" className="handle" style={{cursor: this.state.grabbingCursor}}
                                onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
                                    <div className="chrome-x"><i className="material-icons" onClick={this.close}>close</i></div>
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
            return(
                <div className="chrome-box-fs" style={{zIndex: 999}}>
                        <div id="handle" className="handle" style={{cursor: 'default'}}>
                            <div className="chrome-x"><i className="material-icons" onClick={this.close}>close</i></div>
                            <div className="chrome-btn"><i className="material-icons" onClick={this.maximize}>{this.state.fullscreenIcon}</i></div>
                            <div className="chrome-btn"><i className="material-icons">minimize</i></div>
                        </div>
                        <div className="chrome-content-box">
                            {this.renderContent(this.props.target)}
                        </div>
                </div>
            )
        }
    }
}
