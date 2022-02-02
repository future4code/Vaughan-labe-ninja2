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
    jobList: []
  };

  componentDidUpdate() {
    localStorage.setItem(
      "cart",
      JSON.stringify(this.state.jobList)
    );
  }

  componentDidMount() {
    const stuffInCart = JSON.parse(localStorage.getItem("cart"));
    if (stuffInCart) {
      this.setState({ jobList: stuffInCart });
    }
  }

  getAllJobs = () => {
    Axios.get(`${baseURL}/jobs`, key)
      .then((response) => {

        this.setState({ jobList: response.data.jobs })
      })
      .catch(err => { alert(err.response.data.error) })
  }

  updateJobTrue = (id) => {
    const body = {
      taken: true
    }

    const checkTaken = this.state.jobList.filter((job) => {
      return job.taken
    }).map((job) => {
      return job.id
    })


    if (checkTaken.includes(id)) {
      alert("Ops! Serviço já adicionado!")
      return false
    } else {
      Axios.post(`${baseURL}/jobs/${id}`, body, key)
        .then(() => {
          alert("Serviço ninja adicionado ao carrinho!")
          this.getAllJobs()
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }

  updateJobFalse = (id) => {
    const body = {
      taken: false
    }
    Axios.post(`${baseURL}/jobs/${id}`, body, key)
      .then(() => {
        alert("Serviço ninja removido do carrinho!")
        this.getAllJobs()
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  updateAllJobsFalse = (id) => {
    const body = {
      taken: false
    }
    Axios.post(`${baseURL}/jobs/${id}`, body, key)
      .then(() => {
        this.getAllJobs()
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  hireAllInCart = () => {
    const allJobsTakenFalse = this.state.jobList.filter((job) => {
      return job.taken
    })
      .map((job) => {
        return this.updateAllJobsFalse(job.id)
      })

    alert("Obrigado pela compra!")
  }

  emptyCart = () => {
    const allJobsTakenFalse = this.state.jobList.filter((job) => {
      return job.taken
    })
      .map((job) => {
        return this.updateAllJobsFalse(job.id)
      })

    alert("Os ninjas fugiram :O")
  }

  renderScreen = () => {
    switch (this.state.currentScreen) {
      case "home":
        return <Home changeScreen={this.changeScreen} />;
      case "cart":
        return <Cart
          changeScreen={this.changeScreen}
          updateJobTrue={this.updateJobTrue}
          updateJobFalse={this.updateJobFalse}
          getAllJobs={this.getAllJobs}
          jobList={this.state.jobList}
          hireAllInCart={this.hireAllInCart}
          emptyCart={this.emptyCart}
        />;
      case "hire":
        return <HirePage
          changeScreen={this.changeScreen}
          getAllJobs={this.getAllJobs}
          jobList={this.state.jobList}
          updateJobTrue={this.updateJobTrue}
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
