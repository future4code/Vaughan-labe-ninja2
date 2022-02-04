import React from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import logo from '../images/labeninjas2.png'
import Typography from '@mui/material/Typography';

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5F4FC;
  height: calc(100vh - 52.5px);
  div{
    width: 50%;
    margin-right: 5%;
  }  
`;

export default class Home extends React.Component {
  render() {
    return (
      <HomeContainer>
        <div>
          <Typography sx = {{mb: 2, textAlign: 'justify'}}>
          Somos uma startup destinada à busca e oferta de prestações de serviço. Na LabeNinjas, os ninjas podem oferecer seus serviços livremente, enquanto as pessoas com demandas específicas podem encontrar perfis bem alinhados ao que precisam.
          </Typography>
          <Button variant="contained" sx={{ mr: 1 }} onClick={() => this.props.changeScreen("hire")}>
            Contratar um ninja
          </Button>
          <Button variant="contained" sx={{ mr: 1 }}  onClick={() => this.props.changeScreen("register")}>
            Quero ser um ninja
          </Button>
        </div>        
        <img src={logo} alt='logo com ninja'/>        
      </HomeContainer>
    );
  }
}
