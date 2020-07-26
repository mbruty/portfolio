import React, { Component } from 'react'

export default class ProfileModal extends Component {
    render() {
        return (
            <div className="context-modal" id="profile-modal" style={{bottom: 0}}>
                <div className="modal-item noselect" id="profile" onClick={this.props.show}>
                    About Me
                </div>
                <div className="modal-item noselect" id="profile" onClick={this.props.show}>
                    Contact Me
                </div>
            </div>
        )
    }
}
