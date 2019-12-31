import React from 'react'
import ReactDOM from 'react-dom'
import TaskItem from "./TaskItem"
import todos from '../api/data'

export default class CheckTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(id){
       this.setState(({todos}) =>{
       const updatedTodos =  todos.map( todo => {
            if(todo.id === id){
                return{
                    ...todo,
                    completed:!todo.completed,
                    
                }
               
            }
            return todo;      
        })
            console.log("PrevState",{...todos});
            console.log("NewState",updatedTodos);  
            return {
                todos: updatedTodos
            }
       })
    }
    render(){
        let todoItems = this.state.todos;
        return (
            <React.Fragment>
                {todoItems.map((todo, key) => {
                  return (
                  <React.Fragment key={key}>
                  <TaskItem handleChange={this.handleChange} task={todo.task} id = {todo.id}/>
                  <br/>
                  </React.Fragment>
                  )
                })}
            </React.Fragment>
        )
    }
}