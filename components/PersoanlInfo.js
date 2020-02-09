import React from 'react';

function ProfileForm(props){
    let {firstName,lastName,age,gender,holidaySpot,FavouriteFood} = props.state;
    return(
        <main>
                <form className='column profile'>
                    <div className='row'>
                    <label htmlFor="firstName" className='name-lable'>
                       First Name 
                    </label>
                    <input 
                        type="text"
                        name="firstName"
                        className='input-light'
                        placeholder='Fisrt Name'
                        autoComplete='off'
                        value={firstName}
                        onChange={props.handleChange}
                        />
                    </div>
                    <div className='row'>
                    <label htmlFor="lastName" className='name-lable'>
                       Last Name 
                    </label>
                    <input 
                        type="text"
                        name="lastName"
                        className='input-light'
                        placeholder='Last Name'
                        autoComplete='off'
                        value={lastName}
                        onChange={props.handleChange}
                        />
                    </div>
                    <div className='row'>
                    <label htmlFor="age" className='name-lable'>
                       Age
                    </label>
                    <input 
                        type="text"
                        name="age"
                        className='input-light'
                        placeholder='Age'
                        autoComplete='off'
                        value={age}
                        onChange={props.handleChange}
                        />
                    </div>
                    <div className='row'>
                    <label htmlFor="gener" className='name-lable'>Gender</label>
                    <input
                        className='check-radio'
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={props.handleChange}></input>
                        <label className='value-label' htmlFor="gener" >Male</label>
                        <input
                        className='check-radio'
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={props.handleChange}></input>
                        <label className='value-label' htmlFor="gender" >Female</label>
                    </div>
                    <div className='row'>
                    <label htmlFor="gener" className='name-lable'>Holiday Spot</label>
                    <select type="checkbox" className='select-style' onChange={props.handleChange} value={holidaySpot} name="holidaySpot">
                        <option value="">--Select One--</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Vizag">Vizag</option>
                    </select>
                    </div>
                    <div className='row'>
                    <label htmlFor="gener" className='name-lable'>Favourite Food</label>
                    <input type="checkbox" className='check-radio' name="FavouriteFood" onChange={props.handleChange} value="Veg"/><label className='value-label' htmlFor="FavouriteFood" >Veg</label>
                    <input type="checkbox" className='check-radio' name="FavouriteFood" onChange={props.handleChange} value="Non-Veg"/><label className='value-label' htmlFor="FavouriteFood" >Non-Veg</label>
                    <input type="checkbox" className='check-radio' name="FavouriteFood" onChange={props.handleChange} value="Egg"/><label className='value-label' htmlFor="FavouriteFood" >Egg</label>
                    </div>
                    <button
                    className='btn btn-dark'
                    type='submit'>
                        Sumbit
                    </button>
                </form>
                <hr/>
                <label className='name-lable row'>First Name : {firstName}</label>
                <label className='name-lable row'>Last Name : {lastName}</label>
                <label className='name-lable row'>Age : {age} </label>
                <label className='name-lable row'>Gender : {gender} </label>
                <label className='name-lable row'>Holiday Spot : {holidaySpot} </label>
                <label className='name-lable row'>Favourite Food : {FavouriteFood} </label>
            </main>
    )
}

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName:'',
            age:'',
            gender:'',
            holidaySpot: '',
            FavouriteFood:[]
        }
        this.handleChange =  this.handleChange.bind(this);
    }
    handleChange(event){
        let {name,value, type, checked} = event.target;
        (type === 'checkbox')?
        this.setState(({FavouriteFood})=>{
            return {
                    [name]: [...FavouriteFood, value]
            }
        })
        :this.setState({
            [name]:value
        })
    }
    render(){
        return(
            <ProfileForm state={this.state} handleChange={this.handleChange}/>
        )
    }
}