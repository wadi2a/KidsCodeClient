import React from 'react'
import walkSprite from '../../assets/images/player_walk.png'
import {connect} from 'react-redux'
function Voiture(props) {
    return(
        <div
        style = {{
        position : 'relative',
        top:props.position[1],
        left:props.position[0],
        backgroundImage:`url('${walkSprite}')`,
        backgroundPosition:'0 0',
        width : '40px',
        height :'40px',
        }}
        />
    )
}

function  mapStateToProps(state) {
    return{
        ...state.voiture,
        position : state.voiture.position,

    }
}
export default connect(mapStateToProps)(Voiture)

