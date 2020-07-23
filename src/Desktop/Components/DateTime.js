import React, { Component } from 'react'

export default class DateTime extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
        setInterval(() => { this.updateDate() }, 500);
        this.updateDate = this.updateDate.bind(this);
    }

    updateDate(){
        let newDate = new Date();
        if(newDate.getMinutes() !== this.state.date.getMinutes()){
            this.setState({date: newDate});
        }
    }
    render() {
        return (
            <div class="right">
                <div class="datetime">
                    <span class="hour">
                        {`${this.state.date.getHours()} : ${this.state.date.getMinutes() < 10 ? '0' + this.state.date.getMinutes() : this.state.date.getMinutes()}`}
                    </span>
                    <span class="date">
                        {`${this.state.date.getDate()}/${this.state.date.getMonth() + 1}/${this.state.date.getFullYear()}`}
                    </span>
                </div>
            </div>
        )
    }
}
