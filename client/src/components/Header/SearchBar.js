import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { searchAction } from '../../reducers/reducer_search';
import { initMoviesAction } from '../../reducers/reducer_search';
import { selectMovie } from '../../reducers/reducer_movies';
import { ReactComponent as Glass} from '../../assets/img/svg/magnifying-glass.svg';
import { withNamespaces } from 'react-i18next';
import PreviewResult from './PreviewResult';
  
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            hasFocus:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	async handleChange(e) {
        const { t } = this.props;
		await this.setState({
		    input: e.target.value
        });
        await this.props.searchAction(this.state.input, this.props.history, t);
    }
    
    handleSubmit(e) {
        const { t } = this.props;
        e.preventDefault();
        if (this.state.input) {
            this.props.searchAction(this.state.input, this.props.history, t);
        } else {
            this.props.initMoviesAction(this.props.history, t);
        }
    }

    handleFocus = () => {
        this.setState({hasFocus:true})
    }

    handleClickPreview = (movie) => {
        console.log('hidsio ', movie);
        this.props.selectMovie(movie, this.props.history);
        this.setState({hasFocus:false})
    }

    render() {
        const { t } = this.props;
        return (
            <form action="#" className="search" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    className="search__input" 
                    placeholder={ t('Header.searchBar', { framework: "react-i18next" }) }
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    value={this.state.input}
                />
                <button className="search__button" onClick={this.handleSubmit}>
                    <Glass fill='rgba(216, 3, 81, 0.733)'/>
                </button>
        {this.props.history.location.pathname !== '/homepage' && this.state.hasFocus && <PreviewResult preview={this.props.preview} clickPreview={this.handleClickPreview}></PreviewResult> }
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) { 
    return bindActionCreators({ 
        searchAction : searchAction,
        initMoviesAction : initMoviesAction,
        selectMovie : selectMovie
    }, dispatch);
} 

function mapStateToProps(state) {
    return {
        preview: state.search.results
    };
}

export default withNamespaces('common')(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar)));
