import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortByAction } from '../../reducers/reducer_filters';
import { bindActionCreators } from 'redux';
  
class SortBy extends Component { 

    constructor(props) {
		super(props);

		this.state = {
			sortby : "relevance"
		}

		this.handleSort = this.handleSort.bind(this);
    }
    
    componentDidMount() {
        console.log(this.props.sort)
        if (this.props.sort) {
            this.setState({
                sortby: this.props.sort
            })
            this.props.SortByAction(this.props.sort, this.props.history)
        } else {
            this.state = {
                sortby : "relevance"
            }
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
        return (
            <div className="movies-filters__sort">
                <select id="select" name="sortby" onChange={this.handleSort} value={this.state.sortby}>
					<option value="relevance">Relevance</option>
					<option value="latest">Latest Releases</option>
					<option value="earliest">Earliest Releases</option>
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
    
export default connect(mapStateToProps, mapDispatchToProps)(SortBy);