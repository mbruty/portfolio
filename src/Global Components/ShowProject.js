import React, { Component } from "react";
import data from "../other-projects.json";
import projects from "../projects.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.project = data.filter((x) => x.name === this.props.name)[0];
    if (!this.project) {
      this.project = projects.filter((x) => x.name === this.props.name)[0];
    }
    this.renderMD = this.renderMD.bind(this);
  }
  renderMD() {
    const data = this.project.info.split("\n");
    let res = data.map((element) => {
      if (element.startsWith("####")) {
        element = <h4>{element.replace("####", "")}</h4>;
      } else if (element.startsWith("###")) {
        element = <h3>{element.replace("###", "")}</h3>;
      } else if (element.startsWith("##")) {
        element = <h2>{element.replace("##", "")}</h2>;
      } else if (element.startsWith("#")) {
        element = <h1>{element.replace("#", "")}</h1>;
      } else if (element.startsWith("-")) {
        element = (
          <ul>
            <li>{element.replace("-", "")}</li>
          </ul>
        );
      }
      return <p>{element}</p>;
    });
    return res;
  }
  renderImages() {
    if (this.project.image.length === 1) {
      return (
        <img
          src={this.project.image}
          style={{ width: this.props.width - 100 }}
        />
      );
    } else {
      return (
        <div className="image-carousel">
          <Carousel
            autoPlay
            showThumbs={false}
            infiniteLoop={true}
            dynamicHeight={true}
          >
            {this.project.image.map((element) => (
              <div style={{ paddingRight: "2%" }}>
                <img src={element} />
              </div>
            ))}
          </Carousel>
        </div>
      );
    }
  }
  render() {
    return (
      <div
        className="project-container noselect"
        style={{ height: this.props.height - 40, width: this.props.width }}
      >
        <h1>{this.project.name}</h1>
        {this.project.image.length > 0 ? <h3>Completed project:</h3> : null}
        {this.renderImages()}
        <h3>Project info:</h3>
        <div className="text-container">{this.renderMD()}</div>
      </div>
    );
  }
}
