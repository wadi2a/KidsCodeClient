import {createStore,combineReducers} from 'redux'
import voitureReducer from '../features/Voiture/reducer'
const rootReducer= combineReducers({
    voiture : voitureReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export  default  store