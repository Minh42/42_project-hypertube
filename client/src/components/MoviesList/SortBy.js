import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortByAction } from '../../reducers/reducer_filters';
import { bindActionCreators } from 'redux';

import { withNamespaces } from 'react-i18next';
  
class SortBy extends Component { 

    constructor(props) {
		super(props);

		this.state = {
			sortby : "relevance"
		}

		this.handleSort = this.handleSort.bind(this);
    }
    
    componentDidMount() {
        if (this.props.sort) {
            this.setState({
                sortby: this.props.sort
            })
            this.props.SortByAction(this.props.sort, this.props.history)
        } else {
            this.setState({
                sortby : "relevance"
            });
            this.props.SortByAction(this.state.sortby, this.props.history)
        }
	}

	handleSort(event) {
		this.setState({
			sortby: event.target.value
		})
		this.props.SortByAction(event.target.value, this.props.history)
	}
    
    render() {
        const { t } = this.props;
        return (
            <div className="movies-filters__sort">
                <select className="movies-filters__sort--select pointer" id="select" name="sortby" onChange={this.handleSort} value={this.state.sortby}>
					<option value="relevance">{ t('SortBy.relevance', { framework: "react-i18next" }) }</option>
					<option value="latest">{ t('SortBy.latest', { framework: "react-i18next" }) }</option>
					<option value="earliest">{ t('SortBy.earliest', { framework: "react-i18next" }) }</option>
				</select>
            </div>
            );
        }
}
    
    function mapStateToProps(state) {
        return {
            sort: state.filters.sortby
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({ 
            SortByAction: SortByAction
        }, dispatch);
    }
    
export default withNamespaces('common')(connect(mapStateToProps, mapDispatchToProps)(SortBy));