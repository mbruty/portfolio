import React, { Component } from 'react'
import SettingsModal from './SettingsModal';
import projects from '../../projects.json';
export default class StartModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSettings: false
        }
        this.startRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
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
        console.log(event.target)
        if(this.props.show){
            if (!this.startRef.current.contains(event.target) && event.target.id !== 'start-menu') {
                this.props.toggle();
            }
            if (event.target.id !== 'settings-modal'){
                this.setState({...this.state, showSettings: false});
            }
            if (event.target.id === 'website-redirect'){
                window.open("https://github.com/mbruty/portfolio", "_blank");
            }
        }
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
                        <div className="i-container">
                            <i className="material-icons noselect">account_circle</i>
                        </div>
                    </div>
                </div>
                {this.state.showSettings ? <SettingsModal/> : null}
                <div className="right-bar">
                    <h3 className="noselect">Projects</h3>
                        {projects.map(project => (
                            <div className="entry noselect">
                                <i className="material-icons noselect">{project.icon}</i>
                                {project.name}
                            </div>
                        ))}
                </div>
                
            </div>
        )
    }
}
