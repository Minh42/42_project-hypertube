import React, { Component } from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux';
import * as reducerDownload from '../../reducers/reducer_download';
import Loader from '../Loader/Loader';
import axios from 'axios';
import Comment from './Comment';
import { withNamespaces } from 'react-i18next';

let hls = null;

class MoviePlayer extends Component {
    state = {
        started: false,
        playing: true,
        quality: "",
        en: "",
        fr: "",
        watching: false,
        isTyping: false,
        stream_link: ""
    }


    componentDidMount() {
        if (!window.location.pathname.includes("/movie/")  && localStorage.getItem("started") === "started") {
            localStorage.setItem("started", "not")
            console.log("IN DID MOUNT VID")
            const stream_link = localStorage.getItem("stream_link");
            const en = localStorage.getItem("en");
            const fr = localStorage.getItem("fr");
            const pos = localStorage.getItem("pos");
            
            if (stream_link) {
                if (Hls.isSupported()) {
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
                this.refs.video.currentTime = parseInt(pos, 10);
                this.refs.video.play();
            }
            this.setState({stream_link: stream_link, en: en,
            fr: fr, pos: pos});
        }
    }

    async componentDidUpdate() {
        if (!window.location.pathname.includes("/movie/") && localStorage.getItem("started") === "started") {
            console.log("IN DID MOUNT VID")
            await localStorage.setItem("started", "not")
            const stream_link = localStorage.getItem("stream_link");
            const en = localStorage.getItem("en");
            const fr = localStorage.getItem("fr");
            const pos = localStorage.getItem("pos");
            
            if (stream_link) {
                if (Hls.isSupported()) {
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
                this.refs.video.currentTime = parseInt(pos, 10);
                this.refs.video.play();
            }
            this.setState({stream_link: stream_link, en: en,
            fr: fr, pos: pos});
        }
    }

     render () {
        console.log(window.location.pathname.includes("/movie/"))
        const { t } = this.props;

         return (
            <div className="vid-bottom">
                {
                    !window.location.pathname.includes("/movie/")
                &&
                    <div>
                        <p className="small-x">X</p>
                        <video className="video-small" ref="video" crossOrigin="anomymous"  controls>
                            {this.state.en && this.state.en !== "" && <track ref="track1" label="English" kind="subtitles" src={this.props.en} default />} 
                            {this.state.fr && this.state.fr!== "" && <track ref="track2" label="French" kind="subtitles" src={this.props.fr} />}
                        </video>
                            
                    </div>
                }
            </div>      
         )
     }
 }

export default withNamespaces('common') (MoviePlayer);
