
import React, { Component } from 'react';
import start from "../assets/images/start.png";
import right from "../assets/images/right.png";
import left from "../assets/images/left.png";
import up from "../assets/images/up.png";
import down from "../assets/images/down.png";
import createWithBsPrefix from "react-bootstrap/es/utils/createWithBsPrefix";

export default class BarreDeChoix2 extends Component {



    state = {
        tasks: [

        ],
        choix:[
            {dirXy:"start",pas:"0",name:"Start",category:"complete", bgcolor: `url(${start})`},
            {dirXy:"x",pas:"320",name:"Right", category:"complete", bgcolor: `url(${right})`},
            {dirXy:"x",pas:"-230",name:"Left", category:"complete", bgcolor:`url(${left})`},
            {dirXy:"x",pas:"430",name:"Top", category:"complete", bgcolor: `url(${up})`},
            {dirXy:"x",pas:"430",name:"Bottom", category:"complete", bgcolor:`url(${down})`}
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
        return (

            <div className="droppable2"
                 onDragOver={(e)=>this.onDragOver(e)}
                 onDrop={(e)=>{this.onDrop(e,"complete")}}>
                <span className="task-header">Choix1</span>
                {tasks.complete}
            </div>

        );
    }
}


