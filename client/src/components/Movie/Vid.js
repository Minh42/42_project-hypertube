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
        console.log("IN DID MOUNT", this.props.stream_link)
        if (this.props.stream_link !== "" && this.props.inMovie === false) {
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
                hls.loadSource(this.props.stream_link);
                hls.attachMedia(this.refs.video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {});

            } else if (this.refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.refs.video.src = this.props.stream_link;
                this.refs.video.addEventListener('loadedmetadata',function() {});
            } 
            this.refs.video.currentTime = 1;
            this.refs.video.play();
        }
    }

    componentDidUpdate() {
        console.log("IN DID UPDATE", this.props.stream_link, this.state.stream_link)
        if (this.props.stream_link !== this.state.stream_link) {
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
                hls.loadSource(this.props.stream_link);
                hls.attachMedia(this.refs.video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {});

            } else if (this.refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.refs.video.src = this.props.stream_link;
                this.refs.video.addEventListener('loadedmetadata',function() {});
            } 
            this.refs.video.currentTime = this.props.pos;
            this.refs.video.play();
        }
    }

     render () {

        const { t } = this.props;

         return (
            <div className="vid-bottom">
                
                <div>
                    <video className="video-small" ref="video" crossOrigin="anomymous"  controls>
                        {this.props.en !== "" && <track ref="track1" label="English" kind="subtitles" src={this.props.en} default />} 
                        {this.props.fr !== "" && <track ref="track2" label="French" kind="subtitles" src={this.props.fr} />}
                    </video>
                        
                </div>
            </div>      
         )
     }
 }

 function mapStateToProps(state) {
     console.log("STATE", state)
    return {
        stream_link: state.download.stream_link,
        en: state.download.en,
        fr: state.download.fr,
        started: state.download.started,
        pos: state.download.pos,
        inMovie: state.download.inMovie
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link, en, fr, started, pos}) => dispatch(reducerDownload.startStreaming({stream_link, en, fr, started, pos}))
    }
}

export default withNamespaces('common') (connect(mapStateToProps, null)(MoviePlayer));
