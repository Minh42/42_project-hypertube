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
        stream_link: "",
        quality: ""
    }
    
    handleDownload = async (url = "", magnet = "", quality = "") => {
        this.setState({open: true})
    }

    handleChange = () => {
        console.log("Chaneg")
    }

    render() {
        return (
            <div className="curtain">    
                <input ref="openCurtain" type="checkbox" onChange={this.handleChange} checked={this.state.open} id="toggle-2"/>
                <button disabled={this.state.open} onClick={() => this.handleDownload()} className="btn btn-secondary btn-secondary--red">
                            <span className="btn btn-secondary__icon">
                                
                            </span>
                                Play
                        </button>
                <LeftPanel />
                <RightPanel />
                <div className="prize">
                    <MoviePlayer stream_link={this.state.stream_link} movie={this.props.selectedMovie} quality={this.state.quality} handleDownload={this.handleDownload} />
                </div>
             </div>
        );     
    }
 }

 function mapStateToProps(state) {
    return {
        selectedMovie: state.movies.selectedMovie
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStartStreaming: ({stream_link}, history) => dispatch(reducerDownload.startStreaming({stream_link}, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Curtain);
