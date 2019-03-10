const initialState = {
    position : [0,0],
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