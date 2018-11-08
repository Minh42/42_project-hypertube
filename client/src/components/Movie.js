import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';
import { ReactComponent as Play} from '../assets/img/svg/controller-play.svg';
import MoviePlayer from './Movie/MoviePlayer';
import axios from 'axios';

class Curtain extends Component {    

    handleDownload = () => {
        console.log("dl")
        axios.post("http://localhost:8080/api/download/", {
            title: "Final Fantasy VII: Advent Children",
            imdbid: "tt0385700",
            langue: "eng",
            link: "https://yts.am/torrent/download/38DE5EFB131A480B5F82D918AEEBFEE8E18F78AF",
            magnet: ""
        })
    }

    render() {
        return (
            <div className="curtain">    
         
                {/*<input type="checkbox" id="toggle-2"/>*/}
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
                        <button onClick={this.handleDownload}> Download </button>
                    </div>
                </div>
                
                <div className="right-panel">
                    <img src={movie} alt="Logo" className="right-panel__movie-poster"/> 
                </div>
                
                <div className="prize">
                    <MoviePlayer />
                </div>

               

            </div>
        );
    }
}

export default Curtain;