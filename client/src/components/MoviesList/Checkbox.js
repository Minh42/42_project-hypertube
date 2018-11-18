import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withNamespaces } from 'react-i18next';

class Checkbox extends Component {
    render(){
        const { label, onClick, genreFilter } = this.props;
        const { t } = this.props;
        if (genreFilter && genreFilter.length > 0) {
            if (genreFilter.includes(label)) {
                    return (
                        <div className="movies-filters__genders--checkbox">
                            <label className="movies-filters__genders--checkbox-label">
                                <input
                                    className="movies-filters__genders--checkbox-input"
                                    type='checkbox'
                                    value={ label }
                                    onClick={onClick}
                                    defaultChecked
                                />
                                <span className="movies-filters__genders--checkbox-span">{t(label, { framework: "react-i18next" })}</span>
                            </label>
                        </div>
                    )
                } else {
                    return (
                        <div className="movies-filters__genders--checkbox">
                            <label className="movies-filters__genders--checkbox-label">
                                <input
                                    className="movies-filters__genders--checkbox-input"
                                    type='checkbox'
                                    value={ label }
                                    onClick={onClick}
                                />
                                <span className="movies-filters__genders--checkbox-span">{t(label, { framework: "react-i18next" })}</span>
                            </label>
                        </div>
                    )
                }
    } else {
            return (
                <div className="movies-filters__genders--checkbox">
                    <label className="movies-filters__genders--checkbox-label pointer">
                        <input
                            className="movies-filters__genders--checkbox-input pointer"
                            type='checkbox'
                            value={ label }
                            onClick={onClick}
                        />
                        <span className="movies-filters__genders--checkbox-span">{t(label, { framework: "react-i18next" })}</span>
                    </label>
                </div>
            )
        }
    } 
}

function mapStateToProps(state) {
    return {
        genreFilter: state.filters.genreFilter
    }
  }

export default withNamespaces('common')(connect(mapStateToProps, null)(Checkbox));

