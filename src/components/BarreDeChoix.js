
import React, { Component } from 'react';


export default class BarreDeChoix extends Component {

    constructor(props) {
        super(props);


            this.state.tasks = props.task;

    }

    state = {
        tasks: [

        ]
    }

    onDragStart = (ev, task) => {
        console.log('dragstart:',task);
        ev.dataTransfer.setData("task", task);
    }


    render() {
        let tasks = {
            wip: [],

        }
        let i = 0;
        this.state.tasks.forEach ((t) => {
            tasks["wip"].push(
                <div key={t.name}

                     onDragStart = {(e) => this.onDragStart(e, t.name)}
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


