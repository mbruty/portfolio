import React, { Component } from 'react'

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        setInterval(() => { this.updateDate() }, 500);
        this.updateDate = this.updateDate.bind(this);
        this.options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
    }

    updateDate(){
        let newDate = new Date();
        if(newDate.getMinutes() !== this.state.date.getMinutes()){
            this.setState({date: newDate});
        }
    }

    render() {
        return (
                <div className="base-wrapper">
                    <div className="mobile-base">
                        <div className="date-container">
                            <span className="time">{`${this.state.date.getHours()}: ${this.state.date.getMinutes() < 10 ? '0' + this.state.date.getMinutes() : this.state.date.getMinutes()}`}</span>
                            <span class="date">
                                {`${this.state.date.toLocaleDateString("en-US", this.options)}`}
                            </span>
                        </div>
                    </div>
                </div>
        )
    }
}
