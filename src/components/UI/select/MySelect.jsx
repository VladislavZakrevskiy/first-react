import React from 'react';
import classes from './MySelect.module.css'

const MySelect = ({options, defaultValue, value, onChanges}) => {
    return (
        <select
            className={classes.MySelect}
            value={value}
            onChange ={event => onChanges(event.target.value)}
        >
            <option className={classes.MyOption} disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option className={classes.MyOption} key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;

