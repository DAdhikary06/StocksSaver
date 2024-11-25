import React from 'react'
import {PulseLoader} from 'react-spinners'

const Spinner = () => {
  return (
    <div className='loading-overlay'>
        <div className="loading-square">
            <PulseLoader color="rgb(72 137 232)" loading={true} size={15} />
        </div>
    </div>
  )
}

export default Spinner