import React, { Component } from 'react';
import StartModal from './Modals/StartModal';
import DateTime from './DateTime';
import SearchModal from './Modals/SearchModal';
export default class StartBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStartModal: false,
            showSearch: false,
            search: ''
        }
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
        this.toggleStartModal = this.toggleStartModal.bind(this);
    }

    toggleStartModal(){
        this.setState({...this.state, showStartModal: !this.state.showStartModal});
    }

    toggleSearchModal(e){
        if(e.type === "focus"){
            this.setState({...this.state, showSearch: true});
        }
        else if(e.type === "toggle"){
            this.setState({...this.state, showSearch: false});
        }
        else{
            this.setState({...this.state, search: e.target.value});
        }
    }

    render() {
        return (
            <div>
                <StartModal showWindow={this.props.showWindow} show={this.state.showStartModal} toggle={this.toggleStartModal}/>
                <SearchModal showWindow={this.props.showWindow} search={this.state.search.toLowerCase()} show={this.state.showSearch} toggle={this.toggleSearchModal}/>
                <div class="taskbar">
                    <div class="icons">
                        <div class="icons-left">
                            <a id="start-menu" onClick={this.toggleStartModal}><i class="material-icons noselect clickthrough">widgets</i></a>
                            <div className="search">
                                <input type="text" placeholder="Type here to search (project name | langauge)" onFocus={this.toggleSearchModal} onChange={this.toggleSearchModal}/>
                                <i className="material-icons noselect">search</i>
                            </div>
                        </div>
                        <div className="icons-middle">
                            {this.props.openWindows.map(element => {
                                if(element.showChrome || element.minimized){
                                    return <a className="icon-container" id={element.windowToShow} onClick={this.props.unMinimize}><i className="material-icons noselect">{element.icon}</i></a>
                                }
                                else return null;
                            })}
                        </div>
                        <DateTime/>
                    </div>
                </div>
            </div>
        )
    }
}
