import React from "react";
import moment from "moment";

export default class ProductDetails extends React.Component {


  render() {

    const renderDetails = this.props.jobDetails.map((info) => {
      return (
        <div key={info.id}>
          <h3>{info.title}</h3>
          <p>{info.description}</p>
          <p>{info.price}</p>
          <p>{moment.utc(info.dueDate).format('MM/DD/YYYY')}</p>
          {info.paymentMethods.map((pay, index) => {
            return <li key={index}>{pay}</li>
          })}
          <button onClick={() => this.props.changeScreen("hire")}>Continuar contratando</button>
          <button onClick={() => this.props.updateJobTrue(info.id)}>Adicionar ao carrinho</button>
        </div>
      )
    })

    return <div>

      {renderDetails.length === 0 ? <h1>Carregando...</h1> : renderDetails}
    </div>;
  }
}
