import React from 'react';

export default function withHover(Component, propName ='hover'){
    return class WithHover extends React.Component{
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
            const props = {
                [propName] : this.state.hover,
                ...this.props
            }
            return(
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
                    <Component {...props}/>
                </div>
            )
        }
    }
}