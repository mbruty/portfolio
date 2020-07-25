import React, { Component } from 'react'

export default class SettingsModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="settings-modal" id="settings-modal">
                <div className="modal-item noselect" id="website-redirect">
                    Show Website Code
                </div>
                <div className="modal-item noselect" id="website-redirect">
                    Show Mobile Website
                </div>
            </div>
        )
    }
}
