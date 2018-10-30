import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';
import { ReactComponent as Play} from '../assets/img/svg/controller-play.svg';

class Curtain extends Component {    
    render() {
        return (
            <div className="curtain">    
         
                <input type="checkbox" id="toggle-2"/>
                <div className="left-panel">
                    <img src={movie} alt="Logo" className="left-panel__movie-poster"/> 
                    <div className="left-panel__movie-information">
                        <div className="left-panel__movie-title">
                            Venom (2018)
                        </div>
                        <div className="left-panel__movie-description">
                            Des symbiotes débarquent sur la Terre, parmi eux, Venom, qui va s'allier avec Eddie Brock. De son côté, un puissant scientifique tente de faire évoluer l'humanité avec mes symbiotes, le duo d'anti-héros va devoir tout faire pour l'arrêter !
                        </div>
                        <button className="btn btn-secondary btn-secondary--red">
                            <span className="btn btn-secondary__icon">
                                <Play fill="#fff" />
                            </span>
                                Play
                        </button>
                    </div>
                </div>
                
                <div className="right-panel">
                    <img src={movie} alt="Logo" className="right-panel__movie-poster"/> 
                </div>
                
                <div className="prize">
                    Hello
                </div>

               

            </div>
        );
    }
}

export default Curtain;