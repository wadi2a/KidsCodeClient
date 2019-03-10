
import React, { Component } from 'react';
import logo from "../assets/images/kart.png";
import {TimelineLite} from "gsap";


export default class Voiture extends Component {
    state = {
        tasksChoisie: [

        ],
        solution:[

        ]
    }

    constructor(props) {
        super(props);
        this.state.tasksChoisie = props.tasksChoisie;
    }


    deplacement = (xDep) => { var animation = new TimelineLite()
        animation
            .to(this.box, 2, {x:100})
    }

    render() {

        return (

            <img onClick={this.deplacement.bind(this)}  ref={box => this.box = box} style={styles.box}   src={logo} alt="Logo" />

        );
    }
}

const styles = {

    box: {
    }
}
