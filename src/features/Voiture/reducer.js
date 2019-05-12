const initialState = {
    position: [1120,160],
    spriteLocation: '0px 160px',
    direction: 'WEST',
    depIndex: 0,
    taskChoix : [],
    nbVie : 3,
    score:0,

}


const voitureReducer = (state = initialState,action)=>{
    switch (action.type) {
        case 'MOVE_VOITURE' :
            return {
                ...action.payload

            }

        default :
            return state

    }
}

export  default voitureReducer