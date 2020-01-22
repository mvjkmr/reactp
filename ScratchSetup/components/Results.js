import React from 'react'
import {battle} from '../api/api'
import {FaUser, FaUsers,FaUserFriends,FaCode,FaMapMarkerAlt,FaSuitcase} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'

function ProfileList(props){
    const {name,login,location,company,followers,following,public_repos} = props.profile;
    return(
        <React.Fragment>
            <ul className='card-list'>
            <li>
                            <FaUser color='rgb(255,191,116)' size={22}/>{name?name:login}
            </li>
            {location && <li>
                            <FaMapMarkerAlt color='rgb(255,11,11)' size={22}/>{location}
            </li>}
            {company && <li>
                            <FaSuitcase color='rgb(255,191,16)' size={22}/>{company}
            </li>}
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
        </React.Fragment>
    )
}

ProfileList.propTypes = {
    profile : PropTypes.object.isRequired
}

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
            return <p>Loading...</p>
        if(error)
            return <p className='center-text error'>{error}</p>
        return(
            <div>
            {/* <pre>{JSON.stringify(this.state,null,2)}</pre> */}
            <div className="grid space-around">
            


                <Card 
                    header={winner.score === loser.score? 'Tie':'Winner'}
                    subHeader= {`Score : ${winner.score}`}
                    avatar={winner.profile.avatar_url}
                    login={winner.profile.login}
                    html_url={winner.profile.html_url}
                    >
                        <ProfileList profile={winner.profile}/>
                    </Card>
            
                    <Card 
                    header={winner.score === loser.score? 'Tie':'Loser'}
                    subHeader= {`Score : ${loser.score}`}
                    avatar={loser.profile.avatar_url}
                    login={loser.profile.login}
                    html_url={loser.profile.html_url}
                    >
                        <ProfileList profile={loser.profile}/>
                    </Card>
                        
            </div>
        </div>
        )
    }
}