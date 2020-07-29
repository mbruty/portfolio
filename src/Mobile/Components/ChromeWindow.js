import React, { Component } from 'react'
import SortingVis from '../../Projects/Sorting Visualiser/App';
import UrlShortener from '../../Projects/URL Shortener/App'
import ShowProject from '../../Global Components/ShowProject';
import Contact from '../../Global Components/Contact';

export default class ChromeWindow extends Component {
    constructor(props){
        super(props);
    }

    renderContent(){
        switch (this.props.element){
            case 'Sorting Algorithm Visualiser':
                return (<div id="sorting-vis"><SortingVis width={window.innerWidth} height={window.innerHeight}/></div>)
            case 'URL Shortener':
                return (<div id="url-shortener"><UrlShortener width={window.innerWidth} height={window.innerHeight}/></div>)
            case 'AirBnb Visualisation':
                return(<ShowProject width={window.innerWidth} height={window.innerHeight} name="AirBnb Visualisation"/>)
            case 'WinForms Social Network':
                return (<div id="wf-social"><ShowProject width={window.innerWidth} height={window.innerHeight} name="WinForms Social Network"/></div>)
            case 'HUE Says':
                return (
                <div className="hue-says-container" style={{height: window.innerHeight - 40, width: window.innerWidth}}>
                    <iframe src={window.location.href+"game"} style={{height: window.innerHeight - 42,width: window.innerWidth - 5}}/>
                </div>)
            case 'Contact Me':
                return(<Contact width={window.innerWidth} height={window.innerHeight}/>)
            default:
                break;
        }
    }
    render() {
        return (
            <div className="chrome-window">
                <div className="nav">
                    <i className="material-icons noselect" onClick={this.props.close}>arrow_back_ios</i>
                    <h3>{this.props.element}</h3>
                </div>
                <div className="chrome-content">
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}
