import React, { Component } from 'react';
import Hls from 'hls.js';

class MoviePlayer extends Component {
    
    componentDidMount() {
        if(Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource('http://localhost:3000/dl/out.m3u8');
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
            this.refs.video.src = 'http://localhost:3000/dl/out.m3u8';
            this.refs.video.addEventListener('loadedmetadata',function() {
                this.refs.video.play();
            });
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

export default MoviePlayer;