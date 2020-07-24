import React, { Component } from 'react';
import StartModal from './Modals/StartModal';
import DateTime from './DateTime';;
export default class StartBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStartModal: false
        }
        this.toggleStartModal = this.toggleStartModal.bind(this);
    }

    toggleStartModal(){
        this.setState({...this.state, showStartModal: !this.state.showStartModal});
    }

    render() {
        return (
            <div>
                <StartModal show={this.state.showStartModal} toggle={this.toggleStartModal}/>
                <div class="taskbar">
                    <div class="icons">
                        <div class="icons-left">
                            <a id="start-menu" onClick={this.toggleStartModal}><i class="material-icons noselect clickthrough">widgets</i></a>
                            <div className="search">
                                <input type="text" placeholder="Type here to search"/>
                                <i className="material-icons noselect">search</i>
                            </div>
                        </div>
                        <div className="icons-middle">
                        </div>
                        <DateTime/>
                    </div>
                </div>
            </div>
        )
    }
}
