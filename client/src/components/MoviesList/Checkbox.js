import React, { Component } from 'react';

class Checkbox extends Component {
    render(){
        console.log(this.props)
        const { label, onClick, checked } = this.props;
        if (checked) {
            return (
                <div className='checkbox'>
                    <label>
                        <input
                            type='checkbox'
                            value={label}
                            onClick={onClick}
                            checked
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
        
    }
}

export default Checkbox;

