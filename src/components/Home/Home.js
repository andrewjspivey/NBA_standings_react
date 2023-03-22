import React from 'react'
import TeamStandings from '../TeamStandings/TeamStandings'
import styled from 'styled-components'

const StandingsContainer = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    margin: auto;
`
const HeaderContainer = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    margin: auto;
    background-color: #01579B;

`

const Home = () => {

    return (
        <div>
            <HeaderContainer>
                <h1 style={{color: "whitesmoke"}}>2021-2022 NBA Standings</h1>
            </HeaderContainer>
            <StandingsContainer>
                <TeamStandings />
            </StandingsContainer>
        </div>
    )
}

export default Home
