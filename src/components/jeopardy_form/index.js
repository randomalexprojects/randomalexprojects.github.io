import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export const JeopardyForm = ({getData}) => (
  <div className='jeopardy-form-component'>
    <div>
      <a href='https://docs.google.com/spreadsheets/d/1_FvdrAAveGHjV2lllBvM05SvIcrDyJm8xlsZar6HC3Q/edit?usp=sharing'>Use Template</a>
    </div>
    <br />
    <div className='jeopardy-spreadsheet'>
      <input id='spreadsheet-id' type='text' placeholder='Enter Public Google Spreadsheet ID' />
      <button className='jeopardy-button' onClick={getData}>Load</button>
    </div>
  </div>
)

JeopardyForm.propTypes = {
  getData: PropTypes.func.isRequired
}