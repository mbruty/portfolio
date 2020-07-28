import React, { Component } from 'react';
import BottomBar from './Components/BottomBar';
import './mobile.css';
import '../material.css';
export default class MobileLayout extends Component {

    componentDidMount(){
        document.title = "Android Brut-berry Pie";
    }
    render() {
        return (
            <div className="mobile-container">
                <div className="mobile-base">
                <BottomBar/>
                </div>
            </div>
        )
    }
}
