import Axios from "axios";
import React from "react";
import styled from "styled-components";
import { key } from "../constants/apiKey";
import { baseURL } from "../constants/baseURL";
import Button from '@mui/material/Button';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% auto;
  border: solid 1px black;
  width: 40%;
  

  input {
    margin: 5px 0;
  
  }

  button {
    margin: 2%;
  }
`;

const DivCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export default class RegisterForm extends React.Component {
  state = {
    title: "",
    pricetag: "",
    description: "",
    deadline: "",
    checkCredit: false,
    checkDebit: false,
    checkPaypal: false,
    checkInvoice: false,
    checkPix: false,
  };

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handlePriceTag = (event) => {
    this.setState({ pricetag: event.target.value });
  };

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  handleDeadline = (event) => {
    this.setState({ deadline: event.target.value });
  };

  handleCredit = (event) => {
    this.setState({ checkCredit: event.target.checked });
  };

  handleDebit = (event) => {
    this.setState({ checkDebit: event.target.checked });
  };

  handleInvoice = (event) => {
    this.setState({ checkInvoice: event.target.checked });
  };

  handlePaypal = (event) => {
    this.setState({ checkPaypal: event.target.checked });
  };

  handlePix = (event) => {
    this.setState({ checkPix: event.target.checked });
  };

  paymentList = () => {
    const arr = [];

    if (this.state.checkCredit) {
      arr.push("Cartão de Crédito");
    }

    if (this.state.checkDebit) {
      arr.push("Cartão de Débito");
    }

    if (this.state.checkPaypal) {
      arr.push("Paypal");
    }

    if (this.state.checkInvoice) {
      arr.push("Boleto");
    }

    if (this.state.checkPix) {
      arr.push("Pix");
    }

    return arr;
  };

  createJob = () => {
    const body = {
      title: this.state.title,
      description: this.state.description,
      price: Number(this.state.pricetag),
      paymentMethods: this.paymentList(),
      dueDate: this.state.deadline,
    };

    Axios.post(`${baseURL}/jobs`, body, key)
      .then((response) => {
        alert("Bem vindo(a) à comunidade ninja!");
        this.setState({
          title: "",
          pricetag: "",
          description: "",
          deadline: "",
          checkCredit: false,
          checkDebit: false,
          checkPaypal: false,
          checkInvoice: false,
          checkPix: false,
        });
      })
      .catch((err) => {
        alert(`Ops! a tentativa de criar um novo ninja falhou. Tente Novamente`)
      });
  };

  render() {

    return (
      <FormContainer>
        <h2>Cadastre Seu Serviço</h2>
        <input
          placeholder="Titulo"
          onChange={this.handleTitle}
          value={this.state.title}
        />
        <input
          placeholder="Descrição"
          onChange={this.handleDescription}
          value={this.state.description}
        />
        <input
          type="number"
          placeholder="Preço"
          onChange={this.handlePriceTag}
          value={this.state.pricetag}
        />
        <DivCheckbox>
          <div>
            <input
              type="checkbox"
              onChange={this.handleCredit}
              checked={this.state.checkCredit}
            />
            Cartão de Crédito
          </div>
          <div>
            <input
              type="checkbox"
              onChange={this.handleDebit}
              checked={this.state.checkDebit}
            />{" "}
            Cartão de Débito
          </div>
          <div>
            <input
              type="checkbox"
              onChange={this.handleInvoice}
              checked={this.state.checkInvoice}
            />{" "}
            Boleto
          </div>
          <div>
            <input
              type="checkbox"
              onChange={this.handlePaypal}
              checked={this.state.checkPaypal}
            />{" "}
            Paypal
          </div>
          <div>
            <input
              type="checkbox"
              onChange={this.handlePix}
              checked={this.state.checkPix}
            />{" "}
            Pix
          </div>
        </DivCheckbox>
        <input
          type="date"
          onChange={this.handleDeadline}
          value={this.state.deadline}
        />
        <Button variant="contained" onClick={this.createJob}> Cadastrar Serviços</Button>
      </FormContainer>
    );
  }
}
