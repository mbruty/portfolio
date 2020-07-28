import React, { Component } from 'react'
import projects from '../../other-projects.json';
import Project from './Project';
export default class Documents extends Component {
    render() {
        return (
            <div style={{height: this.props.height - 40, width: this.props.width}}>
                <div className="documents-container">
                {projects.map(project => (
                    <div className="icon" onDoubleClick={this.props.callback}>
                        <i className="material-icons noselect">{project.icon}</i>
                        <h3 className="noselect">{project.shortName}</h3>
                    </div>
                ))}
                </div>
            </div>
        )
    }
}
