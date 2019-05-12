
import React, { Component } from 'react';
import {dataBlock} from '../data/blocks'

export default class BarreDeChoix extends Component {

    constructor(props) {
        super(props);


            this.state.tasks = dataBlock;

    }

    state = {
        tasks: [

        ]
    }

    onDragStart = (ev, task,index) => {
        console.log('dragstart:',task);
        ev.dataTransfer.setData("task", task);
        ev.dataTransfer.setData("index", index);
    }


    render() {
        let tasks = {
            wip: [],

        }
        let i = 0;
        this.state.tasks.forEach ((t) => {
            i++
            tasks["wip"].push(
                <div key={t.name}

                     onDragStart = {(e) => this.onDragStart(e, t.name,i)}
                     draggable
                     className="draggable"
                     style = {{backgroundImage: t.bgcolor}}
                >
                </div>
            );
        });
        return (

            <div className="wip">

               {tasks.wip}
            </div>

        );
    }
}


