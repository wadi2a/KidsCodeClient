
import React, { Component } from 'react';

export default class NavBarAccueil extends Component {


    render() {
        return (
            <nav className="navbar navbar-default">
                <div className= "container-fluid" >
                    <div className= "navbar-header" > <a className = "navbar-brand" href = "#" > KidsCode </a> </div>
                    <ul className = "nav navbar-nav" >
                        <li className = "active" > <a href = "#" > Home </a></li >

                        <li> < a href = "#" > Statistiques </a></li >
                        <li> <a href = "#" > Profil </a></li>
                     </ul>
               </div>
            </nav>

        );
    }
}



