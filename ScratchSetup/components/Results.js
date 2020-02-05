import React from 'react'
import {battle} from '../api/api'
import {FaUser, FaUsers,FaUserFriends,FaCode,FaMapMarkerAlt,FaSuitcase} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'

// 2. commenting class component and uncommenting functional comp as new comp 'Tooltip' is created.

// class ProfileList extends React.Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             hoveringLocation : false,
//             hoveringCompany : false
//         }

//         this.mouseOver = this.mouseOver.bind(this);
//         this.mouseOut = this.mouseOut.bind(this);
//     }

//     mouseOver(id){
//         console.log(id);
//         this.setState({
//             [id]:true
//         })
//     }
//     mouseOut(id){
//         console.log(id);
//         this.setState({
//             [id]:false
//         })
//     }

//     render(){
//        const {profile} = this.props;
//        const {name,login,location,company,followers,following,public_repos} = profile;
//        const {hoveringCompany,hoveringLocation} = this.state;
//        return(
//         <ul className='card-list'>
//         <li>
//                         <FaUser color='rgb(255,191,116)' size={22}/>{name?name:login}
//         </li>
//         {location && <li style= {styles.container} onMouseOver={()=>this.mouseOver('hoveringLocation')} onMouseOut={()=>this.mouseOut('hoveringLocation')}>
//                         {hoveringLocation && <div style={styles.tooltip}>User's Location</div>}
//                         <FaMapMarkerAlt color='rgb(255,11,11)' size={22}/>{location}
//         </li>}
//         {company && <li style= {styles.container} onMouseOver={()=>this.mouseOver('hoveringCompany')} onMouseOut={()=>this.mouseOut('hoveringCompany')}>
//                         {hoveringCompany && <div style={styles.tooltip}>User's Company</div>}
//                         <FaSuitcase color='rgb(255,191,16)' size={22}/>{company}
//         </li>}
//         <li>
//                         <FaUsers color='rgb(255,11,116)' size={22}/>{followers} followers
//         </li>
//         <li>
//                         <FaUserFriends color='rgb(255,191,6)' size={22}/>{following} following
//         </li>
//         <li>
//                         <FaCode color='rgb(25,11,116)'  size={22}/>{public_repos} repositories
//         </li>
//         </ul>
//        )
//     }
// }

// 1. moved to class component for hovering functionality

function ProfileList({profile}){
    const {name,login,location,company,followers,following,public_repos} = profile;
    return(
        <React.Fragment>
            <ul className='card-list'>
            <li>
                            <FaUser color='rgb(255,191,116)' size={22}/>{name?name:login}
            </li>
            {location && (
            <React.Fragment>
            <Tooltip hoverText='Users Location'>
            
                            <FaMapMarkerAlt color='rgb(255,11,11)' size={22}/>{location}
            
            </Tooltip>
            </React.Fragment>)}
            {company && (
            <React.Fragment>
             <Tooltip hoverText='Users Company'>
            
                            <FaSuitcase color='rgb(255,191,16)' size={22}/>{company}
            
            </Tooltip>
            </React.Fragment>)}
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
            return <Loading text='battling' speed={300}/>
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
                  <button className='btn btn-dark btn-space' onClick={this.props.handleClick}>Reset</button>      
        </div>
        )
    }
}

Results.propTypes = {
    playerOne : PropTypes.string.isRequired,
    playerTwo : PropTypes.string.isRequired,
    handleClick : PropTypes.func.isRequired
}