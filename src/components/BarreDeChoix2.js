
import React, { Component } from 'react';
import {dataBlock} from '../data/blocks'
import Voiture from './Voiture';
import store from "../config/store";
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

    onClick = (ev, tas) => {
        console.log('dragstart:',tas);


        let blocks = this.state.tasks.filter((task) => {
            if (task.name !== tas) {

                return task;
            }


        });
        this.setState({tasks : blocks

        });
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
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
            }
        })

    }


    render() {

        let tasks = {
            complete: [],

        }
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


