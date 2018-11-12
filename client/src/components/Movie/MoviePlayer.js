import React, { Component } from 'react';
import Hls from 'hls.js';
import { connect } from 'react-redux';
import * as reducerDownload from '../../reducers/reducer_download';
import Loader from '../Loader/Loader';
import axios from 'axios';

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



    async componentDidUpdate() {
        console.log('enter in didupdate');
        if (this.state.started === false && this.props.stream_link !== "") {
            await this.setState({started: true});
            console.log('in didupdate ');
            
            if(Hls.isSupported()) {
                console.log('here');
                var config = { 
                    xhrSetup: function (xhr,url) { 
                //    xhr.withCredentials = true; // do send cookie 
                    //xhr.setRequestHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With");
                     //xhr.setRequestHeader("Access-Control-Allow-Origin","http://localhost:3000"); 
                //     xhr.setRequestHeader("Access-Control-Allow-Credentials","true"); 
                    } 
                }; 
                     var hls = new Hls(config);
                console.log(this.props.stream_link);
                hls.loadSource(this.props.stream_link);
                hls.attachMedia(this.refs.video);
                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                    console.log("HLS VIDEO")
                    
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
                    console.log("PAS HLS")
                    //this.refs.video.play();
                });
            } 
            
            this.refs.video.currentTime = 1;
           /* const t = await axios.get('http://localhost:8080/my-files/d.vtt');
            console.log("GET", t)
            this.refs.track1.src=t.data.data;*/

            this.refs.video.play();
            
            //this.setState({started: true});
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
                 <track ref="track1" label="English" kind="subtitles" src="http://localhost:8080/my-files/torrent-stream/18f05a35a335909b384d1d40d79efec3e71bcee0/fr.vtt" default /> 
                 
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
