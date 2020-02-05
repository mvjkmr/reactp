import React from 'react';

export default class Hover extends React.Component{
        constructor(props){
                    super(props);
            
                    this.state = {
                        hover : false,
                    }
            
                    this.mouseOver = this.mouseOver.bind(this);
                    this.mouseOut = this.mouseOut.bind(this);
                }
            
                mouseOver(){
                    this.setState({
                        hover:true
                    })
                }
                mouseOut(){
                    this.setState({
                        hover:false
                    })
                }
            
            render(){
            console.log(this.props.children);
            return(
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
                    {this.props.children(this.state.hover)}
                </div>
            )
        }
    }
