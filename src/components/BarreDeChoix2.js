
import React, { Component } from 'react';
import {dataBlock} from '../data/blocks'
import Voiture from './Voiture';
import store from "../config/store";
import bip from '../assets/audio/beep-25.mp3';

import bip2 from '../assets/audio/button-14.mp3';
const sound = new Audio(bip);
const sound2 = new Audio(bip2);
export default class BarreDeChoix2 extends Component {


    constructor(props) {
        super(props);


        this.state.choix = dataBlock;

    }
     sendDataParent(val){
        this.props.sendData(val);

    }

   notreChoix (){
        return this.state;
    };

    state = {
        tasks: [

        ],
        choix:[

        ]
    }

     reuinit()  {
        this.setState({tasks : []  });
    }

    onClick = (ev, tas) => {
        console.log('dragstart:',tas);
        sound2.volume = 1;

        sound2.play();

        let blocks = this.state.tasks.filter((task) => {
            if (task.name !== tas) {

                return task;
            }


        });
        this.setState({tasks : blocks

        });
        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{
                position : store.getState().voiture.position,
                direction :store.getState().voiture.direction,
                depIndex:store.getState().voiture.depIndex,
                spriteLocation : store.getState().voiture.spriteLocation,
                taskChoix :blocks,
                score:store.getState().voiture.score,
                nbVie : store.getState().voiture.nbVie,
            }
        })
    }


    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        sound.volume = 1;

        sound.play();

        let block = ev.dataTransfer.getData("task");

        let blocks = this.state.choix.filter((task) => {
            if (task.name === block) {


                task.category = cat;
                console.log('drop:',task);
                return task;
            }


        });
        console.log('dropi:',blocks.concat(this.state.tasks));
        this.setState({tasks : this.state.tasks.concat(blocks)

        });
        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{
                position : store.getState().voiture.position,
                direction :store.getState().voiture.direction,
                depIndex:store.getState().voiture.depIndex,
                spriteLocation : store.getState().voiture.spriteLocation,
                taskChoix : this.state.tasks.concat(blocks),
                score:store.getState().voiture.score,
                nbVie : store.getState().voiture.nbVie,
            }
        })

    }


    render() {

        let tasks = {
            complete: [],

        }
        window.addEventListener('click',(e)=>{
            if (e.target["id"]==="Reinit"|| e.target["id"]==="maps"||e.target["id"]==="mapp" ) {
                this.reuinit()
            }
        })
        let i = 0;
        this.state.tasks.forEach ((t) => {
            tasks["complete"].push(
                <div key={t.name}

                     onClick = {(e) => this.onClick(e, t.name)}
                     draggable
                     className="draggable"
                     style = {{backgroundImage: t.bgcolor}}
                >
                </div>
            );
        });
        this.sendDataParent(this.state.tasks);

        return (

            <div className="droppable"
                 onDragOver={(e)=>this.onDragOver(e)}
                 onDrop={(e)=>{this.onDrop(e,"complete")}}>

                {tasks.complete}
            </div>

        );
    }
}


