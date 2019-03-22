import {createStore,combineReducers,applyMiddleware,compose } from 'redux'
import voitureReducer from '../features/Voiture/reducer'
import mapReducer from '../features/Map/reducer'
import thunk from "redux-thunk";


import {asyncActionsMiddleware} from 'redux-minimal-code-async-actions'
const enhancers = [];
const middleware = [
    asyncActionsMiddleware,
]

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);



const rootReducer= combineReducers({
    voiture : voitureReducer,
    map : mapReducer,

})

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()&&applyMiddleware(thunk)&& composedEnhancers,
)

export  default  store