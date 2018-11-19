import React, { Component } from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux';
import * as reducerDownload from '../../reducers/reducer_download';
import Loader from '../Loader/Loader';
import axios from 'axios';
import Comment from './Comment';
import { withNamespaces } from 'react-i18next';
import { ReactComponent as Play} from '../../assets/img/svg/youtube.svg';

let hls = null;

class MoviePlayer extends Component {
    state = {
        started: false,
        playing: true,
        quality: "",
        en: "",
        fr: "",
        watching: false,
        isTyping: false
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            this.handleKeyPress(e)       
        })
        this.signal = axios.CancelToken.source();
    }

    handleDownload = async (url, quality) => {
        if (this.state.started) {
            await this.signal.cancel('Api is being canceled');
            this.refs.video.src = '';
            await this.setState({en: "", fr: "", watching: false, playing: false})
            if (hls) {
                await hls.destroy()
                hls = null;
            } 
        }
        const response = await axios.post("http://localhost:8080/api/download/torrent", {
            title: this.props.movie._source.title,
            imdbid: this.props.movie._source.imdb_id,
            link: url,
            quality: quality
        }, {withCredentials: true, cancelToken: this.signal.token});


        if (response && response.status === 200) {
            this.setState({watching: true})
            const stream_link = response.data.stream_link;
            const en = response.data.en;
            const fr = response.data.fr;
            localStorage.setItem("stream_link", stream_link);
            localStorage.setItem("en", en);
            localStorage.setItem("fr", fr);
            localStorage.setItem("started", "started");
            await this.setState({started: true, en: en, fr: fr});
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
            await axios.post('http://localhost:8080/api/movie/add', {imdbid: this.props.movie._source.imdb_id}, {withCredentials: true, cancelToken: this.signal.token});
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
  
    handleClick = async (url, quality, i) => {
        console.log(document.getElementsByClassName("movie-player__torrents-info" + i));
        url = url !== undefined ? url : "";
        document.getElementById("movie-player__torrents-info" + i).style.backgroundColor = "green";

        if (document.getElementById("movie-player__torrents-button" + i)) {
			document.getElementById("movie-player__torrents-button" + i).disabled = false;
		} else {
            document.getElementById("movie-player__torrents-button" + i).disabled = true;
        }
        await this.setState({started: false, watching: false, quality: quality});
        this.handleDownload(url, quality);
    }

    handleTyping = (isTyping) => {
        if (isTyping !== this.state.isTyping)
            this.setState({isTyping: isTyping})
    }

    renderTorrents() {
        if (this.props.movie) {
            console.log(this.props.movie)
            return this.props.movie._source.torrents.map((torrent, i) => {
                return (
                    <tbody key={i} id={"movie-player__torrents-info" + i} className="movie-player__torrents-info">
                        <tr>
                            <td>{this.props.movie._source.title} - {torrent.quality}</td>
                            <td>{torrent.seed}</td>
                            <td>{torrent.peer}</td>
                            <td>{torrent.filesize}</td>
                            <td>
                                <button disabled={false} id="disabled" className="movie-player__torrents-button" onClick={() => this.handleClick(torrent.url, torrent.quality, i)}>
                                    <Play fill='red' />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }
    }

    componentWillUnmount() {
        localStorage.setItem("pos", this.refs.video.currentTime)
        if (hls) {
            console.log("UNMOUNT VIDEO")
            hls.stopLoad();
            hls = null;
        }
    }

    render () {
        const { t } = this.props;
        return (
            <div className="movie-container">
                <div className="movie-player">
                    <h1 className="movie-player__title"> {`${this.props.movie._source.title} ${this.state.quality}`} </h1>
                    <div className="movie-player__movie">
                        <video className={this.state.watching ? "movie-player__movie--watching" : "movie-player__movie--not-watching" } ref="video" crossOrigin="anomymous" controls>
                            {this.state.en !== "" && <track ref="track1" label="English" kind="subtitles" src={this.state.en} default />} 
                            {this.state.fr !== "" && <track ref="track2" label="French" kind="subtitles" src={this.state.fr} />}
                        </video>
                            
                    </div>
                    <table className="movie-player__torrents">
                        <thead className="movie-player-torrents-header">
                            <tr>
                                <th>Torrents</th>
                                <th>Seeds</th>
                                <th>Peers</th>
                                <th>Filesize</th>
                            </tr>
                        </thead>
                        {this.renderTorrents()}
                    </table>
                </div>
                <div className="movie-comments">
                    <Comment history={this.props.history} userid={this.props.user} imdbid={this.props.movie._source.imdb_id} isTyping={this.handleTyping}/>  
                </div>
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

export default withNamespaces('common') (connect(mapStateToProps, mapDispatchToProps)(MoviePlayer));
