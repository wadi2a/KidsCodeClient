import React from 'react'
import Map from '../Map'
import Voiture from '../Voiture'

import {tiles} from '../../data/maps/1'
import {tiles1} from '../../data/maps/2'
import store from '../../config/store'
import BarreDeChoix from "../../components/BarreDeChoix";
import BarreDeChoix2 from "../../components/BarreDeChoix2";

function World(props) {
    store.dispatch({type : 'ADD_TILES',payload : {
        tiles,
        }})


    return(
         <div
            style={{
                position : 'relative',
                width : '1200px',
                height: '560px',
                margin: '20px auto',
            }}
        >    <BarreDeChoix  task={props.task}/>
             <BarreDeChoix2 sendData={props.sendData}  className="droppable2" nomDeTask="Ouadie" task={props.task}/>

             <Map/>

        <Voiture/> 
        </div>
    )
}

export default World