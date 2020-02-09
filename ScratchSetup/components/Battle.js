import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy, FaUser, FaTimesCircle} from 'react-icons/fa'
import PropTypes from 'prop-types'
import Results from '../components/Results'
import {battle} from '../api/api'
import {ThemeConsumer} from '../Contexts/theme'
import {Link} from 'react-router-dom'


function Instructions(){
    return(
        <ThemeConsumer>
            {({theme})=>(
                 <div className="instructions-container">
                 <h1 className='center-text header-lg'>
                     Instructions
                 </h1>
                 <ol className='container-sm grid center-text battle-instructions'>
                     <li>
                         <h3 className='header-sm'>Enter two Github users</h3>
                             <FaUser className={`bg-${theme}`} color='rgb(255,191,116)' size={140}/>
                     </li>
                     <li>
                         <h3 className='header-sm'>Battle</h3>
                             <FaFighterJet className={`bg-${theme}`} color='#727272' size={140}/>
                     </li>
                     <li>
                         <h3 className='header-sm'>See the winners</h3>
                             <FaTrophy className={`bg-${theme}`} color='rgb(255,215,0)' size={140}/>
                     </li>
                 </ol>
             </div>
            )}
        </ThemeConsumer>
    )
}


// new way class properties this does not have constructor function. Still new an in a propsal
class PlayerInput extends React.Component{
   

    state = {
        username: ''
    }
    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(this.state.username);
    }

    handleChange = (event) => {
        this.setState({
            username:event.target.value
        })
    }

    render(){
        return(
            <ThemeConsumer>
                {({theme}) => (
                     <form className='column player' onSubmit={this.handleSubmit}>
                     <label htmlFor={this.props.label} className='player-lable'>
                         {this.props.label}
                     </label>
                     <div className='row player-inputs'>
                         <input 
                             type='text'
                             id={this.props.label}
                             className={`input-${theme}`}
                             placeholder='github username'
                             autoComplete='off'
                             onChange={this.handleChange}
                             value={this.state.username}
                             />
                             <button
                                 className={`btn ${theme === 'dark'?'light-btn' :'btn-dark'}`}
                                 type='submit'
                                 disabled={!this.state.username}
                                 >
                                 Submit
                             </button>
                     </div>
                 </form>
                )}
            </ThemeConsumer>
        )
    }
}

PlayerInput.propTypes = {
    label : PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

function PlayerPreview({username,onReset,label}){
    console.log(username,onReset,label);
    return(
        <ThemeConsumer>
            {({theme}) =>(
                <div className='column player'>
                <h3 className='player-lable'>{label}</h3>
                <div className={`row bg-${theme}`}>
                    <div className='player-info'>
                        <img
                            className='avatar-sm'
                            src={`https://github.com/${username}.png?size=200`}
                            alt={`Avatar for ${username}`}
                         />
                         <a 
                            className='link'
                            href={`https://github.com/${username}`}
                            
                            >{username}</a>
                    </div>
                    <button className='btn-clear flex-center' onClick={onReset}>
                        <FaTimesCircle color='rgb(194,57,42)' size={26} />
                    </button>
                </div>
            </div>
            )}
        </ThemeConsumer>
        

    )

}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playerOne:null,
            playerTwo:null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id,player){
        this.setState({
            [id]:player
        })
    }

    handleReset(id){
        this.setState({
            [id]:null
        })
    }
    render(){
        const {playerOne, playerTwo} = this.state;


        // commented to implement router insted, even removed battle from variables
        // if(battle){
        //     return(
        //         <Results playerOne={playerOne} playerTwo={playerTwo} handleClick={()=>{
        //             this.setState({
        //                 playerOne:null,
        //                 playerTwo:null,
        //                 battle:false
        //             })
        //         }}/>
        //     )
        // }

        return (
            <React.Fragment>
                <Instructions/>
                <div className='player-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                    <div className='row space-around'>
                    {!playerOne ? (
                        <PlayerInput 
                        label='Player One'
                        onSubmit={player => this.handleSubmit('playerOne',player)} 
                    />
                    ):<PlayerPreview username={playerOne} label='Player One' onReset={() => this.handleReset('playerOne')} />}
                    {!playerTwo ? (
                        <PlayerInput 
                        label='Player Two'
                        onSubmit={player => this.handleSubmit('playerTwo',player)} 
                    />
                    ):<PlayerPreview username={playerTwo} label='Player Two' onReset={() => this.handleReset('playerTwo')} />}
                    </div>
                    {playerOne && playerTwo && (
                        <Link 
                        className='btn btn-dark btn-space'
                        to={{
                            pathname: '/battle/results',
                            search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                        }}
                        >
                            Battle
                        </Link>
                    )}
                </div>
            </React.Fragment>
        )
    }

}