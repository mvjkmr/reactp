import React from 'react'
import fetchRepos from '../api/api'
import PropTypes from 'prop-types'
import {FaUser,FaStar,FaCodeBranch,FaExclamationTriangle} from 'react-icons/fa'
import Card from './Card'

function LanguageNav(props){
    const languages = ["All","Javascript","C","C++","C#","Ruby","Python"];
    const {selecetedLanguage,handleClick} = props;
    return(
        <ul className="flex-center">
        {languages.map( language => ( <li style= {selecetedLanguage===language?{color:'rgb(187, 46, 31)'}:null} key={language} ><button onClick={()=>handleClick(language)} className="btn-clear nav-link">{language}</button></li>))}
        </ul>
    )
}

function RepoDetails(props){
    const {owner,stargazers_count,forks,open_issues} = props.repo;
                const {login} = owner;
    return(
        <React.Fragment>
            <ul className='card-list'>
                        <li>
                            <FaUser color='rgb(255,191,116)' size={22}/>
                <a href={`https://github.com/${login}`}>{login}</a>
                        </li>
                        <li>
                            <FaStar color='rgb(255,215,0)' size={22}/>
                {stargazers_count.toLocaleString()} stars
                        </li>
                        <li>
                            <FaCodeBranch color='rgb(129,195,245)' size={22}/>
                            {forks.toLocaleString()} forks
                         </li>
                         <li>
                            <FaExclamationTriangle color='rgb(241,138,147)' size={22}/>
                            {open_issues.toLocaleString()} open
                         </li>
            </ul>
        </React.Fragment>
    )
}

RepoDetails.propTypes = {
    repo: PropTypes.object.isRequired
}

function ReposGrid({repos}){
    console.log(repos);
    return(
        <ul className="grid space-around">
            {repos.map((repo,index) => {
                const {name,owner,html_url,stargazers_count,forks,open_issues} = repo;
                const {login, avatar_url} = owner;

                return(
                    <li key={html_url}>
                        <Card 
                            header={`#${index+1}`}
                            avatar={avatar_url}
                            login={login}
                            html_url={html_url}
                        >
                        <RepoDetails repo={repo}/>
                        </Card>
                    </li>

                )

            })}
        </ul>
    )
}

ReposGrid.propTypes = { 
    repos : PropTypes.array.isRequired
}

export default class PopularRepos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selecetedLanguage:"All",
            repos:{},
            error:null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.handleClick(this.state.selecetedLanguage);
    }

    handleClick(selecetedLanguage){
        this.setState({
            selecetedLanguage,
            error:null
        })

        if(!this.state.repos[selecetedLanguage])
        {
            fetchRepos(selecetedLanguage)
            .then(data => {
                this.setState(({repos}) => {
                    return {  
                        repos: {
                            ...repos,
                            [selecetedLanguage]:data
                        }
                    }

                    
                })
                
            })
            .catch(()=>{
                console.warn("Error fetching repos!!",error);
                this.setState({error:"Error Fetching Repos"});
            })
    }
}

    isLoading(){
        const {selecetedLanguage,repos,error} = this.state;
        if(!repos[selecetedLanguage] && !error)
            return true;
    }

    render(){
        
        const {selecetedLanguage,repos,error} = this.state;
        return(
            <React.Fragment>
                <LanguageNav handleClick={this.handleClick} selecetedLanguage={selecetedLanguage}/>
                {this.isLoading() &&<p>Loading...</p>}
                {repos[selecetedLanguage] && <ReposGrid repos={repos[selecetedLanguage]}/> }
                {error && <p className='center-text error'>error</p>}
            </React.Fragment>
        )
    }
}