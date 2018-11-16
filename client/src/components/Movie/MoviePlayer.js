import React, { Component } from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux';
import * as reducerDownload from '../../reducers/reducer_download';
import Loader from '../Loader/Loader';
import axios from 'axios';
import Comment from './Comment';
import { withCredentials } from '../../utils/headers';

let hls = null;

class MoviePlayer extends Component {

    state = {
     
     
        started: false,
        playing: true,
        width: 0,
        height: 0,
        quality: "",
        en: "",
        fr: "",
        watching: false,
        isTyping: false
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            this.handleKeyPress(e);        
        })
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
        if (this.refs.video)
        this.refs.video.width = this.state.width * 0.8;
        this.refs.video.height = this.state.height * 0.6;
    }

    handleDownload = async (url, quality) => {
        const response = await axios.post("http://localhost:8080/api/download/torrent", {
            title: this.props.movie._source.title,
            imdbid: this.props.movie._source.imdb_id,
            link: url,
            quality: quality
        }, withCredentials())
        if (response && response.status === 200) {
            this.setState({watching: true})
            const stream_link = response.data.stream_link;
            const en = response.data.en;
            const fr = response.data.fr;
            await this.setState({started: true, en: en, fr: fr});
            this.refs.video.width = window.innerWidth * 0.8;
            this.refs.video.height = window.innerHeight * 0.6;
            if(Hls.isSupported()) {
                var config = { 
                    xhrSetup: function (xhr,url) { 
                    } 
                };
                if (hls) {
                    hls.stopLoad()
                    hls = null;
                } 
                hls = new Hls(config);
                hls.loadSource(stream_link);
                hls.attachMedia(this.refs.video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {});

            } else if (this.refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.refs.video.src = stream_link;
                this.refs.video.addEventListener('loadedmetadata',function() {});
            } 
            this.refs.video.currentTime = 1;
            this.refs.video.play();
            const added = await axios.post('http://localhost:8080/api/movie/add', {imdbid: this.props.movie._source.imdb_id}, withCredentials());
        }
    }

    handleKeyPress = (e) => {
        if (this.state.started && !this.state.isTyping) {
            switch(e.key) {
                case " ":
                    const playing = this.state.playing; 
                    if (playing)
                        this.refs.video.pause();
                    else
                        this.refs.video.play();
                    this.setState({playing: !playing})
                    break ;
                case "Enter":
                if (this.refs.video) {
                    if(this.refs.video.requestFullScreen){
                        this.refs.video.requestFullScreen();
                    } else if(this.refs.video.webkitRequestFullScreen){
                        this.refs.video.webkitRequestFullScreen();
                    } else if(this.refs.video.mozRequestFullScreen){
                        this.refs.video.mozRequestFullScreen();
                    }}
                break ;
                case "m":
                    if (this.refs.video.muted){
                        this.refs.video.muted = false;
                    } else {
                        this.refs.video.muted = true;
                    }
                break ;
                default:
                break ;
            }
        }
    }
  
    handleClick = async (url, quality) => {
        url = url !== undefined ? url : "";
        await this.setState({started: false, watching: false, quality: quality});
        this.handleDownload(url, quality);
    }

    handleTyping = (isTyping) => {
        if (isTyping !== this.state.isTyping)
            this.setState({isTyping: isTyping})
    }

     render () {
         return (
            <div>
                <h1 className="movie-title"> {`${this.props.movie._source.title} ${this.state.quality}`} </h1>
                <div>
                    <video ref="video" crossOrigin="anomymous" controls>
                        {this.state.en !== "" && <track ref="track1" label="English" kind="subtitles" src={this.state.en} default />} 
                        {this.state.fr !== "" && <track ref="track2" label="French" kind="subtitles" src={this.state.fr} />}
                    </video>
                        
                </div>
                <div>
                    <div className="btn btn-secondary btn-secondary--darkerred">
                        <span className="btn btn-secondary__icon">
                        </span>
                            Choose your quality
                    </div>
                    <ul className='ul-video'>
                        {
                        this.props.movie._source.torrents.map(m => {
                                return (
                                    <li className='li-video' key={m.url} onClick={() => this.handleClick(m.url, m.quality)}> {m.quality} {this.state.quality === m.quality && !this.state.watching && <Loader />} </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <Comment history={this.props.history} userid={this.props.user} imdbid={this.props.movie._source.imdb_id} isTyping={this.handleTyping}/>
            </div>      
         )
     }
 }

 function mapStateToProps(state) {
    return {
 //       isAuthenticated: state.auth.authenticated,
        user: state.auth.currentUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link}, history) => dispatch(reducerDownload.startStreaming({stream_link}, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer);
