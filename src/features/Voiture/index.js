import React from 'react'
import walkSprite from '../../assets/images/player_walk.png'
import {connect} from 'react-redux'
import handleDeplacement from './deplacement'

function Voiture(props) {
    return(
        <div
        style = {{
        position : 'absolute',
        top:props.position[1],
        left:props.position[0],
        backgroundImage:`url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width : '40px',
        height :'40px',
        }}
        />
    )
}

function  mapStateToProps(state) {
    return{
        ...state.voiture,


    }
}
export default connect(mapStateToProps)(handleDeplacement(Voiture))

