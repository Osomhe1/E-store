import React, { Component } from 'react'
import { ProductConsumer } from '../../Context';
import Title from '../Title';
import CartColumns from './CartColums'
import CartList from './CartList';
import CartTotal from './CartTotal';
import EmptyCart from './EmptyCart';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value =>{
                        const {cart}  = value;
                        if(cart.length > 0){
                            return (
                              <React.Fragment>
                                <Title name='your' title='cart' />
                                <CartColumns />
                                <CartList value={value} />
                                <CartTotal
                                  value={value}
                                  history={this.props.history}
                                />
                              </React.Fragment>
                            );
                        }else {
                            return <EmptyCart />
                        }
                    }}
                </ProductConsumer>
                
                
            </section>
        )
    }
}
 