import store from '../../config/store'
import {MAP_HEIGHT, MAP_WIDTH, SPRITE_SIZE} from '../../config/constants'
import {TimelineMax} from "gsap";
import BarreDeChoix2 from "../../components/BarreDeChoix2"
import {tiles1} from "../../data/maps/2";
import   VoitureSound from '../../assets/audio/voiture_audiosprite.mp3';
import   VoitureAccident from '../../assets/audio/accident.mp3';
import   VoitureGagner from '../../assets/audio/gagner.mp3';
import   evil from '../../assets/audio/evil.mp3';
import gameover from '../../assets/audio/Game-over-sound.mp3';
const sound = new Audio(VoitureSound);
const  accident  = new Audio(VoitureAccident);
const gagner = new Audio(VoitureGagner);
const evilFail = new Audio(evil);
const gameoverSound  = new Audio(gameover);

export default function handleDeplacement(voiture) {
    let pass = false

    let counter1 = 0;
    let intervalId1 = null;
    let intervalId2 = null;
    let intervalId3 = null;
    let counter = 10;
    let intervalId = null;
    let counter3 = store.getState().voiture.score;
    let intervalId5 = null;
    let intervalId6 = null;
    let fisrtCounter = counter3;
    function finishP() {




        clearInterval(intervalId5);
        intervalId5=null;
        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{

                position: store.getState().voiture.position,
                spriteLocation: store.getState().voiture.spriteLocation,
                direction:store.getState().voiture.direction,
                depIndex: store.getState().voiture.depIndex,
                taskChoix : store.getState().voiture.taskChoix,
                score:counter3-1,
                nbVie : store.getState().voiture.nbVie,
            }
        })
        counter3=store.getState().voiture.score;
        document.getElementById("score").innerHTML = counter3 + "$";

    }
    function finishM() {




        clearInterval(intervalId6);
        intervalId6=null;

        store.dispatch({
            type : 'MOVE_VOITURE',
            payload:{

                position: store.getState().voiture.position,
                spriteLocation: store.getState().voiture.spriteLocation,
                direction:store.getState().voiture.direction,
                depIndex: store.getState().voiture.depIndex,
                taskChoix : store.getState().voiture.taskChoix,
                score:counter3,
                nbVie : store.getState().voiture.nbVie,
            }
        })
        counter3=store.getState().voiture.score;
        document.getElementById("score").innerHTML = counter3 + "$";

    }
    function bipPlus() {

        console.log("score",store.getState().voiture.score,"gain",store.getState().map.gain,counter3 > store.getState().voiture.score+store.getState().map.gain)
        counter3++;

        if(counter3 > store.getState().voiture.score+store.getState().map.gain) {
            finishP();
            console.log("score",store.getState().voiture.score,"gain",store.getState().map.gain,counter3 > store.getState().voiture.score+store.getState().map.gain)

        }
        else {
            document.getElementById("score").innerHTML = counter3 + "$";

        }
    }
    function bipMoins() {

        counter3--;
console.log("score",store.getState().voiture.score,"gain",store.getState().map.gain)

        if(counter3 <=store.getState().voiture.score-store.getState().map.gain || counter3<=0) {
            finishM();
            console.log("score", store.getState().voiture.score, "gain", store.getState().map.gain, counter3 , store.getState().voiture.score- store.getState().map.gain)
        }
    else {
            document.getElementById("score").innerHTML = counter3 + "$";
        }
    }
    function plusScore(){
        intervalId5 = setInterval(bipPlus, 100);

    }
    function moinScore(){
        intervalId6 = setInterval(bipMoins, 100);
    }

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

        sound.volume = 1;
        accident.currentTime=9;
        sound.repeat=2;
        sound.play();

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

        sound.volume = 1;
        accident.currentTime=9;
        sound.repeat=2;
        sound.play();

        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)
        pass = false

        console.log(oldPos, newPos)
        if (!observeBoundaries(oldPos, newPos) || !observeImpass(oldPos, newPos)) {

            console.log(observeBoundaries(oldPos, newPos), "JENSUISMA", observeImpass(oldPos, newPos))
           // if(observeFin(oldPos,newPos))
                finish3();


            pass = true
            //  tl.to(".Voit", 1, {left:newPos});
        }
        if (!pass) dispatchMove(direction, newPos, oldPos);
        pass = false

    }
    function _NORTH() {
        let direction = "NORTH"


        sound.volume = 1;
        accident.currentTime=9;
        sound.repeat=2;
        sound.play();

        let oldPos = store.getState().voiture.position
        let newPos = getNewPosition(oldPos, direction)
        pass = false

        console.log(oldPos, newPos)
        if (!observeBoundaries(oldPos, newPos) || !observeImpass(oldPos, newPos)) {

            console.log(observeBoundaries(oldPos, newPos), "JENSUISMA", observeImpass(oldPos, newPos))
            //if(observeFin(oldPos,newPos))
                finish2()

            pass = true
            //  tl.to(".Voit", 1, {left:newPos});
        }
        if (!pass) dispatchMove(direction, newPos, oldPos);
        pass = false

    }
    function _SOUTH() {
        let direction = "SOUTH"

        sound.volume = 1;
        accident.currentTime=9;
        sound.repeat=2;
        sound.play();

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
        intervalId1 = setInterval(_WEST, 120);
    }
    function startSouth(){
        intervalId2 = setInterval(_SOUTH, 120);
    }
    function startEast(){
        intervalId3 = setInterval(_EAST, 120);
    }
    function startNorth(){
        intervalId3 = setInterval(_NORTH, 120);
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
    function resolveAfter2Seconds1(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);

            }, 2000);
        });
    }
    function resolveAfter2Seconds2(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);

            }, 2502);
        });
    }
    function resolveAfter2Seconds3(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);

            }, 4000);
        });
    }
    function resolveAfter2Seconds4(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);

            }, 6000);
        });
    }
    function resolveAfter2Seconds5(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);

            }, 8000);
        });
    }
    async function f5(action) {


        let x;
        switch (action[action.length-5]) {
            case "WEST" : x = await resolveAfter2Seconds1(startWest()); break ;
            case "EAST" : x = await resolveAfter2Seconds1(startEast()); break ;
            case "SOUTH" : x = await resolveAfter2Seconds1(startSouth()) ; break ;
            case "NORTH" : x = await resolveAfter2Seconds1( startNorth()) ; break ;
            default : console.log(action[action.length-1],"default tableau d'action derniere colonne")
        }


        switch (action[action.length-4]) {
            case "WEST" :startWest() ; break ;
            case "EAST" : startEast(); break ;
            case "SOUTH" : startSouth() ; break ;
            case "NORTH" : startNorth() ; break ;
            default : console.log(action[action.length-1],"default tableau d'action derniere colonne")
        }


        console.log(x); // 10
        }

    async function f4(action) {

        let x = await resolveAfter2Seconds2(f5(action));
        switch (action[action.length-3]) {
            case "WEST" :startWest() ; break ;
            case "EAST" : startEast(); break ;
            case "SOUTH" : startSouth() ; break ;
            case "NORTH" : startNorth() ; break ;
            default : console.log(action[action.length-1],"default tableau d'action derniere colonne")
        }

        console.log(x); // 10
    }
    async function f3(action) {
        let x = await resolveAfter2Seconds3(f4(action));
        switch (action[action.length-2]) {
            case "WEST" :startWest() ; break ;
            case "EAST" : startEast(); break ;
            case "SOUTH" : startSouth() ; break ;
            case "NORTH" : startNorth() ; break ;
            default : console.log(action[action.length-1],"default tableau d'action derniere colonne")
        }
        console.log(x); // 10
    }
    async function f2(action) {

        let x = await resolveAfter2Seconds4(f3(action));
        switch (action[action.length-1]) {
            case "WEST" :startWest() ; break ;
            case "EAST" : startEast(); break ;
            case "SOUTH" : startSouth() ; break ;
            case "NORTH" : startNorth() ; break ;
            default : console.log(action[action.length-1],"default tableau d'action derniere colonne")
        }
        console.log(x); // 10

    }
    async function f1(action) {

        let x = await resolveAfter2Seconds5(f2(action));
        accident.currentTime=0;
        sound.pause();

        let tl = new TimelineMax({repeat:1, repeatDelay:1});
        if(!observeFin(store.getState().voiture.position,store.getState().voiture.position)){
            accident.volume=1;
            accident.play();


            tl.to(".animationFinbug",  1, {scale:0.0});
            tl.to(".animationFinbug",  1, {scale:1, opacity:1});

            tl.to(".animationFinbug",  1, {opacity:0});


            let t2 = new TimelineMax();
            t2.to(".animationFinbug",  1, {opacity:0});


            sleep(3000)
            if(store.getState().voiture.nbVie>=0){
                store.dispatch({
                    type : 'MOVE_VOITURE',
                    payload:{

                        position: store.getState().voiture.position,
                        spriteLocation: store.getState().voiture.spriteLocation,
                        direction:store.getState().voiture.direction,
                        depIndex: 0,
                        taskChoix : [],
                        score:counter3,
                        nbVie : store.getState().voiture.nbVie-1,
                    }
                })
                accident.pause();
                accident.currentTime=0;
                moinScore();
                let tl = new TimelineMax()
                if     (store.getState().voiture.nbVie ==2)     tl.to("#coeur1",  1, {opacity:0})
                if(store.getState().voiture.nbVie ==1)  tl.to("#coeur2",  1, {opacity:0})
                if   (store.getState().voiture.nbVie ==0)  {tl.to("#coeur3",  1, {opacity:0})
                    gameoverSound.play();
                    let t = new TimelineMax({repeat:2, repeatDelay:1});
                    t.to(".gameOver",  1, {scale:0.0});
                    tl.to(".gameOver",  1, {scale:1, opacity:1});
                }
            }else
            {

                store.dispatch({
                    type : 'MOVE_VOITURE',
                    payload:{

                        position: store.getState().voiture.position,
                        spriteLocation: store.getState().voiture.spriteLocation,
                        direction:store.getState().voiture.direction,
                        depIndex: 0,
                        taskChoix : [],
                        score:counter3,
                        nbVie : 3,
                    }
                })



            }

            evilFail.volume=1;
            evilFail.play();
        }else{

            gagner.play();
            plusScore();

                tl.to(".animationFin",  1, {scale:0.0});
                tl.to(".animationFin",  1, {scale:1, opacity:1});

                tl.to(".animationFin",  1, {opacity:0});


                let t2 = new TimelineMax();
                t2.to(".animationFin",  1, {opacity:0});

           // gagner.pause();


        }

        console.log(x); // 10
    }

    function attemptManyMove() {
        let i = 0;
        let tab = [] ;
        store.getState().voiture.taskChoix.forEach((t)=>{
            return tab.push(t.name);
        });
console.log(tab,"mon tab ");
      //  do {
        //f1("WEST","SOUTH","EAST","SOUTH","WEST");

      if(tab[0]=="Start")  {f1(tab);}
      else{animationCle();
          start();
      }





        //startEast();
       //     i=i+1;
        //    if(tab[i]==null) {console.log("jsuis nullé",tab[i],i);clearInterval(interval);}
      //  }while( tab[i]!=null)
    }
    function  animationCle() {
        let tl = new TimelineMax({repeat:0, repeatDelay:2});
        tl.to(".cle",  1, {opacity:0,zIndex:1});
        tl.to(".cle",  1, {scale:1, opacity:1});
        tl.to(".cle",  1, {scale:1, opacity:1});
        tl.to(".cle",  1, {scale:1, opacity:1});

        tl.to(".cle",  1, {opacity:0,zIndex:0});
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
                score:store.getState().voiture.score,
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
                        score:store.getState().voiture.score,
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
                            score:store.getState().voiture.score,
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