import React, { Component } from 'react';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.email = null;
        this.message= null;
        this.subject = null;
        this.updateEmail = this.updateEmail.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.sendMail = this.sendMail.bind(this);
    }
    updateSubject(e){
        this.subject = e.target.value;
    }
    updateEmail(e){
        this.email = e.target.value;
    }
    updateMessage(e){
        this.message = e.target.value;
    }

    sendMail(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                from: this.email,
                subject: this.subject,
                message: this.message,
            })
        };
        fetch(window.location.href+'mail', requestOptions)
            .then(response => response.json())
            .then(data =>console.log(JSON.stringify(data)))
            .catch(this.showError())
    }

    showError(){

    }

    showSucess(){
        
    }
    render() {
        return (
            <div className="contact-container" style={{width: this.props.width, height: this.props.height - 40}}>
                <div className="send" style={{marginLeft: this.props.width - 200}} onClick={this.sendMail}>
                    <a>Send</a>
                    <i className="material-icons noselect">send</i>
                </div>
                <div className="row">
                    <span className="noselect">To: </span>
                    <input type="text" value="mike@bruty.net" readonly/>
                </div>
                <div className="row">
                    <span className="noselect">From: </span>
                    <input type="email" onChange={this.updateEmail}/>
                </div>
                <div className="row">
                    <span className="noselect" onChange={this.updateSubject}>Subject: </span>
                    <input type="email"/>
                </div>
                <textarea>

                </textarea>
            </div>
        )
    }
}
