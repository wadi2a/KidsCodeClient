import store from '../../config/store'
import {MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE} from '../../config/constants'


export default function handleDeplacement(voiture) {
    
    function getNewPosition(direction) {
        const oldPos = store.getState().voiture.position
        switch (direction) {
            case 'WEST' :
                return [oldPos[0]-SPRITE_SIZE,oldPos[1]]
            case 'EAST' :
                return [oldPos[0]+SPRITE_SIZE,oldPos[1]]
            case 'NORTH' :
                return [oldPos[0],oldPos[1]-SPRITE_SIZE]
            case 'SOUTH' :
                return [oldPos[0],oldPos[1]+SPRITE_SIZE]

        }
        
    }
    function observeBoundaries(oldPos,newPos) {

        return (newPos[0]>=0 && newPos[0]<=MAP_WIDTH-SPRITE_SIZE) &&
               (newPos[1]>=0 && newPos[1]<=MAP_HEIGHT-SPRITE_SIZE)
                ? newPos : oldPos
    }
    function dispatchMove(direction) {
        const oldPos = store.getState().voiture.position
        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{
                position : observeBoundaries(oldPos,getNewPosition(direction))
            }
        })
    }

    function handleKeyDown(e){
        e.preventDefault()
        switch (e.keyCode) {
            case 37 :
                return dispatchMove("WEST")
            case 38 :
                return dispatchMove("NORTH")
            case 39 :
                return dispatchMove("EAST")
            case 40 :
                return dispatchMove("SOUTH")
            default:
                console.log(e.keyCode)
        }
    }


    window.addEventListener('keydown',(e)=>{
        handleKeyDown(e)
    })
    return voiture
}