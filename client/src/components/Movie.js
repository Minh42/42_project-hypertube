import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';
import { ReactComponent as Play} from '../assets/img/svg/controller-play.svg';
import MoviePlayer from './Movie/MoviePlayer';
import axios from 'axios';
import * as reducerDownload from '../reducers/reducer_download';
import { connect } from 'react-redux';
import Rating from './MoviesList/Rating';

 class Curtain extends Component {    

    state = {
        open: false,
        stream_link: ""
    }
 
    handleDownload = async () => {
        console.log("dl")
        const response = await axios.post("http://localhost:8080/api/download/torrent", {
            title: "Deadpool 2",
            imdbid: "tt5463162",
            langue: "eng",
            link: "https://yts.am/torrent/download/18F05A35A335909B384D1D40D79EFEC3E71BCEE0",
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
        this.setState({open: true})
    }

    handleChange = () => {
        console.log("Chaneg")
    }

    movieGenres(genres) {
        return genres.map(genre => {
            return(
                <div className="left-panel__movie-genres-item">[{genre}]</div>
            )
        })
    }

     render() {
        const movie = this.props.selectedMovie;
        console.log(movie)
        return (
            <div className="curtain">    
                <input ref="openCurtain" type="checkbox" onChange={this.handleChange} checked={this.state.open} id="toggle-2"/>
                <div className="left-panel">
                    <img src={movie._source.large_cover_image} alt="Logo" className="left-panel__movie-poster"/> 
                    <div className="left-panel__movie-information">
                        <div className="left-panel__movie-title">
                            {movie._source.title} ({movie._source.year})
                        </div>
                        <div className="left-panel__movie-rating">
                            <Rating
                                rating={movie._source.rating} 
                            />
                        </div>
                        <div className="left-panel__movie-genres">
                            {this.movieGenres(movie._source.genres)}
                        </div>
                        <div className="left-panel__movie-description">
                            {movie._source.synopsis}
                        </div>
                        <button disabled={this.state.open} onClick={this.handleDownload} className="btn btn-secondary btn-secondary--red">
                            <span className="btn btn-secondary__icon">
                                <Play fill="#fff" />
                            </span>
                                Play
                        </button>
                    </div>
                </div>
                
                 <div className="right-panel">
                    <img src={movie._source.large_cover_image} alt="Logo" className="right-panel__movie-poster"/> 
                </div>
                
                <div className="prize">
                    <MoviePlayer stream_link={this.state.stream_link} en={this.state.en} fr={this.state.fr} />
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
