import React, { Component } from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux';
import * as reducerDownload from '../../reducers/reducer_download';
import Loader from '../Loader/Loader';

class MoviePlayer extends Component {

    state = {
        started: false,
        playing: true
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            this.handleKeyPress(e);        
        })
    }

    async componentDidUpdate() {
        if (this.state.started === false && this.props.stream_link !== "") {
            //ReactDOM.findDOMNode(this.refs.vid).focus();
            await this.setState({started: true, en: this.props.en, fr: this.props.fr});
            
            if(Hls.isSupported()) {
                var config = { 
                    xhrSetup: function (xhr,url) { 
                    } 
                }; 
                var hls = new Hls(config);
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

    shouldComponentUpdate() {
        if (this.state.started === false)
            return true ;
        return false ;
    }

    handleKeyPress = (e) => {
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
                if(this.refs.video.requestFullScreen){
                    this.refs.video.requestFullScreen();
                } else if(this.refs.video.webkitRequestFullScreen){
                    this.refs.video.webkitRequestFullScreen();
                } else if(this.refs.video.mozRequestFullScreen){
                    this.refs.video.mozRequestFullScreen();
                }
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
  
     render () {
         return (
            <div>
                {this.state.started
                ?
                    <div>
                    <div>
                        <video ref="video" crossOrigin="anomymous" controls>
                            {this.state.en !== "" && <track ref="track1" label="English" kind="subtitles" src={this.state.en} default />} 
                            {this.state.fr !== "" && <track ref="track2" label="French" kind="subtitles" src={this.state.fr} />}
                        </video>
                        
                    </div>
                    <div>
                        List of torrents
                        <ul>
                            <li>1080</li>
                            <li>720</li>
                        </ul>
                    </div>
                    </div>
                :
                    <div>
                        <Loader />
                    </div>
                }
             </div>       
         )
     }
 }

const mapStateToProps = state => {
    return {
      // stream_link: state.download.stream_link
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link}, history) => dispatch(reducerDownload.startStreaming({stream_link}, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer);
