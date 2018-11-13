import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';
import { ReactComponent as Play} from '../assets/img/svg/controller-play.svg';
import MoviePlayer from './Movie/MoviePlayer';
import axios from 'axios';
import * as reducerDownload from '../reducers/reducer_download';
import { connect } from 'react-redux';

 class Curtain extends Component {    

    state = {
        open: false,
        stream_link: "",
        en: "",
        fr: ""
    }

    handleDownload = async () => {
        console.log("dl")
        this.setState({open: true})
        const response = await axios.post("http://localhost:8080/api/download/torrent", {
            title: "The kool kid",
            imdbid: "7725538",
            langue: "eng",
            link: "",
            magnet: "magnet:?xt=urn:btih:18aa3e283f07418cb98a50ce9020e54fa118d7c7&dn=The.Cool.Kids.S01E06.720p.HDTV.x265-MiNX%5Beztv%5D&tr=udp://tracker.coppersurfer.tk:80&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://exodus.desync.com:6969"
        })
        console.log("response", response)
        if (response && response.status === 200) {            
            const stream_link = response.data.stream_link;
            const en = response.data.en;
            const fr = response.data.fr;
            this.setState({stream_link: stream_link, en: en, fr: fr})
        }
    }

    handleChange = () => {
        console.log("Chaneg")
    }

     render() {
         return (
             <div className="curtain">    
         
                <input ref="openCurtain" type="checkbox" onChange={this.handleChange} checked={this.state.open} id="toggle-2"/>
                <div className="left-panel">
                    <img src={movie} alt="Logo" className="left-panel__movie-poster"/> 
                    <div className="left-panel__movie-information">
                        <div className="left-panel__movie-title">
                            Venom (2018)
                        </div>
                        <div className="left-panel__movie-description">
                            Des symbiotes débarquent sur la Terre, parmi eux, Venom, qui va s'allier avec Eddie Brock. De son côté, un puissant scientifique tente de faire évoluer l'humanité avec mes symbiotes, le duo d'anti-héros va devoir tout faire pour l'arrêter !
                        </div>
                        <button disabled={this.state.open} onClick={this.handleDownload} className="btn btn-secondary btn-secondary--red">
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
                    <MoviePlayer stream_link={this.state.stream_link} en={this.state.en} fr={this.state.fr} />
                </div>

               

             </div>
        );     
    }
 }

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link}, history) => dispatch(reducerDownload.startStreaming({stream_link}, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Curtain);
