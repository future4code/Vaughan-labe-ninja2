import Axios from "axios";
import React from "react";
import moment from "moment";
import styled from "styled-components";

const CardJob = styled.div`

  border: solid 1px black;
  padding: 10px;
  h3{
    text-align: center;
  }
  p{
    text-align: center;
  }
  div{
    display: flex;
    justify-content: space-between;
  }
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  margin-top: 2%; 
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2%;
`

export default class HirePage extends React.Component {

  state={
    query: "",
    minPrice: "",
    maxPrice: ""
  }

  componentDidMount() {
    this.props.getAllJobs()
  }

  onChangeQuery = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  onChangeMinPrice = (event) => {
    this.setState({
      minPrice: event.target.value
    })
  }

  onChangeMaxPrice = (event) => {
    this.setState({
      maxPrice: event.target.value
    })
  }

  render() {
    const allJobs = this.props.jobList
    .filter((ninja) => {
      return this.state.minPrice === "" || ninja.price >= this.state.minPrice  
    })
    .filter((ninja) => {
      return this.state.maxPrice === "" || ninja.price <= this.state.maxPrice 
    })
    .filter( (ninja) => {
      return ninja.title.toLowerCase().includes(this.state.query.toLowerCase()) ||
        ninja.description.toLowerCase().includes(this.state.query.toLowerCase()) 
    })
    .map(ninja => {
      return (
        <CardJob key={ninja.id}>
          <h3>{ninja.title}</h3>
          <p>Até {moment.utc(ninja.dueDate).format('MM/DD/YYYY')} por <strong>R${ninja.price},00</strong></p>
          <div>
            <button onClick={() => this.props.getJobById(ninja.id)}>Ver Detalhes</button>
            <button onClick={() => this.props.updateJobTrue(ninja.id)}> Carrinho</button>
          </div>
        </CardJob>
      )
    })

    return (
    <>
    <FilterContainer>
      <label>
        <input 
          placeholder="Preço Min"
          type="number"
          value={this.state.minPrice}
          onChange={this.onChangeMinPrice}
        />
      </label>
      <label>
        <input 
          placeholder="Preço Max"
          type="number"
          value={this.state.maxPrice}
          onChange={this.onChangeMaxPrice}
        />
      </label>
      <label>
        <input 
          placeholder="Busca por Nome"
          value={this.state.query}
          onChange={this.onChangeQuery}
        />
      </label>
      <select>
        <option>Sem Ordenação</option>
        <option>Preço</option>
        <option>Titulo</option>
        <option>Prazo</option>
      </select>
      <select>
        <option>Crescente</option>
        <option>Decrescente</option>
      </select>
    </FilterContainer>
    <CardContainer>
      {allJobs}
    </CardContainer>
    </>
    )
  }
}
