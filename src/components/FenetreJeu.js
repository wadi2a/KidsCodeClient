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
import Voiture from '../features/Voiture';








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
                        <Voiture/>

                        <BarreDeChoix  task={this.state.tasks}/>
                        <BarreDeChoix2 sendData={this.getDataChoix2.bind(this)} className="droppable2" nomDeTask="Ouadie" task={this.state.tasks}/>

                        <div className="cont">
                            <button onClick={this.deplacement.bind(this)} className="btn btn-primary btn-lg"><span
                                className="glyphicon glyphicon-user"> Valider votre choix</span></button>
                            <div className="wrapper">

                                <div className="box">

                                </div>
                                  <div className="box b"></div>
                                <div className="box c"><img onClick={this.animate} style={styles.box} ref={box => this.box = box}  src={logo} alt="Logo" /></div>

                                <div  className="box start">START</div>
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