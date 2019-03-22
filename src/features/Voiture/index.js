import React from 'react'
import walkSprite from '../../assets/images/player_walk.png'
import {connect} from 'react-redux'
import handleDeplacement from './deplacement'
import store from "../../config/store";
import {dataBlock} from "../../data/blocks";



class  Voiture extends React.Component {

    constructor(props) {
        super(props);



    }
    render() {
        let tasks = {
            complete: [],

        }

        let i = 0;
    return(
        <div className="Voit"
             style = {{
        position : 'absolute',
        top:this.props.position[1],
        left:this.props.position[0],
        backgroundImage:`url('${walkSprite}')`,
        backgroundPosition: this.props.spriteLocation,
        width : '80px',
        height :'80px',
        }}
        />
    )}
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

