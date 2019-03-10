
import React, { Component } from 'react';
import logo from "../assets/images/kart.png";
import {TimelineLite} from "gsap";
import BarreDeChoix2 from './BarreDeChoix2';

export default class Voiture extends Component {
    deplacementVoiture = {
        tasksChoisie: [

        ],
        solution:[

        ]
    }

    constructor(props) {
        super(props);

    }


    deplacement = () => { var animation = new TimelineLite()

        this.deplacementVoiture.tasksChoisie = this.props.tasksChoisie;
        styles.box.width;
        this.deplacementVoiture.tasksChoisie.forEach((t)=>{
            if(t.dirXy="x") {
                animation
                    .to(this.box, 2, {x:styles.button.width})

            }
        })

    }

    render() {

        return (

            <img onClick={this.deplacement.bind(this)}  ref={box => this.box = box} style={styles.box}   src={logo} alt="Logo" />

        );
    }
}


const styles = {
    button: {
        width: 2000,
        height: 45,
        border: 'none',
        outline: 'none',
    },
    container: {
        padding: 100,
    },
    box: {
        width: 100,
    }
}