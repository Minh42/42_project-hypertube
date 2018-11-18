import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchAction } from '../../reducers/reducer_search';
import { initMoviesAction } from '../../reducers/reducer_search';
import { ReactComponent as Glass} from '../../assets/img/svg/magnifying-glass.svg';
import { withNamespaces } from 'react-i18next';
import PreviewResult from './PreviewResult';
  
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	async handleChange(e) {
		await this.setState({
		    input: e.target.value
        });
        await this.props.searchAction(this.state.input);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.input) {
            this.props.searchAction(this.state.input);
            console.log('props  ', this.props);
        } else {
            console.log('init');
            this.props.initMoviesAction();
        }
    }

    render() {
        const { t } = this.props;
        console.log('loc' , this.props.history.location )
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
        {this.props.history.location.pathname !== '/homepage' && <PreviewResult preview={this.props.preview} history={this.props.history}></PreviewResult> }
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

function mapStateToProps(state) {
    return {
        preview: state.search.results
    };
}

export default withNamespaces('common')(connect(mapStateToProps, mapDispatchToProps)(SearchBar));