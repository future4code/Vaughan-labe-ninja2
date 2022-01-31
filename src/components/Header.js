import React, { Component } from "react";
import styled from "styled-components";

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
        <p>LabeNinjas2</p>
        <div>
          <button onClick={() => this.props.changeScreen("home")}>Home</button>
          <button onClick={() => this.props.changeScreen("cart")}>
            Carrinho
          </button>
        </div>
      </Headers>
    );
  }
}
