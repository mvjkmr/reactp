import React from 'react'
import ReactDOM from 'react-dom'
import CheckTask from '../components/CheckTask'
import  './index.css'

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
            <h1>Hello World!!!</h1>
            <CheckTask/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))