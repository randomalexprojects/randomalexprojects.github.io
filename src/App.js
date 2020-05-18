import _ from 'lodash'
import React, { Component } from 'react'

import {Footer} from './components/footer/index'
import {JeopardyForm} from './components/jeopardy_form'
import {JeopardyGame} from './components/jeopardy_game'

import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      data: [],
      teams: {}
    }
    this.getData = this.getData.bind(this)
    this.setParentState = this.setParentState.bind(this)
    this.createTeam = this.createTeam.bind(this)
    this.exit = this.exit.bind(this)
  }

  /**
   * Retrieves data for given Google Spreadsheet URL
   */
  async getData (e) {
    const spreadsheetId = document.getElementById('spreadsheet-id').value
      ? document.getElementById('spreadsheet-id').value
      : '1_FvdrAAveGHjV2lllBvM05SvIcrDyJm8xlsZar6HC3Q'
    const url = `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/1/public/full?alt=json`
    try {
      const response = await fetch(url)
      const responseJson = await response.json()
      if (_.isArray(_.get(responseJson, 'feed.entry'))) {
        const data = []
        let column = {items: []}
        _
          .chain(responseJson)
          .get('feed.entry', [])
          .groupBy(cell => _.get(cell, 'gs$cell.row'))
          .values()
          .forEach((row, index) => {
            // A row with a single cell indicates a category title
            if (_.size(row) === 1) {
              // If items already exist in column, we need to reset it for this new category
              if (column.title && !_.isEmpty(column.items)) {
                data.push(column)
                column = {items: []}
              }
              column.title = _.get(_.head(row), 'content.$t', '')
            } else {
              // Otherwise, this row is a value, question, answer and needs to be pushed to column.items
              column.items.push({
                value: _.get(row, '0.content.$t', ''),
                question: _.get(row, '1.content.$t', ''),
                answer: _.get(row, '2.content.$t', ''),
                dailydouble: _.get(row, '3.content.$t', '') === 'DAILY DOUBLE'
              })
            }
          })
          .value()
        // Push the last column
        data.push(column)
        this.setState({data})
      } else {
        throw new Error(`Invalid data response for ${url}`)
      }
    } catch (err) {
      alert(err)
    }
  }

  /**
   * Updates this.state for parent App container
   */
  setParentState (newState, callback = () => {}) {
    this.setState(newState, callback)
  }

  /**
   * Resets this.state to default exiting to app "homepage"
   */
  exit () {
    this.setState({data: [], teams: {}})
  }

  /**
   * Pushes new team to this.state teams object
   */
  createTeam () {
    const name = document.getElementById('create-team').value
    if (name) {
      this.setState({teams: _.merge({}, this.state.teams, {[name]: 0})})
    }
  }

  render() {
    return (
      <div className='app'>
        {_.isEmpty(this.state.data)
          ? <JeopardyForm getData={this.getData} />
          : (
            <JeopardyGame
              data={this.state.data}
              teams={this.state.teams}
              setParentState={this.setParentState}
            />
          )
        }
        <Footer
          data={this.state.data}
          teams={this.state.teams}
          createTeam={this.createTeam}
          exit={this.exit}
        />
      </div>
    )
  }
}

export default App;
