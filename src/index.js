import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'

import FenetreJeu from './components/FenetreJeu'
import {Provider} from 'react-redux'
import store from './config/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter><Provider store={store}><FenetreJeu/></Provider></BrowserRouter>, document.getElementById('root'))


