import React, { Component } from 'react';
import movie from '../assets/img/movie-poster.jpg';
import { ReactComponent as Play} from '../assets/img/svg/controller-play.svg';
import MoviePlayer from './Movie/MoviePlayer';
import axios from 'axios';
import * as reducerDownload from '../reducers/reducer_download';
import { connect } from 'react-redux';
import Rating from './MoviesList/Rating';

function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    return (h + "h" + m).toString();
  }

 class Curtain extends Component {    

    state = {
        open: false,
        stream_link: ""
    }

    componentDidMount() {
        console.log(this.props.selectedMovie)
    }
 
    handleDownload = async () => {
        console.log("dl")
        this.setState({open: true})
        const response = await axios.post("http://localhost:8080/api/download/torrent", {
            title: this.props.selectedMovie._source.title,
            imdbid: this.props.selectedMovie._source.imdbid,
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
        const duration = convertMinsToHrsMins(movie._source.runtime)
        return (
            <div className="curtain">    
                <input ref="openCurtain" type="checkbox" id="toggle-2"/>

                <div className="left-panel">
                    <img src={movie._source.large_cover_image} alt="Logo" className="left-panel__movie-poster"/> 
                    <div className="left-panel__movie-information">
                        <div className="left-panel__movie-title">
                            {movie._source.title} ({movie._source.year})
                        </div>
                        <div className="left-panel__movie-runtime">
                            {duration}
                        </div>
                        <div className="left-panel__movie-rating">
                            {/* <Rating
                                rating={movie._source.rating} 
                            /> */}
                        </div>
                        <div className="left-panel__movie-genres">
                            {this.movieGenres(movie._source.genres)}
                        </div>
                        <div className="left-panel__movie-description">
                            {movie._source.synopsis}
                        </div>
                    </div>
                </div>
                
                 <div className="right-panel">
                    <img src={movie._source.large_cover_image} alt="Logo" className="right-panel__movie-poster"/> 
                </div>
                
                <div className="prize">
                    <MoviePlayer stream_link={this.state.stream_link} />
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
