import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checkbox extends Component {
    render(){
        const { label, onClick, genreFilter } = this.props;
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

export default connect(mapStateToProps, null)(Checkbox);

