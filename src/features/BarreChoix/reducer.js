import start from "../../assets/images/start.png";
import right from "../../assets/images/right.png";

const initialState = {

    tasksChoisie: [{dirXy:"start",pas:"0",name:"Start",category:"wip", bgcolor: `url(${start})`},
                           ],

}


const barreChoixReducer = (state = initialState,action)=>{
    switch (action.type) {
        case 'DRAGCHOIX' :
            return {
                ...action.payload

            }
        default :
            return state

    }
}

export  default barreChoixReducer