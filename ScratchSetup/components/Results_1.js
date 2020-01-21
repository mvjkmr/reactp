import React from 'react'
import {battle} from '../api/api'
import {FaUser, FaUsers,FaUserFriends,FaCode,FaMapMarkerAlt,FaSuitcase} from 'react-icons/fa'


function PlayerCard(props){
    const {profile,score} = props;
    const {avatar_url,login,name,location,company,followers,following,public_repos,html_url} = {...profile};
    return(
        <div className='column bg-light'>
            <div className='repo'> 
            <img
                            className='avatar'
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
            />
            <h2 className='center-text'>
                <a className='link' href={html_url}>{login}</a>
            </h2>
            <h2 className='header-sm center-text'>
               Score : {score}
            </h2>
            </div>
            <ul className='card-list'>
            <li>
                            <FaUser color='rgb(255,191,116)' size={22}/>{name?name:login}
            </li>
            <li>
                            <FaMapMarkerAlt color='rgb(255,11,11)' size={22}/>{location}
            </li>
            <li>
                            <FaSuitcase color='rgb(255,191,16)' size={22}/>{company}
            </li>
            <li>
                            <FaUsers color='rgb(255,11,116)' size={22}/>{followers} followers
            </li>
            <li>
                            <FaUserFriends color='rgb(255,191,6)' size={22}/>{following} following
            </li>
            <li>
                            <FaCode color='rgb(25,11,116)'  size={22}/>{public_repos} repositories
            </li>
            </ul>
        </div>
    )
}


export default class Results extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            winner:null,
            loser:null,
            error:null,
            isLoading:true
        }
    }

    componentDidMount(){
        const {playerOne,playerTwo} = this.props;
       
            battle([playerOne,playerTwo])
            .then((players)=> {
                this.setState({
                    winner:players[0],
                    loser:players[1],
                    isLoading:false
                })
            })
            .catch(message =>{
                {
                    this.setState({
                        error:message,
                        isLoading:false
                    })
                }
            })

        

    }
    render(){

        const {winner,loser,isLoading} = this.state;

        if(isLoading)
            return null;

        return(
            
            <div className='row'>
            
            <div>
            <h4 className='header-lg center-text'> Winner </h4>
                <PlayerCard {...winner} />
            </div>
            
            <div>
            <h4 className='header-lg center-text'>Looser</h4>
                <PlayerCard {...loser}/>
            </div>
            </div>
        )
    }
}