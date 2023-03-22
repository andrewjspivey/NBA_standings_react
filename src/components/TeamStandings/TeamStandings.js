import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import TeamSection from "../TeamSection/TeamSection";
import * as NBAIcons from "react-nba-logos";
import NBAIcon from "../NBAIcons/NBAIcon";

const StandingsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: -3px -3px 16px -7px rgba(0, 0, 0, 0.62);
`;
const ColumnLabels = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr repeat(9, 1fr);
  grid-auto-rows: minmax(25px, auto);
  padding-top: 10px;
  color: grey;
  font-size: 13px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
`;

const ConferenceLabels = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => (props.selected === true ? "black" : "grey")};
  font-weight: ${(props) => (props.selected === true ? "bold" : "normal")};
  border-bottom: ${(props) => (props.selected === true ? "2px solid" : "none")};
`;

const TeamSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TeamStandings = () => {
  const [westernConf, setWesternConf] = useState([]);
  const [easternConf, setEasternConf] = useState([]);
  const [conferenceShown, setConferenceShown] = useState("west");

  const getTeamStandings = async () => {
    const western = [];
    const eastern = [];
    const request = await axios.get(
      `https://api.sportsdata.io/v3/nba/scores/json/Standings/%7B2022%7D?key=c6dabad397854c689c2b63f8eddfcb31`
    );
    request.data.map((team) => {
      if (team.Conference === "Western") {
        return western.push(team);
      } else return eastern.push(team);
    });
    setWesternConf(western.sort(GetSortOrder("Percentage")));
    setEasternConf(eastern.sort(GetSortOrder("Percentage")));
  };

  useEffect(() => {
    getTeamStandings();
  }, []);

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }

  const formatPercentage = (num) => {
    return Number(num).toFixed(3).slice(1);
  };

  return (
    <StandingsContainer>
      <div
        style={{
          width: "100%",
          border: "1px solid #CDCDCD",
          padding: "0 1rem 0 1rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <ConferenceLabels
            onClick={() => setConferenceShown("east")}
            selected={conferenceShown === "east" ? true : false}
          >
            <div style={{ padding: "1rem" }}>Eastern Conference</div>
          </ConferenceLabels>
          <hr
            style={{
              height: "1px",
              backgroundColor: "#CDCDCD",
              border: "none",
            }}
          />
          <ConferenceLabels
            onClick={() => setConferenceShown("west")}
            selected={conferenceShown === "west" ? true : false}
          >
            <div style={{ padding: "1rem" }}>Western Conference</div>
          </ConferenceLabels>
          <hr
            style={{
              height: "1px",
              backgroundColor: "#CDCDCD",
              border: "none",
            }}
          />
        </div>
        <ColumnLabels>
          <Cell>Pos</Cell>
          <Cell>Team</Cell>
          <Cell>W</Cell>
          <Cell>L</Cell>
          <Cell>Pct</Cell>
          <Cell>GB</Cell>
          <Cell>Conf</Cell>
          <Cell>Home</Cell>
          <Cell>Away</Cell>
          <Cell>L10</Cell>
          <Cell>Str</Cell>
        </ColumnLabels>
        <hr
          style={{ height: "1px", backgroundColor: "#CDCDCD", border: "none" }}
        />
        {conferenceShown === "east" && easternConf.length
          ? easternConf.map((team, index) => (
              <TeamSectionWrap key={index}>
                <TeamSection>
                  <Cell>{index + 1}</Cell>
                  <Cell>
                    <NBAIcon abv={team.Key} /> {team.Name}
                  </Cell>
                  <Cell>{team.Wins}</Cell>
                  <Cell>{team.Losses}</Cell>
                  <Cell>{formatPercentage(team.Percentage)}</Cell>
                  <Cell>{team.GamesBack}</Cell>
                  <Cell>
                    {team.ConferenceWins}-{team.ConferenceLosses}
                  </Cell>
                  <Cell>
                    {team.HomeWins}-{team.HomeLosses}
                  </Cell>
                  <Cell>
                    {team.AwayWins}-{team.AwayLosses}
                  </Cell>
                  <Cell>
                    {team.LastTenWins}-{team.LastTenLosses}
                  </Cell>
                  <Cell>{team.StreakDescription}</Cell>
                </TeamSection>
                <hr
                  style={{
                    height: "1px",
                    backgroundColor: "#CDCDCD",
                    border: "none",
                  }}
                />
              </TeamSectionWrap>
            ))
          : westernConf.map((team, index) => (
              <TeamSectionWrap key={index}>
                <TeamSection key={index}>
                  <Cell>{index + 1}</Cell>
                  <Cell>
                    <NBAIcon abv={team.Key} /> {team.Name}
                  </Cell>
                  <Cell>{team.Wins}</Cell>
                  <Cell>{team.Losses}</Cell>
                  <Cell>{formatPercentage(team.Percentage)}</Cell>
                  <Cell>{team.GamesBack}</Cell>
                  <Cell>
                    {team.ConferenceWins}-{team.ConferenceLosses}
                  </Cell>
                  <Cell>
                    {team.HomeWins}-{team.HomeLosses}
                  </Cell>
                  <Cell>
                    {team.AwayWins}-{team.AwayLosses}
                  </Cell>
                  <Cell>
                    {team.LastTenWins}-{team.LastTenLosses}
                  </Cell>
                  <Cell>{team.StreakDescription}</Cell>
                </TeamSection>
                <hr
                  style={{
                    height: "1px",
                    backgroundColor: "#CDCDCD",
                    border: "none",
                  }}
                />
              </TeamSectionWrap>
            ))}
      </div>
    </StandingsContainer>
  );
};

export default TeamStandings;
