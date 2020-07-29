import React, { Component } from 'react';
import MainScreen from './Components/MainScreen';
import AppDraw from './Components/AppDraw';
import ChromeWindow from './Components/ChromeWindow';
import './mobile.css';
import '../material.css';
export default class MobileLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {showChrome: false, windowToShow: null}
        this.closeWindow = this.closeWindow.bind(this);
        this.showWindow = this.showWindow.bind(this);
    }

    closeWindow(){
        this.setState({...this.state, showChrome: false})
    }

    showWindow(e){
        console.log(e)
        this.setState({...this.state, showChrome: true, windowToShow: e.target.id})

    }
    componentDidMount(){
        document.title = "Android Brut-berry Pie";
    }
    render() {
        if(this.state.showChrome){
            return <ChromeWindow element={this.state.windowToShow} close={this.closeWindow} />;
        }
        else{
            return (
                <div className="mobile-main">
                    <MainScreen/>
                    <AppDraw showWindow={this.showWindow}/>
                </div>
            )
        }
    }
}
