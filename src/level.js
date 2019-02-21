import React from 'react';
import logo from './kart.png';

const level = () => ( 

    <div class="container">
                    
                        <div class="cont">
                            <div class="wrapper">
                                <div className="box">

                                </div>
                                {/* <div class="box a"><img className="box" style={styles.box} ref={box => this.box = box} src={logo} alt="Logo" /></div> */}
                                <div class="box b"></div>
                                <div class="box c"><img style={styles.box} ref={box => this.box = box}  src={logo} alt="Logo" /></div>
                                <div onClick={this.animate} class="box start">START</div>
                            </div>
                            <div class="wrapperbis">
                                <div class="box z"></div>
                                <div class="box e"></div>
                                <div class="box z"></div>
                            </div>
                            <div class="wrapper">
                                <div class="box a"></div>
                                <div class="box b"></div>
                                <div class="box c"></div>
                                <div class="box a"></div>
                                <div class="box a"></div>
                                <div class="box end">END</div>
                            </div>
                        </div>
                    </div>


 );

 const styles = {
    button: {
        width: 200,
        height: 45,
        border: 'none',
        outline: 'none',
    },
    container: {
        padding: 100,
    },
    box: {
    }
}

export default level;