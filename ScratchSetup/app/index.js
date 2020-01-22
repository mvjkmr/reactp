import React from 'react'
import ReactDOM from 'react-dom'
import CheckTask from '../components/CheckTask'
import PopularRepos from '../components/PopularRepos'
import PersonalInfo from '../components/PersoanlInfo'
import Battle from '../components/Battle'
import  './index.css'

class App extends React.Component{
    render(){
        return(
            <div className="container">
            <h1>ReactP</h1>
            {/* <CheckTask/> */}
            <PopularRepos/>
            {/* <PersonalInfo/> */}
            {/* <Battle/> */}
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))