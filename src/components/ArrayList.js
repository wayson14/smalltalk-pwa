import React from 'react'

const ArrayList = ({array}) => {
  return (
    <>{array && 
        <div>
            {array.map(el => {
                return <div key={el}>{el}</div>
            })}
        </div>}
    </>
  )
}

export default ArrayList