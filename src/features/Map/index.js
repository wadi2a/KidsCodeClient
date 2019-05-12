import React from 'react'
import {SPRITE_SIZE} from "../../config/constants";
import './styles.css'
import {connect} from 'react-redux'
import store from '../../config/store'
import Voiture from '../Voiture'
import logo from "../../assets/images/animationFin.png";
import logoB from "../../assets/images/animationFinBug.png";
import coeurRouge from "../../assets/images/CoeurVieRouge.png";
import coeurBlack from "../../assets/images/CoeurVieNoir.png";
import gameOver from "../../assets/images/Game_Over.png";
import ReactTestUtils from 'react-dom/test-utils'; // ES6

import reinit from "../../assets/images/fleche-rond-png-3.png";
import start from "../../assets/images/1rightarrow.png";
import {tiles1} from "../../data/maps/2";
import {tiles2} from "../../data/maps/3";
import VoitureSound from "../../assets/audio/voiture_audiosprite.mp3";
import   jeux from '../../assets/audio/jeux.mp3';
import cle from "../../assets/images/clefOublier.png";
import play from "../../assets/images/1rightarrow2.png";
import stop from "../../assets/images/1rightarrowstop.png";
import score from "../../assets/images/score.png";
import {TimelineMax} from "gsap";
let sound;
let playPass=true;
sound = new Audio(jeux);
sound.volume = 0.1;
sound.repeatDelay=true;

function playStop() {
    if(playPass){

            let tl = new TimelineMax();
            tl.to(".play",  1, {zIndex:1});
            document.getElementById("play").setAttribute("src", stop);
        playPass=false;
            sound.volume=0;
        }else{
        let tl = new TimelineMax();
        tl.to(".play",  1, {zIndex:1});
        document.getElementById("play").setAttribute("src", play);
        playPass = true;
        sound.volume=0.1;
    }

}
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
function mise() {

    store.dispatch({type : 'ADD_TILES',payload : {
            tiles:tiles1,
            scoreMin:store.getState().map.scoreMin,
            gain:store.getState().map.gain,
        }})
    store.dispatch({
        type : 'MOVE_VOITURE',
        payload:{

            position: [1120,160],
            spriteLocation: '0px 160px',
            direction: 'WEST',
            depIndex: 0,
            taskChoix : [],
            score:store.getState().voiture.score,
            nbVie : store.getState().voiture.nbVie,
        }
    })
}
function mise2() {

    store.dispatch({type : 'ADD_TILES',payload : {
            tiles:tiles2,
            scoreMin:store.getState().map.scoreMin,
            gain:store.getState().map.gain,
        }})
    store.dispatch({
        type : 'MOVE_VOITURE',
        payload:{

            position: [1120,160],
            spriteLocation: '0px 160px',
            direction: 'WEST',
            depIndex: 0,
            taskChoix : [],
            score:store.getState().voiture.score,
            nbVie : store.getState().voiture.nbVie,
        }
    })
}

/*function dispatchEventt() {

        let evt = new KeyboardEvent('keydown', {'keyCode': 37, 'which': 37})
        window.dispatchEvent(evt);



}*/


function Map(props) {


    sound.play();
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

            <img  alt="cle" className="cle" id="cle" style={{opacity:0,position : 'absolute',zIndex:0, top:'-112px',left:'26px', margin: '20px auto'}} src={cle}/>
        <button type="button" onClick={playStop.bind(this)}className="play" > <img alt="play" className="play" id="play" style={{opacity:1,position : 'absolute',zIndex:2, top:'-103px',right:'5px',  margin: '20px auto'}} src={play}/></button>
            <div><img alt="score" className="score"  style={{opacity:1,position : 'absolute',zIndex:1, top:'6px',right:'-17px', width:'75px', margin: '20px auto'}} src={score}/><p style={{opacity:1,position : 'absolute',fontWeight:600,fontSize:'120%',zIndex:1, top:'32px',right:'-14px', width:'75px', margin: '20px auto'}}id="score">0</p></div>
            <div className="groupeCoeur">
                <img   id="coeur4"  src={coeurBlack} alt="coeur1" />
                <img   id="coeur5"  src={coeurBlack} alt="coeur2" />
                <img   id="coeur6"  src={coeurBlack} alt="coeur3" />
            </div>

            <div className="groupeCoeur">
                <img   id="coeur1"  src={coeurRouge} alt="coeur1" />
                <img   id="coeur2"  src={coeurRouge} alt="coeur2" />
                <img   id="coeur3"  src={coeurRouge} alt="coeur3" />
            </div>
            <img   className="gameOver"  src={gameOver} alt="gameOver" />
            <button  type="button"  style={{ width:'85px',height:'85px', background:'#fafafa', boxShadow:'2px 2px 8px #aaa', font:'bold 13px Arial',borderRadius:'50%', color:'#555',position : 'absolute', top:'0px',left:'1049px', margin: '20px auto'}} > <img id="start" style={{width : '50px'}} src={start} alt="start" />             </button>
            <button type="button"  style={{ width:'85px',height:'85px', background:'#fafafa', boxShadow:'2px 2px 8px #aaa', font:'bold 13px Arial',borderRadius:'50%', color:'#555',position : 'absolute', top:'0px',left:'122px', margin: '20px auto'}} ><img id="Reinit"  style={{width : '50px'}} src={reinit} alt="reinitialisation" /></button>
            <button onClick={mise.bind(this)} type="button"  style={{ width:'80px',height:'35px', background:'#fafafa', boxShadow:'2px 2px 8px #aaa', font:'bold 13px Arial',borderRadius:'00%', color:'#555',position : 'absolute', top:'90px',left:'1000px', margin: '20px auto'}} >map suivant</button>
            <button onClick={mise2.bind(this)} type="button"  style={{ width:'80px',height:'35px', background:'#fafafa', boxShadow:'2px 2px 8px #aaa', font:'bold 13px Arial',borderRadius:'00%', color:'#555',position : 'absolute', top:'90px',left:'122px', margin: '20px auto'}} >map precedent </button>


            <img   className="animationFin"  src={logo} alt="Animation fin" />
            <img   className="animationFinbug"  src={logoB} alt="Animation fin" />
        </div>

    )
}
function mapStateToProps(state) {

    return {
        tiles:state.map.tiles,
        gain :state.map.gain,
        scoreMin:state.map.scoreMin,
    }
}
export default connect(mapStateToProps)(Map)