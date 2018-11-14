import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoviePlayer from './Movie/MoviePlayer';
import LeftPanel from './Movie/LeftPanel';
import RightPanel from './Movie/RightPanel';
import * as reducerDownload from '../reducers/reducer_download';

class Curtain extends Component {    

    state = {
        open: false,
        stream_link: ""
    }
 
    handleDownload = async () => {
        console.log("dl")
        this.setState({open: true})
        const response = await axios.post("http://localhost:8080/api/download/torrent", {
            title: this.props.selectedMovie._source.title,
            imdbid: this.props.selectedMovie._source.imdb,
            langue: this.props.selectedMovie._source.language,
            link: this.props.selectedMovie._source.torrents[0].url,
            magnet: ""
        })
        console.log("response", response)
        if (response && response.status === 200) {
            console.log("ok")
            this.refs.openCurtain.checked = true;
            const stream_link = response.data.stream_link;
            this.setState({stream_link: stream_link})
            //this.props.onStartStreaming({stream_link: stream_link}, this.props.history);
        }
        //this.setState({open: true})
    }

    render() {
        return (
            <div className="curtain">    
                <input ref="openCurtain" type="checkbox" id="toggle-2"/>
                <LeftPanel />
                <RightPanel />
                <div className="prize">
                    <MoviePlayer stream_link={this.state.stream_link} />
                </div>
             </div>
        );     
    }
 }

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link}, history) => dispatch(reducerDownload.startStreaming({stream_link}, history))
    }
}

export default connect(null, mapDispatchToProps)(Curtain);
