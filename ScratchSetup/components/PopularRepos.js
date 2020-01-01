import React from 'react'
import ReactDOM from 'react-dom'
import fetchRepos from '../api/api'

function LanguageNav(props){
    const languages = ["All","Javascript","C","C++","C#","Ruby","Python"];
    const {selecetedLanguage,handleClick} = props;
    return(
        <ul className="flex-center">
        {languages.map( language => ( <li style= {selecetedLanguage===language?{color:'rgb(187, 46, 31)'}:null} key={language} ><button onClick={()=>handleClick(language)} className="btn-clear nav-link">{language}</button></li>))}
        </ul>
    )
}

export default class PopularRepos extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selecetedLanguage:"All",
            repos:null,
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
            repos:null,
            error:null
        })

        fetchRepos(selecetedLanguage)
            .then(repos => {
                this.setState({
                    repos,
                    error:null
                })
            })
            .catch(()=>{
                console.warn("Error fetching repos!!",error);
                this.setState({error:"Error Fetching Repos"});
            })
    }

    isLoading(){
        if(!this.state.repos && ! this.state.error)
            return true;
    }

    render(){
        
        const {selecetedLanguage,repos,error} = this.state;
        return(
            <React.Fragment>
                <LanguageNav handleClick={this.handleClick} selecetedLanguage={selecetedLanguage}/>
                {this.isLoading() &&<p>Loading...</p>}
                {repos &&<pre>{JSON.stringify(this.state.repos,null,2)}</pre>}
                {error && <p>error</p>}
            </React.Fragment>
        )
    }
}