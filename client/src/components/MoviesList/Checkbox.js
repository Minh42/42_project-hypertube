import React, { Component } from 'react';
import { connect } from 'react-redux';

import { translate } from 'react-i18next';

class Checkbox extends Component {
    render(){
        const { label, onClick, genreFilter } = this.props;
        const { t, i18n } = this.props;
        if (genreFilter && genreFilter.length > 0) {
            if (genreFilter.includes(label)) {
                    return (
                        <div className='checkbox'>
                            <label>
                                <input
                                    type='checkbox'
                                    value={label}
                                    onClick={onClick}
                                    defaultChecked
                                />
                                {label}
                            </label>
                        </div>
                    )
                } else {
                    return (
                        <div className='checkbox'>
                            <label>
                                <input
                                    type='checkbox'
                                    value={label}
                                    onClick={onClick}
                                />
                                {label}
                            </label>
                        </div>
                    )
                }
    } else {
            return (
                <div className='checkbox'>
                    <label>
                        <input
                            type='checkbox'
                            value={label}
                            onClick={onClick}
                        />
                        {label}
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

export default translate('common')(connect(mapStateToProps, null)(Checkbox));

