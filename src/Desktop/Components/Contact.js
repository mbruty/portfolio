import React, { Component } from 'react';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: true,
            failed: false, 
        }
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
            .then(response => {
                if(response.status === 200) {
                    this.setState({...this.state, success: true})
                }
            })
            .catch(err=>{
                console.log(err)
                this.setState({...this.state, failed: true, success: false})
            });
    }

    showError(){
        if(this.state.failed){
            return(                
                <div className="success-modal">
                    <div className="icon-container">
                        <i className="material-icons noselect" style={{color: '#ff475a'}}>error</i>
                    </div>
                    <p>There was an error sending your email.</p>
                    <p>If this error keeps on occuring, please email 'mike@bruty.com'</p>
                    <button className="modal-button" onClick={() => {this.setState({failed: false});}}>Close</button>
                </div>
            )
        }
        else return null;
    }

    showSucess(){
        if(this.state.success){
            return(                
                <div className="success-modal">
                    <div className="icon-container">
                        <i className="material-icons noselect">check_circle</i>
                    </div>
                    <p>Great! Your email has been sent!</p>
                    <button className="modal-button" onClick={() => {this.setState({success: false});}}>Close</button>
                </div>
            )
        }
        else return null;
    }
    render() {
        return (
            <div className="contact-container" style={{width: this.props.width, height: this.props.height - 40}}>
                {this.showError()}
                {this.showSucess()}
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
