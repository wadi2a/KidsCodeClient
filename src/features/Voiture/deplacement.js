import store from '../../config/store'
import {MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE} from '../../config/constants'


export default function handleDeplacement(voiture) {

    function getSpriteLocation(direction,depIndex) {
        switch(direction) {
            case 'SOUTH':
                return `${SPRITE_SIZE*1}px ${SPRITE_SIZE*0}px`
            case 'EAST':
                return `${SPRITE_SIZE*depIndex}px ${SPRITE_SIZE*1}px`
            case 'WEST':
                return `${SPRITE_SIZE*depIndex}px ${SPRITE_SIZE*2}px`
            case 'NORTH':
                return `${SPRITE_SIZE*depIndex}px ${SPRITE_SIZE*3}px`
        }
    }
    function getNewPosition(oldPos,direction) {

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

    }
    function observeImpass(oldPos,newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1]/SPRITE_SIZE
        const x = newPos[0]/SPRITE_SIZE
        const nextTiles = tiles[y][x]
        return nextTiles < 5

    }
    function attemptMove(direction) {
        const oldPos = store.getState().voiture.position
        const newPos = getNewPosition(oldPos,direction)
        if(observeBoundaries(oldPos,newPos)&& observeImpass(oldPos,newPos) ){
            dispatchMove(direction,newPos)
        }
    }
    function dispatchMove(direction,newPos) {
        const depIndex =getDepIndex()
        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{
                position : newPos,
                direction :direction,
                depIndex :newPos ,
                spriteLocation : getSpriteLocation(direction,depIndex),
            }
        })
    }
    function getDepIndex() {
        const depIndex = store.getState().voiture.depIndex
        return (depIndex >= 7 ? 0 : depIndex + 1)

    }
    function handleKeyDown(e){
        e.preventDefault()
        switch (e.keyCode) {
            case 37 :
                return attemptMove("WEST")
            case 38 :
                return attemptMove("NORTH")
            case 39 :
                return attemptMove("EAST")
            case 40 :
                return attemptMove("SOUTH")
            default:
                console.log(e.keyCode)
        }
    }


    window.addEventListener('keydown',(e)=>{
        handleKeyDown(e)
    })
    return voiture
}