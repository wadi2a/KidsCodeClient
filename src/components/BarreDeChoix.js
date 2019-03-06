
import React, { Component } from 'react';
import start from "../assets/images/start.png";
import right from "../assets/images/right.png";
import left from "../assets/images/left.png";
import up from "../assets/images/up.png";
import down from "../assets/images/down.png";
import createWithBsPrefix from "react-bootstrap/es/utils/createWithBsPrefix";

export default class BarreDeChoix extends Component {



    state = {
        tasks: [
            {dirXy:"start",pas:"0",name:"Start",category:"wip", bgcolor: `url(${start})`},
            {dirXy:"x",pas:"320",name:"Right", category:"wip", bgcolor: `url(${right})`},
            {dirXy:"x",pas:"-230",name:"Left", category:"wip", bgcolor:`url(${left})`},
            {dirXy:"x",pas:"430",name:"Top", category:"wip", bgcolor: `url(${up})`},
            {dirXy:"x",pas:"430",name:"Bottom", category:"wip", bgcolor:`url(${down})`}
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

            <div className="wip2">
                <span className="task-header">{this.props.nomDeTask}</span>
               {tasks.wip}
            </div>

        );
    }
}


