import React, { Component } from 'react';
import BottomBar from './Components/BottomBar';
import MainScreen from './Components/MainScreen';
import AppDraw from './Components/AppDraw';
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
                <AppDraw/>
            </div>
        )
    }
}
