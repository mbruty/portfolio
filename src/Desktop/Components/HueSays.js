import React, { Component } from 'react'

export default class HueSays extends Component {
    render() {
        return (
            <div className="hue-says-container" style={{height: this.props.height - 40, width: this.props.width}}>
                <iframe src={window.location.href+"/game"} style={{height: this.props.height, width: this.props.width-5}}/>
            </div>
        )
    }
}
