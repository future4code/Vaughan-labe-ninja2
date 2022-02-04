import React, { Component } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Headers = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
`;

export default class Header extends Component {
  render() {
    return (
      <Headers>
        <Typography variant="h5">LabeNinjas2</Typography>
        <div>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => this.props.changeScreen("home")}>Home</Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => this.props.changeScreen("cart")}>
            Carrinho
          </Button>
        </div>
      </Headers>
    );
  }
}
