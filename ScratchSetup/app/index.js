import React from 'react'
import ReactDOM from 'react-dom'
import CheckTask from '../components/CheckTask'
import PopularRepos from '../components/PopularRepos'
import PersonalInfo from '../components/PersoanlInfo'
import  './index.css'

class App extends React.Component{
    render(){
        return(
            <React.Fragment>
            <h1>ReactP</h1>
            {/* <CheckTask/> */}
            {/* <PopularRepos/> */}
            <PersonalInfo/>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))