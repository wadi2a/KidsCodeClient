import store from '../../config/store'
import {MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE} from '../../config/constants'
import {TimelineMax} from "gsap";
import BarreDeChoix2 from "../../components/BarreDeChoix2"
import {tiles1} from "../../data/maps/2";

export default function handleDeplacement(voiture) {
    let pass = false
    let counter1 = 0;
    let intervalId1 = null;
    let intervalId2 = null;
    let intervalId3 = null;
    let counter = 10;
    let intervalId = null;
    function finish() {
        clearInterval(intervalId);
        document.getElementById("bip").innerHTML = "TERMINE!";
    }
    function bip() {
        counter--;
        if(counter < 0) finish();
        else {
            document.getElementById("bip").innerHTML = counter + " secondes restantes";
        }
    }
    function start(){
        intervalId = setInterval(bip, 1000);
    }
    function finish1() {
        clearInterval(intervalId1);
        document.getElementById("bip1").innerHTML = "TERMINEW!";
    }
    function finish2() {
        clearInterval(intervalId2);
        document.getElementById("bip1").innerHTML = "TERMINES!";
    }
    function finish3() {
        clearInterval(intervalId3);
        document.getElementById("bip1").innerHTML = "TERMINE!E";
    }

    function _WEST() {
        let direction = "WEST"

        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)
          pass = false

            console.log(oldPos, newPos)
            if (!observeBoundaries(oldPos, newPos) || !observeImpass(oldPos, newPos)) {

                console.log(observeBoundaries(oldPos, newPos), "JENSUISMA", observeImpass(oldPos, newPos))
               // if(observeFin(oldPos,newPos))
                    finish1()

                pass = true
                //  tl.to(".Voit", 1, {left:newPos});
            }
            if (!pass) dispatchMove(direction, newPos, oldPos);
            pass = false

    }
    function _EAST() {
        let direction = "EAST"

        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)
        pass = false

        console.log(oldPos, newPos)
        if (!observeBoundaries(oldPos, newPos) || !observeImpass(oldPos, newPos)) {

            console.log(observeBoundaries(oldPos, newPos), "JENSUISMA", observeImpass(oldPos, newPos))
           // if(observeFin(oldPos,newPos))
                finish3()

            pass = true
            //  tl.to(".Voit", 1, {left:newPos});
        }
        if (!pass) dispatchMove(direction, newPos, oldPos);
        pass = false

    }
    function _NORTH() {
        let direction = "NORTH"

        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)
        pass = false

        console.log(oldPos, newPos)
        if (!observeBoundaries(oldPos, newPos) || !observeImpass(oldPos, newPos)) {

            console.log(observeBoundaries(oldPos, newPos), "JENSUISMA", observeImpass(oldPos, newPos))
            if(observeFin(oldPos,newPos))finish2()

            pass = true
            //  tl.to(".Voit", 1, {left:newPos});
        }
        if (!pass) dispatchMove(direction, newPos, oldPos);
        pass = false

    }
    function _SOUTH() {
        let direction = "SOUTH"

        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)
        pass = false

        console.log(oldPos, newPos)
        if (!observeBoundaries(oldPos, newPos) || !observeImpass(oldPos, newPos)) {

            console.log(observeBoundaries(oldPos, newPos), "JENSUISMA", observeImpass(oldPos, newPos))
            finish2()

            pass = true
            //  tl.to(".Voit", 1, {left:newPos});
        }
        if (!pass) dispatchMove(direction, newPos, oldPos);
        pass = false

    }
    function startWest(){
        intervalId1 = setInterval(_WEST, 100);
    }
    function startSouth(){
        intervalId2 = setInterval(_SOUTH, 100);
    }
    function startEast(){
        intervalId3 = setInterval(_EAST, 100);
    }
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
    function attemptManyMove1(direction) {
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
    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {startWest();
            setTimeout(() => {
                resolve(x);

            }, 2000);
        });
    }
    function resolveAfter2Seconds2(x) {
        return new Promise(resolve => {f2();
            setTimeout(() => {
                resolve(x);

            }, 4000);
        });
    }
    async function f2() {
        let x = await resolveAfter2Seconds(10);
        startSouth();
        console.log(x); // 10
    }
    async function f1() {
        let x = await resolveAfter2Seconds2(10);
        startEast();
        console.log(x); // 10
    }

    function attemptManyMove() {
        let i = 0;
        let tab = store.getState().voiture.taskChoix;

      //  do {
        f1()
            start();



        //startEast();
       //     i=i+1;
        //    if(tab[i]==null) {console.log("jsuis nullé",tab[i],i);clearInterval(interval);}
      //  }while( tab[i]!=null)
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
                nbVie : store.getState().voiture.nbVie,

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

         return attemptManyMove( )


            let tl = new TimelineMax({repeat:1, repeatDelay:1});
            if(!observeFin(store.getState().voiture.position,store.getState().voiture.position)){

                tl.to(".animationFinbug",  1, {scale:0.0});
                tl.to(".animationFinbug",  1, {scale:1, opacity:1});

                tl.to(".animationFinbug",  1, {opacity:0});


                let t2 = new TimelineMax();
                t2.to(".animationFinbug",  1, {opacity:0});

                sleep(2000)
                if(store.getState().voiture.nbVie>=0){
                    store.dispatch({
                        type : 'MOVE_VOITURE',
                        payload:{

                            position: store.getState().voiture.position,
                            spriteLocation: '0px 160px',
                            direction: 'WEST',
                            depIndex: 0,
                            taskChoix : [],
                            nbVie : store.getState().voiture.nbVie-1,
                        }
                    })

                    let tl = new TimelineMax()
                    if     (store.getState().voiture.nbVie ==2)     tl.to("#coeur1",  1, {opacity:0})
                    if(store.getState().voiture.nbVie ==1)  tl.to("#coeur2",  1, {opacity:0})
                    if   (store.getState().voiture.nbVie ==0)  {tl.to("#coeur3",  1, {opacity:0})
                        let t = new TimelineMax({repeat:2, repeatDelay:1});
                        t.to(".gameOver",  1, {scale:0.0});
                        tl.to(".gameOver",  1, {scale:1, opacity:1});
                    }
                }else
                {
                    store.dispatch({
                        type : 'MOVE_VOITURE',
                        payload:{

                            position: [1120,160],
                            spriteLocation: '0px 160px',
                            direction: 'WEST',
                            depIndex: 0,
                            taskChoix : [],
                            nbVie : 3,
                        }
                    })



                }


            }
        }else if (e.target["id"]==="Reinit"){
            if   (store.getState().voiture.nbVie >0) {
                store.dispatch({
                    type: 'MOVE_VOITURE',
                    payload: {

                        position: [1120, 160],
                        spriteLocation: '0px 160px',
                        direction: 'WEST',
                        depIndex: 0,
                        taskChoix: [],
                        nbVie: store.getState().voiture.nbVie,
                    }
                })


            }else{

                    store.dispatch({
                        type: 'MOVE_VOITURE',
                        payload: {

                            position: [1120, 160],
                            spriteLocation: '0px 160px',
                            direction: 'WEST',
                            depIndex: 0,
                            taskChoix: [],
                            nbVie: 3,
                        }
                    })
                let tl = new TimelineMax();
                tl.to(".animationFin", 1, {opacity: 0});


                tl.to("#coeur1", 1, {opacity: 1})
                tl.to("#coeur2", 1, {opacity: 1})
                tl.to("#coeur3", 1, {opacity: 1})
            }
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