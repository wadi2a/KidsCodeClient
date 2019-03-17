import store from '../../config/store'
import {MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE} from '../../config/constants'
import {TimelineMax} from "gsap";


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

        return nextTiles === 7

    }
    function attemptMove(direction) {
        const oldPos = store.getState().voiture.position
        const newPos = getNewPosition(oldPos,direction)
        if(observeBoundaries(oldPos,newPos)&& observeImpass(oldPos,newPos) ){
            dispatchMove(direction,newPos,oldPos)
        }
    }
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
    function attemptManyMove(direction) {

        let tl = new TimelineMax();
let i =0
        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)

       do {

               if (observeBoundaries(oldPos, newPos) && observeImpass(oldPos, newPos)) {
                 //  sleep(500)
                   console.log("dontinder")

                   dispatchMove(direction, newPos, oldPos);
                   tl.to(".Voit", 1, {left:newPos});
               }
               i=i+1;
           oldPos = store.getState().voiture.position
           newPos = getNewPosition(oldPos, direction)
     }while (observeBoundaries(oldPos, newPos) && observeImpass(oldPos, newPos) && i<50)

    }


    function dispatchMove(direction,newPos,oldPos) {
        const depIndex =getDepIndex()



        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{
                position : newPos,
                direction :direction,
                depIndex,
                spriteLocation : getSpriteLocation(direction,depIndex),
                taskChoix : store.getState().voiture.taskChoix,
            }
        })
        console.log("testChoix",store.getState().voiture.taskChoix)

    }
    function getDepIndex() {
        const depIndex = store.getState().voiture.depIndex

        if(depIndex >= 5){
            return 0
        }else {
            return depIndex+1
        }


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
    function handleDeplacement(e){
        e.preventDefault()

        if (e.target["id"]==="start") {

            store.getState().voiture.taskChoix.forEach((t)=>{
                switch (t.name) {
                    case "WEST" :
                        return attemptManyMove("WEST")
                    case "NORTH" :
                        return attemptManyMove("NORTH")
                    case "EAST" :
                        return attemptManyMove("EAST")
                    case "SOUTH" :
                        return attemptManyMove("SOUTH")
                    default:
                        console.log(t.name)
                }
            })
        }
    }

    window.addEventListener('keydown',(e)=>{
        handleKeyDown(e)
    })
    window.addEventListener('click',(e)=>{
        handleDeplacement(e)
    })
    return voiture
}