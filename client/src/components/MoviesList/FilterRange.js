import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';
import { FilterRatingAction, FilterYearsAction } from '../../reducers/reducer_filters';
import { bindActionCreators } from 'redux';

import { withNamespaces } from 'react-i18next';
  
class FilterRange extends Component { 

    constructor(props) {
		super(props);
	
		this.state = {
		  valueRating: {
			min: 0,
			max: 10,
		  },
		  valueYears: {
			min: 1900,
			max: 2018,
		  }
		};
		this.handleRating = this.handleRating.bind(this);
		this.handleYears = this.handleYears.bind(this);
    }

    componentDidMount() {
        this.setState ({
            valueRating: {
            min: (this.props.ratingRange === undefined) ? 0 : this.props.ratingRange.min,
            max: (this.props.ratingRange === undefined) ? 10 : this.props.ratingRange.max,
            },
            valueYears: {
            min: (this.props.yearsRange === undefined) ? 1900 : this.props.yearsRange.min,
            max: (this.props.yearsRange === undefined) ? 2018 : this.props.yearsRange.max,
            }
        })
    }

    handleRating(values) {
        this.props.FilterRatingAction(values, this.props.history);
    }

    handleYears(values) {
          this.props.FilterYearsAction(values, this.props.history);
    }

    handleChangeRating = (value) => {
        if (value.min >= 0 && value.max <= 10)
            this.setState({ valueRating: value });
    }

    handleChangeYear = (value) => {
        if (value.min >= 1900 && value.max <= 2018)
            this.setState({ valueYears: value });
    }

    render() {
        const { t } = this.props;

        return (
            <div className="movies-filters__range">
                <div>{ t('Range.rating', { framework: "react-i18next" }) }</div>
                <div >
                    <InputRange
                        maxValue={10}
                        minValue={0}
                        value={this.state.valueRating}
                        onChange={this.handleChangeRating}
                        onChangeComplete={value => this.handleRating(value)} />
                </div>
                <label>{ t('Range.years', { framework: "react-i18next" }) }</label>
                <div >
                    <InputRange
                        maxValue={2018}
                        minValue={1900}
                        value={this.state.valueYears}
                        onChange={this.handleChangeYear}
                        onChangeComplete={value => this.handleYears(value)} />
                </div>
            </div>
            );
        }
    }
    
    function mapStateToProps(state) {
        return {
            ratingRange: state.filters.ratingFilter,
            yearsRange: state.filters.yearsFilter
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({ 
            FilterRatingAction: FilterRatingAction,
            FilterYearsAction: FilterYearsAction
        }, dispatch);
    }
    
export default withNamespaces('common')(connect(mapStateToProps, mapDispatchToProps)(FilterRange));
