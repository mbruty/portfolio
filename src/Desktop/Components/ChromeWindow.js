import React, { Component } from "react";
import Draggable from "react-draggable";
import SortingVis from "../../Projects/Sorting Visualiser/App";
import UrlShortener from "../../Projects/URL Shortener/App";
import ReactResizeDetector from "react-resize-detector";
import Documents from "./Documents";
import ShowProject from "../../Global Components/ShowProject";
import Contact from "../../Global Components/Contact";
import projects from "../../projects.json";
import otherProjects from "../../other-projects.json";
export default class ChromeWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      fullscreenIcon: "fullscreen",
      grabbingCursor: "grab",
      width: 700,
      height: 1000,
      readMe: false,
    };
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.close = this.close.bind(this);
    this.maximize = this.maximize.bind(this);
    this.minimize = this.minimize.bind(this);
    this.bringToFront = this.bringToFront.bind(this);
  }

  mouseDown(e) {
    //Bring to front
    this.bringToFront();
    this.setState({ ...this.state, grabbingCursor: "grabbing" });
  }
  mouseUp() {
    this.setState({ ...this.state, grabbingCursor: "grab" });
  }
  handleResize(w, h) {
    this.setState({ ...this.state, width: w, height: h });
  }
  close() {
    this.props.closeChrome(this.props.target);
  }
  maximize() {
    if (this.state.fullscreen)
      this.setState({
        ...this.state,
        fullscreen: false,
        fullscreenIcon: "fullscreen",
      });
    else
      this.setState({
        ...this.state,
        fullscreen: true,
        fullscreenIcon: "fullscreen_exit",
        width: window.innerWidth,
        height: window.innerHeight - 43,
      });
  }
  minimize() {
    this.props.minimize(this.props.target);
  }
  bringToFront() {
    this.props.bringToFront({ id: this.props.target, z: this.props.z });
  }
  toggleReadme = () => {
    this.setState({ ...this.state, readMe: !this.state.readMe });
  };
  RenderProject = (name) => {
    return (
      <div>
        <ShowProject
          width={this.state.width}
          height={this.state.height}
          name={name.name}
        />
      </div>
    );
  };
  renderContent(toRender) {
    if (this.state.readMe) {
      return <this.RenderProject name={toRender} />;
    }
    switch (toRender) {
      case "Sorting Vis":
        return (
          <div id="sorting-vis">
            <SortingVis width={this.state.width} height={this.state.height} />
          </div>
        );
      case "URL Shortener":
        return (
          <div id="url-shortener">
            <UrlShortener width={this.state.width} height={this.state.height} />
          </div>
        );
      case "AirBnb Visualisation":
        return (
          <div id="air-bnb">
            <this.RenderProject name="AirBnb Visualisation" />
          </div>
        );
      case "WinForms Social Network":
        return (
          <div id="wf-social">
            <this.RenderProject name="WinForms Social Network" />
          </div>
        );
      case "HUE Says":
        return (
          <div
            className="hue-says-container"
            style={{ height: this.state.height - 40, width: this.state.width }}
          >
            <iframe
              src={window.location.href + "game"}
              style={{
                height: this.state.height - 42,
                width: this.state.width - 5,
              }}
            />
          </div>
        );
      case "Recursion Example":
        return (
          <div
            className="hue-says-container"
            style={{ height: this.state.height - 40, width: this.state.width }}
          >
            <iframe
              src={window.location.href + " "}
              style={{
                height: this.state.height - 42,
                width: this.state.width - 4,
              }}
            />
          </div>
        );
      case "Starwars Guild Inspector":
        return (
          <div
            className="swgoh"
            style={{ height: this.state.height - 40, width: this.state.width }}
          >
            <iframe
              src="http://tw.bruty.net"
              style={{
                height: this.state.height - 42,
                width: this.state.width,
              }}
            />
          </div>
        );
      case "Documents":
        return (
          <Documents
            callback={this.props.showWindow}
            width={this.state.width}
            height={this.state.height}
          />
        );
      case "Contact Me":
        return <Contact width={this.state.width} height={this.state.height} />;
      default:
        break;
    }
  }
  getGitUrl = () => {
    let project = projects.filter(
      (project) => project.shortName === this.props.target
    );
    console.log(project)
    if (project[0] === undefined) 
      project = otherProjects.filter(
        (project) => project.shortName === this.props.target
      );
    console.log(this.props.target);
    return project[0].url;
  };
  render() {
    let showReadMe = true;
    let showCode = true;
    let project = projects.filter((x) => x.shortName === this.props.target);
    if (this.props.target === "Contact Me" || this.props.target === "Documents")
      showCode = false;
    if (project.length === 0) showReadMe = false;
    if (!this.props.show) return null;
    else if (!this.state.fullscreen) {
      return (
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.handleResize}
        >
          <Draggable
            handle=".handle"
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[1, 1]}
            scale={1}
          >
            <div
              className="chrome-box"
              style={{ zIndex: this.props.z }}
              onClick={this.bringToFront}
            >
              <div
                id="handle"
                className="handle"
                style={{ cursor: this.state.grabbingCursor }}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
              >
                <h3>{project[0] ? project[0].name : this.props.target}</h3>
                <div className="chrome-x">
                  <i className="material-icons" onClick={this.close}>
                    close
                  </i>
                </div>
                <div className="chrome-btn">
                  <i className="material-icons" onClick={this.maximize}>
                    {this.state.fullscreenIcon}
                  </i>
                </div>
                <div className="chrome-btn">
                  <i className="material-icons" onClick={this.minimize}>
                    minimize
                  </i>
                </div>
                ;
                {showReadMe ? (
                  <div
                    className="chrome-btn read-me"
                    onClick={this.toggleReadme}
                    style={{ marginRight: "5px" }}
                  >
                    {this.state.readMe ? "Close Read Me" : "Read Me"}
                  </div>
                ) : null}
                {showCode ? (
                  <div
                    className="chrome-btn read-me"
                    style={{ marginRight: "5px" }}
                    onClick={() => window.open(this.getGitUrl())}
                  >
                    View Source Code
                  </div>
                ) : null}
              </div>
              <div style={{ overflow: "auto" }}>
                {this.renderContent(this.props.target)}
              </div>
            </div>
          </Draggable>
        </ReactResizeDetector>
      );
    } else {
      return (
        <div style={{ zIndex: 999 }}>
          <div id="handle" className="handle" style={{ cursor: "auto" }}>
            <h3>{this.props.target}</h3>
            <div className="chrome-x">
              <i className="material-icons" onClick={this.close}>
                close
              </i>
            </div>
            <div className="chrome-btn">
              <i className="material-icons" onClick={this.maximize}>
                {this.state.fullscreenIcon}
              </i>
            </div>
            <div className="chrome-btn">
              <i className="material-icons">minimize</i>
            </div>
          </div>
          <div style={{ overflow: "scroll" }}>
            {this.renderContent(this.props.target)}
          </div>
        </div>
      );
    }
  }
}
