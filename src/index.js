import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'

import FenetreJeu from './components/FenetreJeu'
import {Provider} from 'react-redux'
import store from './config/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'


ReactDOM.render(<Provider store={store}><FenetreJeu/></Provider>, document.getElementById('root'))


