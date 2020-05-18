import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'
import soundfile from '../../Jeopardy Daily Double - Sound Effect.mp3'

export class JeopardyCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: false,
      revealed: false,
      dailydouble: props.item.dailydouble,
      betAmount: 0
    }
    this.toggleSelected = this.toggleSelected.bind(this)
    this.toggleDailyDouble = this.toggleDailyDouble.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
    this.updateScore = this.updateScore.bind(this)
  }

  /**
   * Updates JeopardyCard to be selected, optionally triggers Jeopardy Daily Double sound
   */
  toggleSelected (e) {
    e.preventDefault()
    this.setState({
      selected: !this.state.selected,
      dailydouble: this.props.item.dailydouble
    })
    // Only initiate dailydouble sound effect when toggling selected to true (e.g. opening card)
    if (this.props.item.dailydouble && !this.state.selected === true) {
      let audio = new Audio(soundfile);
      audio.play()
    }
  }

  /**
   * Updates to toggle revealed state (shows answer or question)
   */
  toggleShow (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({revealed: !this.state.revealed})
  }

  /**
   * Updates to toggle dailydouble state (continues to question screen)
   * Sets bet amount for update-score buttons
   */
  toggleDailyDouble (e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      dailydouble: !this.state.dailydouble,
      betAmount: Number(document.getElementById('daily-double').value)
    })
  }

  /**
   * Updates this.state.teams for given team with value for this JeopardyCard
   *
   * @param {String} name
   * @param {Number} value
   */
  updateScore (name, value) {
    this.props.setParentState({
      teams: _.merge({}, this.props.teams, {[name]: this.props.teams[name] + value}),
      data: _.map(this.props.data, (column, columnIndex) => {
        return _.merge({}, column, {
          items: columnIndex !== this.props.columnIndex
            ? column.items
            : _.map(column.items, (item, itemIndex) => {
              return itemIndex !== this.props.itemIndex
                ? item
                : _.merge({}, item, {hideValue: true})
            })
        })
      })
    }, () => {
      this.setState({
        betAmount: 0,
        selected: !this.state.selected
      })
    })
  }

  render() {
    const updatedValue = this.state.betAmount ? this.state.betAmount : this.props.item.value
    return (
      <div
        className={`jeopardy-card-component jeopardy-tile ${this.state.selected ? 'full-screen' : ''}`}
        onClick={this.state.selected ? () => {} : this.toggleSelected}
      >
        {this.state.selected
          ? (
            <div>
              {this.state.dailydouble
                ? (
                  <div className='daily-double'>
                    DAILY DOUBLE
                    <div>
                      <input id='daily-double' type='text' placeholder='Enter Wager Amount' />
                      <button className='jeopardy-button' onClick={this.toggleDailyDouble}>
                        Bet
                      </button>
                    </div>
                  </div>
                )
                : (
                  <div>
                    <div>{this.state.revealed ? this.props.item.answer : this.props.item.question}</div>
                    <div className='buttons'>
                      <button className='jeopardy-button' onClick={this.toggleSelected}>Close</button>
                      <button className='jeopardy-button button-reveal' onClick={this.toggleShow}>{this.state.revealed ? 'Show Question' : 'Show Answer'}</button>
                      {_.map(this.props.teams, (score, name) => (
                        <div className='jeopardy-card-teams' key={`jeopardy-card-team-${name}`}>
                          {name}
                          <button
                            className='jeopardy-button button-update-score'
                            onClick={() => this.updateScore(name, Number(updatedValue))}
                          >
                            +
                          </button>
                          <button
                            className='jeopardy-button button-update-score'
                            onClick={() => this.updateScore(name, -Number(updatedValue))}
                          >
                            -
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
            </div>
          )
          : <div>{this.props.item.hideValue ? null : `$${this.props.item.value}`}</div>
        }
      </div>
    )
  }
}

JeopardyCard.propTypes = {
  data: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired
}