import React from 'react'

function History({ history }) {
  return (
    <div>
      <h2>HISTORY</h2>
      {history.map((entry, index) => (
        <div key={index}>{entry}</div>
      ))}
    </div>
  )
}

export default History
