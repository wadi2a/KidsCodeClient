import React from 'react'
import Map from '../Map'
import Voiture from '../Voiture'

function World(props) {
    return(
         <div
            style={{
                position : 'relative',
                width : '800px',
                height: '400px',
                margin: '20px auto',
            }}
        >
        <Map/>
        <Voiture/>
        </div>
    )
}

export default World