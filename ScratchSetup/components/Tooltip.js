import React from 'react'
import PropTypes from 'prop-types'
import withHover from './withHover'
import Hover from './Hover'


const styles = {
    container: {
        position :'relative',
        display:'flex'
    },
    tooltip : {
        boxSizing : 'border-box',
        position: 'absolute',
        width:'160px',
        bottom:'100%',
        left:'50%',
        marginLeft: '-80px',
        borderRadius:'3px',
        backgroundColor:'hsla(0,0%,20%,0.9)',
        padding:'7px',
        marginBottom:'5px',
        color:'#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

// commented to implement Higher Ordered Components. By using this type of componets we can handle state of component with mehtods in a diff component and still work as if form the same component

// export default class Tooltip extends React.Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             hover : false,
//         }

//         this.mouseOver = this.mouseOver.bind(this);
//         this.mouseOut = this.mouseOut.bind(this);
//     }

//     mouseOver(){
//         this.setState({
//             hover:true
//         })
//     }
//     mouseOut(){
//         this.setState({
//             hover:false
//         })
//     }

//     render(){
//         const hover = this.state.hover;
//        return(
//             <li  style={styles.container} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} >
//                {hover && (
//                            <div style={styles.tooltip}>{hover && this.props.hoverText}</div>
//                )}
//                         {this.props.children}
//             </li>
//        )
//     }
// }

// commented for Hover.js
// function Tooltip({hoverText,children,hovering}){
//           return(
//             <li  style={styles.container}  >
//                 {hovering && <div style={styles.tooltip}>{hover && hoverText}</div>}
//                 {children}
//             </li>
//        ) 
// }

export default function Tooltip({hoverText,children}){
    return(
        <Hover>
            {((hovering) => (
                <div  style={styles.container}  >
                {hovering && <div style={styles.tooltip}>{hovering && hoverText}</div>}
                {children}
            </div>
            ))}
        </Hover>
 ) 
}

Tooltip.propTypes = {
    hoverText : PropTypes.string.isRequired
   // hovering: PropTypes.bool.isRequired
}


// commented as we are now using render props 'Hover.js' instead of higherOrder function 'withHover.js'
// export default withHover(Tooltip, 'hovering');