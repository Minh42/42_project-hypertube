import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gendersAction } from '../../reducers/reducer_filters';
import Checkbox from './Checkbox';

const genres = ['Drama', 'Comedy', 'Crime', 'Romance', 'Action', 'Thriller', 'Adventure', 'Mystery', 'Fantasy', 'Horror', 'Sci-Fi', 'Biography', 'Animation', 'Family', 'War', 'History', 'Documentary', 'Music', 'Musical', 'Sport']

class FiltersCheckbox extends Component {

  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    if (this.props.genreFilter != undefined) {
      this.setState({
        items: this.props.Filter
      })
    } else {
      this.setState({
        items: []
      })
    }
  }

  handleClick(genre) {
    if (this.props.genreFilter.length > 0) {
      for (var i = 0; i < this.props.genreFilter.length; i++) {
        if (genre === this.props.genreFilter[i]) {
          this.props.genreFilter.splice(i, 1);
          this.setState({
            items: this.props.genreFilter
          })
          break;
        } if (i + 1 === this.props.genreFilter.length) {
          this.props.genreFilter.push(genre)
          this.setState({
            items: this.props.genreFilter
          })
          break;
        }
      }
    } else {
      this.props.genreFilter.push(genre)
      this.setState({
        items: this.props.genreFilter
      })
    }
    this.props.gendersAction(this.props.genreFilter, this.props.history);
  }

  mapGenders() {
    const genresFilters = genres.map((genre, i) => (
        <Checkbox
          key={i}
          label={genre}
          onClick={() => this.handleClick(genre)}
        />
    ))
    return (
      <div>
          {genresFilters} 
      </div>
  );
  }

    render(){
      // console.log(this.props.genreFilter)
      return (
        <div className="movies-filters__genders">
            <label>Movie's genders</label><br></br>
            {this.mapGenders()}
        </div>
      )
    }
}

function mapStateToProps(state) {
  return {
      genreFilter: state.filters.genreFilter
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ gendersAction : gendersAction }, dispatch);
} 

export default connect(mapStateToProps, mapDispatchToProps)(FiltersCheckbox);