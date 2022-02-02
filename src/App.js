import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import HirePage from "./pages/HirePage";
import RegisterForm from "./pages/RegisterForm";
import ProductDetails from "./pages/ProductDetails";
import { baseURL } from "./constants/baseURL";
import Axios from "axios";
import { key } from "./constants/apiKey";

export default class App extends React.Component {
  state = {
    currentScreen: "home",
    cart: []
  };

  componentDidUpdate() {
    localStorage.setItem(
      "cart",
      JSON.stringify(this.state.cart)
    );
  }

  componentDidMount() {
    const stuffInCart = JSON.parse(localStorage.getItem("cart"));
    if (stuffInCart) {
      this.setState({ cart: stuffInCart });
    }
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
    console.log(this.state.cart)
  };

  deleteItemCart = (id) => {
    const removeJob = [... this.state.cart]
    const removeByFilter = removeJob.filter((job) => {
      return job.id !== id;
    });
    this.setState({
      cart: removeByFilter
    });
  };

  renderScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return <Home changeScreen={this.changeScreen} />;
      case "cart":
        return <Cart 
          changeScreen={this.changeScreen}
          cart={this.state.cart}
          deleteItemCart={this.deleteItemCart}
        />;
      case "hire":
        return <HirePage 
          changeScreen={this.changeScreen} 
          getJobById={this.getJobById}
          addToCart={this.addToCart}
        />;
      case "register":
        return <RegisterForm changeScreen={this.changeScreen} />;
      case "productDetails":
        return <ProductDetails changeScreen={this.changeScreen} />;
      default:
        return <Home changeScreen={this.changeScreen} />;
    }
  };

  changeScreen = (param) => {
    this.setState({ currentScreen: param });
  };

  render() {
    return (
      <div>
        <Header changeScreen={this.changeScreen}></Header>
        {this.renderScreen()}
      </div>
    );
  }
}
