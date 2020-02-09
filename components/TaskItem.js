import React from 'react'

export default function TaskItem(props){
    const {task, id, handleChange} = props;
    return(
        <React.Fragment>
        <input type="checkbox" onChange={() => handleChange(id)} />
        <span>{task}</span>
        </React.Fragment>
    )
}