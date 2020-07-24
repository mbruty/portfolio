import React, { Component } from 'react'
import Shortener from './Shortener';
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div style={{width: this.props.width, height: this.props.height - 40}}>
        <div class="title">Best</div>
        <div class="title-boxed">Song</div>
        <Shortener/>
      </div>
    )
  }
}
