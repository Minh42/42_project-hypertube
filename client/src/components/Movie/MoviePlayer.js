import React, { Component } from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux';
import * as reducerDownload from '../../reducers/reducer_download';

class MoviePlayer extends Component {

    state = {
        started: false
    }

    componentDidMount() {
        /*if(Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource('http://localhost:8080/my-files/torrent-stream/18f05a35a335909b384d1d40d79efec3e71bcee0/out.m3u8');
            hls.attachMedia(this.refs.video);
            hls.on(Hls.Events.MANIFEST_PARSED,function() {
                this.refs.video.play();
          });
         }
         // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
         // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
         // This is using the built-in support of the plain video element, without using hls.js.
         // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
         // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
          else if (this.refs.video.canPlayType('application/vnd.apple.mpegurl')) {
            this.refs.video.src = 'http://localhost:8080/my-files/torrent-stream/18f05a35a335909b384d1d40d79efec3e71bcee0/out.m3u8';
            this.refs.video.addEventListener('loadedmetadata',function() {
                this.refs.video.play();
            });
        } */
    }

    componentDidUpdate() {
        console.log('enter in didupdate');
        if (this.state.started === false && this.props.stream_link !== "") {
            
            console.log('in didupdate ');
            if(Hls.isSupported()) {
                console.log('here');
                var hls = new Hls();
                console.log(this.props.stream_link);
                hls.loadSource(this.props.stream_link);
                hls.attachMedia(this.refs.video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    this.refs.video.play();
              });

             }
             // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
             // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
             // This is using the built-in support of the plain video element, without using hls.js.
             // Note: it would be more normal to wait on the 'canplay' event below however on Safari (where you are most likely to find built-in HLS support) the video.src URL must be on the user-driven
             // white-list before a 'canplay' event will be emitted; the last video event that can be reliably listened-for when the URL is not on the white-list is 'loadedmetadata'.
              else if (this.refs.video.canPlayType('application/vnd.apple.mpegurl')) {
                console.log('la');
                this.refs.video.src = this.props.stream_link;
                console.log(this.refs.video.src);
                this.refs.video.addEventListener('loadedmetadata',function() {
                    this.refs.video.play();
                });
            } 
            //this.setState({started: true});
        }
    }

    playPause = () => { 
        if (this.refs.video.paused) 
            this.refs.video.play(); 
        else 
            this.refs.video.pause(); 
    } 
    
    makeBig = () => { 
        this.refs.video.width = 560; 
    } 
    
    makeSmall = () => { 
        this.refs.video.width = 320; 
    } 
    
    makeNormal = () => { 
        this.refs.video.width = 420; 
    }
    
    render () {
        return (
            <div>
                <video ref="video" controls>
                    
                </video>
                <button onClick={this.playPause}>Play/Pause</button> 
                <button onClick={this.makeBig}>Big</button>
                <button onClick={this.makeNormal}>Normal</button>
                <button onClick={this.makeSmall}>Small</button>
            </div>        
        )
    }
}

const mapStateToProps = state => {
    return {
      //  stream_link: state.download.stream_link
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link}, history) => dispatch(reducerDownload.startStreaming({stream_link}, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePlayer);