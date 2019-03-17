import React from 'react'
import walkSprite from '../../assets/images/player_walk.png'
import {connect} from 'react-redux'
import handleDeplacement from './deplacement'
import store from "../../config/store";



function Voiture(props) {

    return(
        <div className="Voit"
             style = {{
        position : 'absolute',
        top:props.position[1],
        left:props.position[0],
        backgroundImage:`url('${walkSprite}')`,
        backgroundPosition: props.spriteLocation,
        width : '80px',
        height :'80px',
        }}
        />
    )
}

function  mapStateToProps(state) {
    return{
        ...state.voiture,



    }
}


const styles = {

    box: {

    },
}

export default connect(mapStateToProps)(handleDeplacement(Voiture))

