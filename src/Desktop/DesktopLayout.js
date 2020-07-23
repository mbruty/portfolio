import React, { Component } from 'react'
import './desktop.css';
import './material.css';
import StartBar from './Components/StartBar';
import Desktop from './Components/Desktop';
export default class DesktopLayout extends Component {
    render() {
        return (
            <div className="desktop-layout">
                <Desktop/>
                <StartBar/>
            </div>
        )
    }
}
