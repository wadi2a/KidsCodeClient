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









export default class fenetreJeu extends Component {


    checkRouteOk = () => {
        const solution = ["Start", "Left", "Bottom", "Right"];
        var incr=0;
        var res = 0;
        
        this.choix.tasks.forEach((t) => {

            if(t.name !== solution[incr] && res===0){
                res = incr;
            }

            incr++;
        });

        return res;
        
    }

    animate = () => { var animation = new TimelineLite()
        let start = false;

        var incr = 0;
        var verif = this.checkRouteOk();
        var token = 0;
            this.choix.tasks.forEach ((t) => {


                if(verif!==incr || incr===0){
                    if(t.dirXy==="start"){start=true}
                    if(start===true) {
                        if (t.name === "Left") {
                            animation
                                .to(this.box, 2, {x: t.pas})
                        }else if (t.name === "Bottom") {
                            animation
                                .to(this.box, 3, {y: t.pas})
                        }else if (t.name === "Right") {
                            animation
                                .to(this.box, 3, {x: t.pas})
                        }
                    }
                }else{
                    token = 1;
                }

                incr++;
            });


            if(token===1 || incr!==4){
                alert("Les déplacements proposées ne permettent pas de réaliser le parcour");
                window.location.reload();
            }else{
                alert("Bravo vous avez complété le niveau");
            }

    }

    state = {
        tasks: [
            {dirXy:"start",pas:"0",name:"Start",category:"wip", bgcolor: `url(${start})`},
            {dirXy:"x",pas:"320",name:"Right", category:"wip", bgcolor: `url(${right})`},
            {dirXy:"x",pas:"-230",name:"Left", category:"wip", bgcolor:`url(${left})`},
            {dirXy:"x",pas:"430",name:"Top", category:"wip", bgcolor: `url(${up})`},
            {dirXy:"x",pas:"430",name:"Bottom", category:"wip", bgcolor:`url(${down})`}
        ]
    }

    choix = {
        tasks: [

        ]
    }


    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }


    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task) => {
            if (task.name === id) {
                if(task.category==="complete"){this.choix.tasks.pop(task);}
                if(task.category==="wip"){this.choix.tasks.push(task);}
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render() {

        var tasks = {
            wip: [],
            complete: []
        }
        let i = 0;
        this.state.tasks.forEach ((t) => {
            tasks["wip"].push(
                <div key={i++}
                     onDragStart = {(e) => this.onDragStart(e, t.name)}
                     draggable
                     className="draggable"
                     style = {{backgroundImage: t.bgcolor}}
                >
                </div>
            );
        });
        this.choix.tasks.forEach ((t) => {

            tasks["complete"].push(
                <div key={i++}
                     onDragStart = {(e) => this.onDragStart(e, t.name)}
                     draggable
                     className="draggable"
                     style = {{backgroundImage: t.bgcolor}}
                >
                </div>
            );
        });

        return (
            
            <div className="container-drag">
                <div className="wip"
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">Deplacements</span>
                    {tasks.wip}
                </div>

                <BarreDeChoix className="wip2" nomDeTask="Ouadie" task={tasks}/>
                <BarreDeChoix2 className="droppable2" nomDeTask="Ouadie" task={tasks}/>

                    <div className="droppable"
                         onDragOver={(e)=>this.onDragOver(e)}
                         onDrop={(e)=>this.onDrop(e, "complete")}>
                        <span className="task-header">Choix</span>
                        {tasks.complete}
                    </div>

                    <NavAccueil/>
                <div>
                    <div className="container">
                        <div className="cont">
                            <div className="wrapper">
                                <div className="box">

                                </div>
                                {/* <div class="box a"><img className="box" style={styles.box} ref={box => this.box = box} src={logo} alt="Logo" /></div> */}
                                <div className="box b"></div>
                                <div className="box c"><img style={styles.box} ref={box => this.box = box}  src={logo} alt="Logo" /></div>
                                <div onClick={this.animate} className="box start">START</div>
                            </div>
                            <div className="wrapperbis">
                                <div className="box z"></div>
                                <div className="box e"></div>
                                <div className="box z"></div>
                            </div>
                            <div className="wrapper">
                                <div className="box a"></div>
                                <div className="box b"></div>
                                <div className="box c"></div>
                                <div className="box a"></div>
                                <div className="box a"></div>
                                <div className="box end">END</div>
                            </div>
                        </div>
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