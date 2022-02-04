import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 7%;
`;

export default class Home extends React.Component {
  render() {
    return (
      <HomeContainer>
        <h3>LabeNinjas2</h3>
        <p>O talento certo no momento certo</p>
        <div>
          <Button variant="contained" sx={{ mr: 1 }} onClick={() => this.props.changeScreen("hire")}>
            Contratar um ninja
          </Button>
          <Button variant="contained" sx={{ mr: 1 }}  onClick={() => this.props.changeScreen("register")}>
            Quero ser um ninja
          </Button>
        </div>
      </HomeContainer>
    );
  }
}
