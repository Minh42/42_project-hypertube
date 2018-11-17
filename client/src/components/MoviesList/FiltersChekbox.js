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
      drama: false,
      comedy: false,
      items: []
    }
  }

  // componentDidMount() {
  //   var arrayGenre = this.props.genreFilter;
  //   if (arrayGenre) {
  //     for (var i = 0; i < arrayGenre.length; i++) {
  //       console.log(arrayGenre[i])
  //       if (arrayGenre[i] === "Drama") {
  //         this.setState ({
  //           drama: true
  //         })
  //       } 
  //       if (arrayGenre[i] === "Comedy") {
  //         this.setState ({
  //           comedy: true
  //         })
  //       }   
  //     }
  //   }
  //   console.log(this.props.genreFilter);
  // }

  handleClick(genre) {
    console.log(genre)

    if (this.state.items.length > 0) {
      for (var i = 0; i < this.state.items.length; i++) {
        if (genre === this.state.items[i]) {
          this.state.items.splice(i, 1);
          this.setState({
            items: this.state.items
          })
          break;
        } if (i + 1 === this.state.items.length) {
          this.state.items.push(genre)
          this.setState({
            items: this.state.items
          })
          break;
        }
      }
    } else {
      this.state.items.push(genre)
      this.setState({
        items: this.state.items
      })
    }

    this.props.gendersAction(this.state.items, this.props.history);
  }

  mapGenders() {
    const genresFilters = genres.map((genre, i) => (
        <Checkbox
          key={i}
          label={genre}
          onClick={() => this.handleClick(genre)}
          checked={this.props.genreFilter}
        />
    ))
    return (
      <div>
          {genresFilters} 
      </div>
  );
  }

    render(){
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