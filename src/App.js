import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {NAVIGATION} from './constants/navigation'

class App extends Component {
  constructor () {
    super()
    this.updatePage = this.updatePage.bind(this)
    this.state = {
      page: NAVIGATION.HOME
    }
  }

  updatePage (e) {
    this.setState({page: e.target.id})
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className='app-header-nav'>
            <p id={NAVIGATION.HOME} onClick={this.updatePage}>Home</p>
            <p id={NAVIGATION.ABOUT} onClick={this.updatePage}>About Us</p>
            <p id={NAVIGATION.DETAILS} onClick={this.updatePage}>Wedding Details</p>
            <p id={NAVIGATION.ACCOMMODATIONS} onClick={this.updatePage}>Accommodations</p>
            <p id={NAVIGATION.WEDDING} onClick={this.updatePage}>Wedding Party</p>
          </div>
        </div>
        <div className="app-content">
          {this.state.page === NAVIGATION.HOME && (
            <div className='page'>HOME</div>
          )}
          {this.state.page === NAVIGATION.ABOUT && (
            <div className='page'>ABOUT</div>
          )}
          {this.state.page === NAVIGATION.DETAILS && (
            <div className='page'>DETAILS</div>
          )}
          {this.state.page === NAVIGATION.ACCOMMODATIONS && (
            <div className='page'>ACCOMMODATIONS</div>
          )}
          {this.state.page === NAVIGATION.WEDDING && (
            <div className='page'>WEDDING</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
