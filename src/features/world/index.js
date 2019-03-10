import React from 'react'
import Map from '../Map'
import Voiture from '../Voiture'
import {tiles} from '../../data/maps/1'
import store from '../../config/store'
function World(props) {
    store.dispatch({type : 'ADD_TILES',payload : {
        tiles,
        }})
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