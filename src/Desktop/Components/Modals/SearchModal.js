import React, { Component } from 'react'
import WebProjects from '../../../projects.json';
import OtherProjects from '../../../other-projects.json';
export default class SearchModal extends Component {

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.renderResults = this.renderResults.bind(this);
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
            if (!this.searchRef.current.contains(event.target)) {
                this.props.toggle({type: "toggle"});
            }
        }
    }

    showWindow(e){
        let name = e.target.innerText.split(' ');
        this.props.showWindow(name.slice(1).join(' '));
        this.props.toggle({type: "toggle"});
    }

    renderResults(){
        let projects = WebProjects.concat(OtherProjects);
        let render = projects.map(project => {
            if(project.name.toLowerCase().includes(this.props.search) || project.language.toLowerCase().includes(this.props.search)){
                return (
                <div className="entry noselect" onClick={this.showWindow}>
                    <i className="material-icons noselect">{project.icon}</i>
                    {" " + project.shortName}
                </div>
                )
            }
        })
        return render;
    }

    render() {
        if(!this.props.show) return null;
        else{
            return (
                <div className="search-modal noselect" ref={this.searchRef}>
                    <h3>Results for {this.props.search}</h3>
                    {this.renderResults()}
                </div>
            )
        }
    }
}
