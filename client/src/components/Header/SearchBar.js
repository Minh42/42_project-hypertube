import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../../reducers/reducer_search';
import { ReactComponent as Glass} from '../../assets/img/svg/magnifying-glass.svg';
  
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleChange(e) {
		this.setState({
		  input: e.target.value
		})
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.input) {
            this.props.searchAction(this.state.input);
        }

    }

    render() {
        return (
            <form action="#" className="search" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder="Search for movies..." 
                    onChange={this.handleChange}
                    value={this.state.input}
                />
                <button className="search__button" onClick={this.handleSubmit}>
                    <Glass fill='#999'/>
                </button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ searchAction : searchAction }, dispatch);
} 

export default connect(null , mapDispatchToProps)(SearchBar);