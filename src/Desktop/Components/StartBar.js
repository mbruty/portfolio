import React, { Component } from 'react'
import DateTime from './DateTime';
export default class StartBar extends Component {
    render() {
        return (
            <div class="taskbar">
                <div class="icons">
                    <div class="icons-left">
                        <a id="start-menu"><i class="material-icons">widgets</i></a>
                        <div className="search">
                            <input type="text" placeholder="Type here to search"/>
                            <i className="material-icons">search</i>
                        </div>
                    </div>
                    <div className="icons-middle">
                        
                    </div>
                    <DateTime/>
                </div>
            </div>
        )
    }
}
