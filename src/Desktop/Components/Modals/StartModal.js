import React, { Component } from 'react'
import SettingsModal from './SettingsModal';
import projects from '../../../projects.json';
import otherProjects from '../../../other-projects.json';

export default class StartModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSettings: false,
            showProfile: false
        }
        this.startRef = React.createRef();
        this.showAbout = this.showAbout.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.showWindow = this.showWindow.bind(this);
    }

    //Adding event listners to detect a click outside of the start
    //and close the start StartModal
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if(this.props.show){
            if (!this.startRef.current.contains(event.target) && event.target.id !== 'start-menu') {
                this.props.toggle();
            }
            if (event.target.id !== 'settings-modal'){
                this.setState({...this.state, showSettings: false});
            }
            if (event.target.id !== 'profile-modal' && event.target.id !== 'profile'){
                this.setState({...this.state, showProfile: false});
            }
            if (event.target.id === 'website-redirect'){
                window.open("https://github.com/mbruty/portfolio", "_blank");
            }
        }
    }

    showWindow(e){
        let name = e.target.innerText.split(' ');
        this.props.showWindow(name.slice(1).join(' '));
        this.props.toggle();
    }

    showAbout(e){
        this.props.showWindow(e.target.innerText);
    }

    renderModal(){
        if(this.state.showProfile){
            return (
                <div className="context-modal" id="profile-modal" style={{bottom: 2, height: '8%'}}>
                    <div className="modal-item noselect" id="profile" style={{height: '80%'}} onClick={this.props.show}>
                        Contact Me
                    </div>
                </div>
            )
        }
        else return null;
    }

    render() {
        if(!this.props.show) return null;
        return (
            <div id="start-modal" className="start-modal" ref={this.startRef}>
                <div className="left-bar">
                    <div className="icons">
                        <div className="i-container" onClick={() => {this.setState({...this.state, showSettings: true})}}>
                            <i className="material-icons noselect">settings</i>
                        </div>
                        <div className="i-container" onClick={() => {this.setState({...this.state, showProfile: true})}}>
                            <i className="material-icons noselect">account_circle</i>
                        </div>
                    </div>
                </div>
                {this.state.showSettings ? <SettingsModal/> : null}
                {this.renderModal()}
                <div className="right-bar">
                    <h3 className="noselect">Projects</h3>
                        {projects.map(project => (
                            <div className="entry noselect" onClick={this.showWindow}>
                                <i className="material-icons noselect">{project.icon}</i>
                                {" " + project.shortName}
                            </div>
                        ))}
                    <h3 className="noselect">Non-Web Projects</h3>
                        {otherProjects.map(project => (
                            <div className="entry noselect" onClick={this.showWindow}>
                                <i className="material-icons noselect">{project.icon}</i>
                                {" " + project.shortName}
                            </div>
                        ))}
                </div>
                
            </div>
        )
    }
}
