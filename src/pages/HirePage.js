import Axios from "axios";
import React from "react";
import { baseURL } from "../constants/baseURL";
import { key } from "../constants/apiKey"
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
  margin-top: 5%; 
`

export default class HirePage extends React.Component {
  state = {
    jobList: [],
    cart: [],
    job: {}
  }

  componentDidMount() {
    this.getAllJobs()
    
  }

  getAllJobs = () => {
    Axios.get(`${baseURL}/jobs`, key)
      .then((response) => {

        this.setState({ jobList: response.data.jobs })
      })
      .catch(err => { alert(err.response.data.error) })
  }

  getJobById = (id) => {
    Axios.get(`${baseURL}/jobs/${id}`, key)
    .then(response => {

      this.setState({job: response.data})
      this.addToCart()
    
    })
    .catch(err => { alert(err.response.data.error) })
  }

  addToCart = () => {
    const jobInCart = {... this.state.job}
    const addJob = [... this.state.cart, jobInCart]
    this.setState({cart: addJob}) 
  }

  render() {
   
    const allJobs = this.state.jobList.map(ninja => {
      return (

        <CardJob key={ninja.id}>
          <h3>{ninja.title}</h3>
          <p>Até {moment.utc(ninja.dueDate).format('MM/DD/YYYY')} por <strong>R${ninja.price},00</strong></p>
          <div>
            <button onClick={() => this.props.changeScreen("productDetails")}>Ver Detalhes</button>
            <button onClick={() => this.getJobById(ninja.id)}> Carrinho</button>
          </div>
        </CardJob>
      )
    })
    return <CardContainer>
      {allJobs}
    </CardContainer>;
  }
}
