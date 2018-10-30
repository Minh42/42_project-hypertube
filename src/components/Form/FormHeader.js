import React from 'react';

const FormHeader = (props) => {
    return (
        <div className="card__text">
            <h4>
                {props.heading1}
            </h4>
            <h2 className="card__text-span">
                <span className="card__text-span--1">
                    {props.heading2}
                </span>
            </h2>  
        </div>
	)
}

export default FormHeader;




