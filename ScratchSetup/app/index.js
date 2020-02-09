import React from 'react'
import ReactDOM from 'react-dom'
import  './index.css'
import CheckTask from '../components/CheckTask'
import PersonalInfo from '../components/PersoanlInfo'
// import Battle from '../components/Battle'
// import Results from '../components/Results'
// import PopularRepos from '../components/PopularRepos'
import {ThemeProvider} from '../Contexts/theme'
import Nav from '../components/Nav'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loading from '../components/Loading'

const PopularRepos = React.lazy(() => import('../components/PopularRepos'));
const Battle = React.lazy(() => import('../components/Battle'));
const Results = React.lazy(() => import('../components/Results'));

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            theme:'light',
            toggleTheme: () => {
                this.setState(({theme})=> ({
                   theme: theme === 'light'?'dark':'light'
                }))
            }
        }
    }
    render(){
        return(
            <Router >
            <ThemeProvider value={this.state}>
            <div className={this.state.theme}>
            <div className="container">
            <h1>ReactP</h1>
            <Nav/>
            <React.Suspense fallback={<Loading/>}>
            <Switch>
            <Route exact path='/' component ={PopularRepos}/>
            <Route exact path='/battle' component ={Battle}/>
            <Route path='/battle/results' component ={Results}/>
            <Route render={()=><h1>404</h1>}/>
            </Switch>
            </React.Suspense>
            {/* <CheckTask/> */}
            {/* <PopularRepos/> */}
            {/* <PersonalInfo/> */}
            {/* <Battle/> */}
            </div>
            </div>
            </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))