import React from 'react';

const RenderField = (field) => {
    const { meta: { touched, error } } = field;
    return (
        <div className="card__form--field">
            <label className="card__form--input-label">{field.label}</label>
            <input
                className="card__form--input-input"
                type={field.type}
                placeholder={field.placeholder}
                { ...field.input}
            />
            <div className= "card__form--input-error">
                {touched ? error : ''}
            </div>
        </div>
	)
}

export default RenderField;