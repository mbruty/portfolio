import React, { Component } from 'react'

export default class ContentBox extends Component {

    render() {
        const data = this.props.data;
        const elementWidth = 100 / data.length -0.3;
        if(this.props.width <= 845){
            return (
                <div className="content-box-mob">
                    <div className="bar-pannel">
                        {data.map(element => {
                            return <div className="bar" style={{width: `${elementWidth}%`, height: `${element}%`}}/>
                        })}
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="content-box">
                    <div className="bar-pannel">
                        {data.map(element => {
                            return <div className="bar" style={{width: `${elementWidth}%`, height: `${element}%`}}/>
                        })}
                    </div>
                </div>
            )
        }
    }
}
