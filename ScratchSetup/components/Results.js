import React from 'react'
import {battle} from '../api/api'
import {FaUser, FaUsers,FaUserFriends,FaCode,FaMapMarkerAlt,FaSuitcase} from 'react-icons/fa'

export default class Results extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            winner : null,
            loser : null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        const {playerOne,playerTwo} = this.props;
        battle([playerOne,playerTwo])
            .then(players => {
                this.setState({
                    winner:players[0],
                    loser:players[1],
                    loading:false
                })
            })
            .catch(message => {
                this.setState({
                    error:message,
                    loading:false
                })
            })
    }
    render(){
        const {winner,loser,loading,error} = this.state;
        if(loading)
            return <h4 className='header-sm'>Loading...</h4>
        return(
            <div>
            Results
            {/* <pre>{JSON.stringify(this.state,null,2)}</pre> */}
            <div className="grid space-around">
                <div className='repo bg-light' >
                <h4 className='header-lg center-text'> Winner </h4>
                <img
                            className='avatar'
                            src={winner.profile.avatar_url}
                            alt={`Avatar for ${winner.profile.login}`}
                        />
                         <h2 className='header-sm center-text'>
               Score : {winner.score}
            </h2>
                        <h2 className='center-text'>
                <a className='link' href={winner.profile.html_url}>{winner.profile.login}</a>
                        </h2>
                        <ul className='card-list'>
            <li>
                            <FaUser color='rgb(255,191,116)' size={22}/>{winner.profile.name?winner.profile.name:winner.profile.login}
            </li>
            {winner.profile.location && <li>
                            <FaMapMarkerAlt color='rgb(255,11,11)' size={22}/>{winner.profile.location}
            </li>}
            {winner.profile.company && <li>
                            <FaSuitcase color='rgb(255,191,16)' size={22}/>{winner.profile.company}
            </li>}
            <li>
                            <FaUsers color='rgb(255,11,116)' size={22}/>{winner.profile.followers} followers
            </li>
            <li>
                            <FaUserFriends color='rgb(255,191,6)' size={22}/>{winner.profile.following} following
            </li>
            <li>
                            <FaCode color='rgb(25,11,116)'  size={22}/>{winner.profile.public_repos} repositories
            </li>
            </ul>
                </div>
                <div className='repo bg-light'>
                <h4 className='header-lg center-text'> Loser </h4>
                <img
                            className='avatar'
                            src={loser.profile.avatar_url}
                            alt={`Avatar for ${loser.profile.login}`}
                        />
                         <h2 className='header-sm center-text'>
               Score : {loser.score}
            </h2>
                        <h2 className='center-text'>
                <a className='link' href={loser.profile.html_url}>{loser.profile.login}</a>
                        </h2>
                        <ul className='card-list'>
            <li>
                            <FaUser color='rgb(255,191,116)' size={22}/>{loser.profile.name?loser.profile.name:loser.profile.login}
            </li>
            { loser.profile.location && <li>
                            <FaMapMarkerAlt color='rgb(255,11,11)' size={22}/>{loser.profile.location}
            </li>}
            {loser.profile.company && <li>
                            <FaSuitcase color='rgb(255,191,16)' size={22}/>{loser.profile.company}
            </li>}
            <li>
                            <FaUsers color='rgb(255,11,116)' size={22}/>{loser.profile.followers} followers
            </li>
            <li>
                            <FaUserFriends color='rgb(255,191,6)' size={22}/>{loser.profile.following} following
            </li>
            <li>
                            <FaCode color='rgb(25,11,116)'  size={22}/>{loser.profile.public_repos} repositories
            </li>
            </ul>
                </div>
            </div>
        </div>
        )
    }
}