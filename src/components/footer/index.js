import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export const Footer = ({data, teams, createTeam, exit}) => (
  <div className='footer-component'>
    <input id='create-team' type='text' placeholder='Enter Team Name' />
    <button className='jeopardy-button' onClick={createTeam}>
      Create Team
    </button>
    {_.map(teams, (score, name) => (
      <div className='team' key={`team-footer-${name}`}>
        <div className='team-name'>{name}</div>
        <div className={`team-score ${score >= 0 ? 'positive' : 'negative'}`}>${score}</div>
      </div>
    ))}
    {!_.isEmpty(data) && (
      <div className='button-exit'>
        <button className='jeopardy-button' onClick={exit}>
          Exit
        </button>
      </div>
    )}
  </div>
)

Footer.propTypes = {
  data: PropTypes.array.isRequired,
  teams: PropTypes.object.isRequired,
  createTeam: PropTypes.func.isRequired,
  exit: PropTypes.func.isRequired
}