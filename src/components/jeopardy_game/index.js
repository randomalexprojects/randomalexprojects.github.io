import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

import {JeopardyCard} from '../jeopardy_card'

export const JeopardyGame = ({data, teams, setParentState}) => (
  <div className='jeopardy-game-component'>
    {data.map(({title, items}, columnIndex) => (
      <div className='jeopardy-column' key={`column-${columnIndex}`}>
        <div className='jeopardy-tile jeopardy-title'>{title}</div>
        {items.map((item, itemIndex) => (
          <JeopardyCard
            setParentState={setParentState}
            key={`item-${itemIndex}`}
            item={item}
            itemIndex={itemIndex}
            columnIndex={columnIndex}
            teams={teams}
            data={data}
          />
        ))}
      </div>
    ))}
  </div>
)

JeopardyGame.propTypes = {
  data: PropTypes.array.isRequired,
  teams: PropTypes.object.isRequired,
  setParentState: PropTypes.func.isRequired
}