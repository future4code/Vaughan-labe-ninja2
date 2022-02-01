import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import HirePage from "./pages/HirePage";
import RegisterForm from "./pages/RegisterForm";
import ProductDetails from "./pages/ProductDetails";

export default class App extends React.Component {
  state = {
    currentScreen: "home",
   
  };

  

  renderScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return <Home changeScreen={this.changeScreen} />;
      case "cart":
        return <Cart changeScreen={this.changeScreen} />;
      case "hire":
        return <HirePage changeScreen={this.changeScreen} />;
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
