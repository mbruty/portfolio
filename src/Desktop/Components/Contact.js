import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
            <div className="contact-container" style={{width: this.props.width, height: this.props.height - 40}}>
                <div className="send" style={{marginLeft: this.props.width - 200}} onClick={()=>{console.log("hi")}}>
                    <a>Send</a>
                    <i className="material-icons noselect">send</i>
                </div>
                <div className="row">
                    <span className="noselect">To: </span>
                    <input type="text" value="mike@bruty.net" readonly/>
                </div>
                <div className="row">
                    <span className="noselect">From: </span>
                    <input type="email"/>
                </div>
                <div className="row">
                    <span className="noselect">Subject: </span>
                    <input type="email"/>
                </div>
                <textarea>

                </textarea>
            </div>
        )
    }
}
