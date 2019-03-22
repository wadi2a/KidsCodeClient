import React from 'react'
import {SPRITE_SIZE} from "../../config/constants";
import './styles.css'
import {connect} from 'react-redux'
import store from '../../config/store'
import Voiture from '../Voiture'
import logo from "../../assets/images/animationFin.png";
import ReactTestUtils from 'react-dom/test-utils'; // ES6

function getTileSprite(type) {
    switch (type) {
        case 0 :
            return 'terre'
        case 5 :
            return 'rock'
        case 6 :
            return 'tree'
        case 7 :
            return 'route'
        case 1 :
            return 'briqueFin'

    }
}
function MapTile(props) {

    return <div className={`tile ${getTileSprite(props.tile)}`}
                style={{
                height : SPRITE_SIZE,
                width  : SPRITE_SIZE,
                }}
    />

}

function MapRow(props) {

    return <div className="row">
        {
            props.tiles.map(tile => <MapTile tile={tile}/>)
        }
    </div>

}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}


/*function dispatchEventt() {

        let evt = new KeyboardEvent('keydown', {'keyCode': 37, 'which': 37})
        window.dispatchEvent(evt);



}*/


function Map(props) {


    return(
        <div
        style={{
            position : 'relative',
            top:'0px',
            left:'0px',
            width : '1200px',
            height: '560px',
            margin: '10px auto'
        }}>
            {
            props.tiles.map(row => <MapRow tiles={row} />)


            }
            <button id="start" type="button"  style={{ position : 'absolute', top:'0px',left:'1100px', margin: '20px auto'}}className="btn btn-light">Start</button>
            <img   className="animationFin"  src={logo} alt="Animation fin" />

        </div>

    )
}
function mapStateToProps(state) {

    return {
        tiles:state.map.tiles,
    }
}
export default connect(mapStateToProps)(Map)