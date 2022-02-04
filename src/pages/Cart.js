import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button';

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

        const itemCart = this.props.jobList.filter((job) => {
            return job.taken
        }).map((job) => {
            return <ItemCard key={job.id}>
                <p id="title">{job.title}</p>
                <p id="price">R${job.price},00</p>
                <Button variant="contained"  onClick={() => this.props.updateJobFalse(job.id)}>Deletar</Button>
            </ItemCard>
        });

        const botoes = () => {
            return <div id="payment">
                <div>
                    <Button variant="contained" onClick={() => this.props.changeScreen("hire")}>Continuar contratando</Button>
                    <Button variant="contained" onClick={this.props.emptyCart}>Limpar Carrinho</Button>
                </div>
                <div>
                    <p>Valor total: R${total()},00 </p>
                    <Button variant="contained" onClick={this.props.hireAllInCart}>Contratar Serviço</Button>
                </div>
            </div>
        }
        return (
            <CartContainer>
                {itemCart}
                {/* {itemCart.length === 0 ? <h1>Carregando...</h1> : itemCart} */}
                {itemCart.length === 0 ? <h1>Carrinho Vazio</h1> : botoes()}
            </CartContainer>
        )
    }
}