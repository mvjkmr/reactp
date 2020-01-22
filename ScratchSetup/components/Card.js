import React from 'react'
import PropTypes from 'prop-types'

export default function Card({header,subHeader,avatar,login, html_url,children}){
    return(
        <div className='repo bg-light' >
        <h4 className='header-lg center-text'> {header} </h4>
        <img
                    className='avatar'
                    src={avatar}
                    alt={`Avatar for ${login}`}
                />
                 {subHeader && <h2 className='header-sm center-text'>
                     {subHeader}
                </h2>}
                <h2 className='center-text'>
        <a className='link' href={html_url}>{login}</a>
                </h2>
                {children}
    </div>
    )
}

Card.propTypes = {
    header : PropTypes.string.isRequired,
    subHeader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    login:PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
}