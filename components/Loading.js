import React from 'react'
import PropTypes from 'prop-types'


const style = {
   content: {
        fontSize : '35px',
        position : 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
}
}

export default class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content:props.text
        }
    }
    componentDidMount(){
        const {text,speed} = this.props;

        this.interval = window.setInterval(() => {
         this.state.content === `${text}...`
         ? this.setState({content:text})
         : this.setState(({content}) => ({content : content + '.'}))
        },speed)
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }
    render(){
        console.log(this.state.content);
        return(
        <p style={style.content}>{this.state.content}</p>
        )
    }

}

Loading.propTypes = {
    text : PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps  = {
    text:'Loading',
    speed: 300
};