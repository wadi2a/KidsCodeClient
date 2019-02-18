import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { TimelineLite } from 'gsap';
import logo from './kart.png';
import start from './start.png';
import up from './up.png';
import down from './down.png';
import right from './left.png';
import left from './right.png';



export default class AppDragDropDemo extends Component {

    animate = () => {
        var animation = new TimelineLite()
        animation
          .to(this.box, 1, { x: -120 })
          .to(this.box, 1, { x: -230 })
          .to(this.box, 1, { y: 100 })
          .to(this.box, 1, { y: 210 })
          .to(this.box, 1, { y: 320 })
          .to(this.box, 1, { y: 430 })
          .to(this.box, 1, { x: -120 })
          .to(this.box, 1, { x: 0 })
          .to(this.box, 1, { x: 120 })
          .to(this.box, 1, { x: 220 })
          .to(this.box, 1, { x: 320 })
      }

    state = {
        tasks: [
            {name:"Start",category:"wip", bgcolor: `url(${start})`},
            {name:"Right", category:"wip", bgcolor: `url(${right})`},
            {name:"Left", category:"wip", bgcolor:`url(${left})`},
            {name:"Top", category:"wip", bgcolor: `url(${up})`},
            {name:"Bottom", category:"wip", bgcolor:`url(${down})`}
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
           if (task.name == id) {
               if(task.category=="complete"){this.choix.tasks.pop(task);}
               if(task.category=="wip"){this.choix.tasks.push(task);}
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
                <div>
                    <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">Choix</span>
                     {tasks.complete}
                </div>
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">KidsCode</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Statistiques</a></li>
              <li><a href="#">Profil</a></li>
            </ul>
          </div>
        </nav>
        <div class="container">
        <div class="cont">
        <div class="wrapper">
        <div className="box">
        
      </div>
          {/* <div class="box a"><img className="box" style={styles.box} ref={box => this.box = box} src={logo} alt="Logo" /></div> */}
          <div class="box b"></div>
          <div class="box c"><img style={styles.box} ref={box => this.box = box}  src={logo} alt="Logo" /></div>
          <div onClick={this.animate} class="box start">START</div>
          </div>
          <div class="wrapperbis">
            <div class="box z"></div>
            <div class="box e"></div>
            <div class="box z"></div>
          </div>
          <div class="wrapper">
          <div class="box a"></div>
          <div class="box b"></div>
          <div class="box c"></div>
          <div class="box a"></div>
          <div class="box a"></div>
          <div class="box end">END</div>
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