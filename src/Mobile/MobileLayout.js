import React, { Component } from 'react';
import BottomBar from './Components/BottomBar';
import MainScreen from './Components/MainScreen';
import './mobile.css';
import '../material.css';
export default class MobileLayout extends Component {

    componentDidMount(){
        document.title = "Android Brut-berry Pie";
    }
    render() {
        return (
            <div className="mobile-main">
                <MainScreen/>
                <BottomBar/>
                <div className="app-draw">
                </div>
            </div>
        )
    }
}
