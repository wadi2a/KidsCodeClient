import {createStore,combineReducers} from 'redux'
import voitureReducer from '../features/Voiture/reducer'
import mapReducer from '../features/Map/reducer'

const rootReducer= combineReducers({
    voiture : voitureReducer,
    map : mapReducer,
})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export  default  store