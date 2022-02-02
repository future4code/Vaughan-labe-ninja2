import React from 'react'
import styled from 'styled-components'

const CartContainer = styled.div`
    margin-top: 2%;

    #payment {
        display: flex;
        justify-content: space-between;
        margin: 0 32px;

        div {
            display: flex;
            width: 30%;
            justify-content: space-between;
                                
        }
                
    }
`
const ItemCard = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    border: 1px solid black;
    justify-items: center;
    margin: 16px 32px;
    padding: 10px;
    
    #title {
        justify-self: start;
    }

    #price {
        justify-self: end;
    }

    button {
        justify-self: end;
    }
`

export default class Cart extends React.Component {



    render() {
        const itemCart = this.props.jobList.filter((job) => {
            return job.taken
        }).map((job) => {
            return <ItemCard key={job.id}>
                <p id="title">{job.title}</p>
                <p id="price">R${job.price},00</p>
                <button onClick={() => this.props.updateJobFalse(job.id)}>Deletar</button>
            </ItemCard>
        });
        console.log(itemCart)


        const jobPrices = this.props.jobList.filter((job) => {
            return job.taken
        }).map((job) => {
            return job.price
        });

        const total = () => {
            let sum = 0;
            for (let value of jobPrices) {
                sum = sum + value;
            }
            return sum;
        }

        return (
            <CartContainer>
                {itemCart}
                <div id="payment">
                    <div>
                        <button onClick={() => this.props.changeScreen("hire")}>Continuar contratando</button>
                        <button onClick={this.props.emptyCart}>Limpar Carrinho</button>
                    </div>
                    <div>
                        <p>Valor total: R${total()},00 </p>
                        <button onClick={this.props.hireAllInCart}>Contratar Serviço</button>
                    </div>
                </div>
            </CartContainer>
        )
    }
}