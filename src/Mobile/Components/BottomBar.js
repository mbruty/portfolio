import React, { Component } from 'react';
import projects from '../../projects.json';
export default class BottomBar extends Component {
    render() {
        return (
            <div className="bottom-bar">
                <i className="material-icons up-carrot noselect">keyboard_arrow_up</i>
                <span className="icon-container">
                    <i className="material-icons">account_circle</i>
                    <i className="material-icons">account_circle</i>
                    <i className="material-icons">account_circle</i>
                    <i className="material-icons">account_circle</i>
                </span>
            </div>
        )
    }
}
