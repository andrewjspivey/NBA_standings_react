import React from 'react'
import * as NBAIcons from 'react-nba-logos';

const NBAIcon = (props) => {
    const Icon = NBAIcons[props.abv]
    return Icon ? <Icon size={30}/> : <div style={{width: '30px'}}/>
}

export default NBAIcon
