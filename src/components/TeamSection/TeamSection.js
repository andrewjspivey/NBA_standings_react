import styled from "styled-components";

const TeamSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr repeat(9, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export default TeamSection;
