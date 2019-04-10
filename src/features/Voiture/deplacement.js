import store from '../../config/store'
import {MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE} from '../../config/constants'
import {TimelineMax} from "gsap";
import BarreDeChoix2 from "../../components/BarreDeChoix2"
import {tiles1} from "../../data/maps/2";

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

        return nextTiles === 7 || nextTiles === 1

    }
    function observeFin(oldPos,newPos) {
        const tiles = store.getState().map.tiles

        const y = newPos[1]/SPRITE_SIZE
        const x = newPos[0]/SPRITE_SIZE
        const nextTiles = tiles[y][x]

        return  nextTiles === 1

    }
    function attemptMove(direction) {
        let tl = new TimelineMax({repeat:2, repeatDelay:1});
        const oldPos = store.getState().voiture.position
        const newPos = getNewPosition(oldPos,direction)
        if(observeBoundaries(oldPos,newPos)&& observeImpass(oldPos,newPos) ){
            dispatchMove(direction,newPos,oldPos)
            let songVoiture = new Audio('../../assets/audio/voiture2.ogg')
            songVoiture.play()
        }
        if(observeFin(oldPos,newPos)){

            tl.to(".animationFin",  1, {scale:0.0});
            tl.to(".animationFin",  1, {scale:1, opacity:1});
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
        let tl = new TimelineMax({repeat:1, repeatDelay:1});
        let tf = new TimelineMax();
//let tl = TimelineMax();
let i =0
        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)

       do {

               if (observeBoundaries(oldPos, newPos) && observeImpass(oldPos, newPos)) {
                 //  sleep(500)
                   console.log("dontinder")

                   dispatchMove(direction, newPos, oldPos);

                 //  tl.to(".Voit", 1, {left:newPos});
               }
           if(observeFin(oldPos,newPos)){

               tl.to(".animationFin",  1, {scale:0.0});
               tl.to(".animationFin",  1, {scale:1, opacity:1});

               tl.to(".animationFin",  1, {opacity:0});


               let t2 = new TimelineMax();
               t2.to(".animationFin",  1, {opacity:0});


           }
               i=i+1;
           oldPos = store.getState().voiture.position
           newPos = getNewPosition(oldPos, direction)
     }while (observeBoundaries(oldPos, newPos) && observeImpass(oldPos, newPos) && i<50)

    }


    function  animation() {
        let tl = new TimelineMax({repeat:2, repeatDelay:1});
        tl.to(".Voit",  1, {scale:0.0});
        tl.to(".Voit",  1, {scale:1, opacity:1});
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
       console.log("event",e)
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
            let tl = new TimelineMax({repeat:1, repeatDelay:1});
            if(!observeFin(store.getState().voiture.position,store.getState().voiture.position)){

                tl.to(".animationFinbug",  1, {scale:0.0});
                tl.to(".animationFinbug",  1, {scale:1, opacity:1});

                tl.to(".animationFinbug",  1, {opacity:0});


                let t2 = new TimelineMax();
                t2.to(".animationFinbug",  1, {opacity:0});


            }
        }else if (e.target["id"]==="Reinit"){
            store.dispatch({
                type : 'MOVE_VOITURE',
                payload:{

                    position: [1120,160],
                    spriteLocation: '0px 160px',
                    direction: 'WEST',
                    depIndex: 0,
                    taskChoix : [],
                }
            })

            let tl = new TimelineMax();
            tl.to(".animationFin",  1, {opacity:0});


        }
    }

    window.addEventListener('click',(e)=>{
        handleDeplacement(e)
    })
    window.addEventListener('keydown',(e)=>{
        handleKeyDown(e)
    })
    return voiture
}