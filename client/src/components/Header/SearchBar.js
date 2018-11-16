import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../../reducers/reducer_search';
import { initMoviesAction } from '../../reducers/reducer_search';
import { ReactComponent as Glass} from '../../assets/img/svg/magnifying-glass.svg';
import { translate } from 'react-i18next';
  
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
        console.log(this.state.input)
        if (this.state.input) {
            this.props.searchAction(this.state.input);
        } else {
            this.props.initMoviesAction();
        }
    }

    render() {
        const { t, i18n } = this.props;
        return (
            <form action="#" className="search" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder={ t('Header.searchBar', { framework: "react-i18next" }) }
                    onChange={this.handleChange}
                    value={this.state.input}
                />
                <button className="search__button" onClick={this.handleSubmit}>
                    <Glass fill='rgba(216, 3, 81, 0.733)'/>
                </button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators({ 
        searchAction : searchAction,
        initMoviesAction : initMoviesAction
    }, dispatch);
} 

export default translate('common')(connect(null , mapDispatchToProps)(SearchBar));