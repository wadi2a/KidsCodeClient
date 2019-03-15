import React from 'react'
import {SPRITE_SIZE} from "../../config/constants";
import './styles.css'
import {connect} from 'react-redux'
import store from "../../config/store";
import {dataBlock} from '../../data/blocks'






function BarreChoix(props) {

    function dispatchCase(block) {

        store.dispatch({
            type : 'DRAGCHOIX',
            payload:{
                tasksChoisie : store.getState().barreChoix.tasksChoisie.concat(block),

            }
        })
        console.log('dro:',store.getState().barreChoix.tasksChoisie);
    }



    function  onDragOver  (ev) {

        ev.preventDefault();
    }
    function  sendDataParent(val, props){
       props.sendData(val);

    }
    function onDrop (ev, cat)  {
        let block = ev.dataTransfer.getData("task");

        let blocks = dataBlock.filter((task) => {
            if (task.name === block) {


                task.category = cat;

                dispatchCase(task) ;

            }

            BarreChoix(props);
        });


    }


    return (

        <div className="droppable"
             onDragOver={(e)=> onDragOver(e)}
             onDrop={(e)=>{ onDrop(e,"complete")}}>

            {remplissage()}
        </div>

    );

}
function mapStateToProps(state) {

    return {
        tasksChoisie :state.tasksChoisie,
    }
}
function remplissage(Barre) {

    let tasks = []

    store.getState().barreChoix.tasksChoisie.forEach((t) => {
        tasks.push(
            <div key={t.name}

                 onClick={(e) => onClick(e, t.name)}
                 draggable
                 className="draggable"
                 style={{backgroundImage: t.bgcolor}}
            >
            </div>
        );
    });
    console.log("remplissage");
    return tasks
}
function onClick  (ev, tas)  {
    console.log('dragstart:',tas)


    let blocks = this.state.tasks.filter((task) => {
        if (task.name !== tas) {

            return task;
        }


    });
    dispatchCase(blocks)
}
function dispatchCase(block) {

    store.dispatch({
        type : 'DRAGCHOIX',
        payload:{
            tasksChoisie : store.getState().barreChoix.tasksChoisie.concat(block),

        }
    })
    console.log('dro:',store.getState().barreChoix.tasksChoisie);
}
export default connect(mapStateToProps)(remplissage(BarreChoix))