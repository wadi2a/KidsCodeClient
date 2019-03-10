const initialState = {
    position : [0,0],
    spriteLocation:'0px 0px',
    direction :'EAST',
    depIndex :0,
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