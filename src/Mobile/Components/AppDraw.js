import React, { Component } from 'react'
import projects from '../../projects.json';
import otherProjects from '../../other-projects.json';

const maxLength = 11;
export default class AppDraw extends Component {
    render() {
        return (
            <div className="app-draw">
                <div className="input-container">
                    <input type="text" placeholder="Search apps, languages and more..."></input>
                </div>
                <div className="app-container">
                    {projects.map(project => (
                        //Remove recursion as it's only for the desktop version
                        project.name === "Recursion Example" ? null :
                        <div id={project.name} className="entry noselect" onClick={this.props.showWindow}>
                            <i id={project.name} className="material-icons noselect">{project.icon}</i>
                            {" " + project.shortName.slice(0, maxLength) + (project.shortName.length > maxLength ? "..." : "")}
                        </div>
                    ))}
                    {otherProjects.map(project => (
                        <div id={project.name} className="entry noselect" onClick={this.props.showWindow}>
                            <i id={project.name} className="material-icons noselect">{project.icon}</i>
                            {" " + project.shortName.slice(0, maxLength) + (project.shortName.length > maxLength ? "..." : "")}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
