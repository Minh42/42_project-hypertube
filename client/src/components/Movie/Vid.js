import React, { Component } from 'react';
import Hls from 'hls.js';
import { withNamespaces } from 'react-i18next';

let hls = null;

class MoviePlayer extends Component {
    state = {
        started: false,
        //playing: true,
        quality: "",
        en: "",
        fr: "",
        watching: false,
        isTyping: false,
        stream_link: "",
        playing: false
    }


    async componentDidMount() {
        if (!window.location.pathname.includes("/movie/")  && localStorage.getItem("started") === "started" && !this.state.started) {
            await this.setState({started: true})
            localStorage.setItem("started", "not")
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
                const isPlaying = this.refs.video.currentTime > 0 && !this.refs.video.paused && !this.refs.video.ended && this.refs.video.readyState > 2;

                if (!isPlaying) {
                    this.refs.video.play();
                }
            }
            this.setState({stream_link: stream_link, en: en,
            fr: fr, pos: pos, playing: true});
        }
    }

    async componentDidUpdate() {
        console.log("STARTED", this.state.started, localStorage.getItem("stream_link"))
        if (window.location.pathname.includes("/movie/")) {
            if (hls) {
                console.log("STOP LOAD")
                hls.stopLoad();
                hls = null;
            }
            if (this.state.started)
                this.setState({started: false, playing: false})
        }
        else if (!localStorage.getItem("stream_link")){
            console.log("STOP LOAD1")
            if (this.state.started === true) {
                console.log("STOP LOAD2")
                await this.setState({started: false, playing: false})
                if (hls) {
                    console.log("STOP LOAD")
                    hls.stopLoad();
                    hls = null;
                }
            }
        } else if (!window.location.pathname.includes("/movie/") && localStorage.getItem("started") === "started"  && !this.state.started) {
            if (this.state.started === false)
                await this.setState({started: true})
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
                const isPlaying = this.refs.video.currentTime > 0 && !this.refs.video.paused && !this.refs.video.ended && this.refs.video.readyState > 2;

                if (!isPlaying) {
                    this.refs.video.play();
                }
            }
            this.setState({stream_link: stream_link, en: en,
            fr: fr, pos: pos, playing: true});
        } else if (window.location.pathname.includes("/movie/")) {
            if (this.state.started)
                this.setState({started: false, playing: false})
            }
    }

    componentWillUnmount() {
        if (hls) {
            console.log("UNMOUNT VIDEO")
            hls.stopLoad();
            hls = null;
        }
    }

     render () {
        return (
            <div>
                {
                    !window.location.pathname.includes("/movie/") && this.state.started
                &&
                    <div>
                        <p className="small-x">X</p>
                        <video className="vid-bottom video-small" ref="video" crossOrigin="anomymous"  controls={this.state.playing}>
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
