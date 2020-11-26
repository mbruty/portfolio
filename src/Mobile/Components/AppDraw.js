import React, { Component } from "react";
import webProjects from "../../projects.json";
import otherProjects from "../../other-projects.json";
import display from "../../display.json";

const maxLength = 11;
export default class AppDraw extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
    this.textRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.unFocus = this.unFocus.bind(this);
    this.projects = webProjects.concat(otherProjects);
    this.projects = this.projects.concat(display);
  }
  onChange(e) {
    this.setState({ ...this.state, search: e.target.value.toLowerCase() });
  }
  unFocus() {
    this.textRef.current.value = "";
    this.setState({ search: "" });
  }
  render() {
    if (this.state.search) {
      return (
        <div className="app-draw">
          <div className="input-container">
            <input
              ref={this.textRef}
              type="text"
              placeholder="Search apps, languages and more..."
              onBlur={this.unFocus}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="app-container">
            {this.projects.map((project) => {
              if (
                project.name.toLowerCase().includes(this.state.search) ||
                project.language.toLowerCase().includes(this.state.search)
              ) {
                return (
                  <div
                    id={project.name}
                    className="search-entry noselect"
                    onClick={this.props.showWindow}
                  >
                    <i id={project.name} className="material-icons noselect">
                      {project.icon}
                    </i>
                    {" " +
                      project.shortName.slice(0, maxLength) +
                      (project.shortName.length > maxLength ? "..." : "")}
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="app-draw">
          <div className="input-container">
            <input
              ref={this.textRef}
              type="text"
              placeholder="Search apps, languages and more..."
              onBlur={this.unFocus}
              onChange={this.onChange}
            ></input>
          </div>
          <div className="app-container">
            {this.projects.map((project) =>
              //Remove recursion as it's only for the desktop version
              project.name === "Recursion Example" ||
              project.name === "Documents" ? null : (
                <div
                  id={project.name}
                  className="entry noselect"
                  onClick={this.props.showWindow}
                >
                  <i id={project.name} className="material-icons noselect">
                    {project.icon}
                  </i>
                  {" " +
                    project.shortName.slice(0, maxLength) +
                    (project.shortName.length > maxLength ? "..." : "")}
                </div>
              )
            )}
          </div>
        </div>
      );
    }
  }
}
