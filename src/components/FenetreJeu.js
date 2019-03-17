import React, { Component } from 'react';
import '../assets/css/kidsIndex.css';
import { TimelineLite } from 'gsap';
import logo from '../assets/images/kart.png';
import start from '../assets/images/start.png';
import up from '../assets/images/up.png';
import down from '../assets/images/down.png';
import left from '../assets/images/left.png';
import right from '../assets/images/right.png';
import NavAccueil from './BarreNavigation/barreNavAccueil';
import BarreDeChoix from './BarreDeChoix';
import BarreDeChoix2 from './BarreDeChoix2';
import World from '../features/world';
import Voiture from "../features/Voiture";
import store from '../config/store'

import handleDeplacement from '../features/Voiture/deplacement'







export default class fenetreJeu extends Component {
    choix2 = {
        tasks: [

        ]
    }



    getDataChoix2 = (val)=>{
        this.choix2.tasks = val;

         return val;
    }


    animate = () => { var animation = new TimelineLite()
        animation
           .to(this.box, 2, {x:300})
    }
    deplacement = ()=>{
        this.setState({choix : this.choix2.tasks
        });

    }
    state = {
        tasks: [
            {dirXy:"start",pas:"0",name:"Start",category:"wip", bgcolor: `url(${start})`},
            {dirXy:"x",pas:"320",name:"Right", category:"wip", bgcolor: `url(${right})`},
            {dirXy:"x",pas:"-230",name:"Left", category:"wip", bgcolor:`url(${left})`},
            {dirXy:"x",pas:"430",name:"Top", category:"wip", bgcolor: `url(${up})`},
            {dirXy:"x",pas:"430",name:"Bottom", category:"wip", bgcolor:`url(${down})`}
        ],
        choix:[

        ]
    }






    render() {

        return (

            <div className="container-drag">



                <NavAccueil/>

                <div className="interface">
                    <div className="container">

                        <World onClick={this.deplacement.bind(this)} choix={this.state.choix} task= {this.state.tasks} sendData={this.getDataChoix2.bind(this)} />


                    </div>
                </div>



            </div>
        );
    }
}



const styles = {
    button: {
        width: 200,
        height: 45,
        border: 'none',
        outline: 'none',
    },
    container: {
        padding: 100,
    },
    box: {
    }
}