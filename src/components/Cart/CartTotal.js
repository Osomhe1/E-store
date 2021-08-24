import React from 'react'
import { Link } from 'react-router-dom';
import PayPalButton from './PaypalButton'

export default function CartTotal({value, history}) {
    const { cartSubTotal, cartTax, CartTotal, clearCart } = value;
    // const { history } = this.props
    // const emptyCart = cart.length === 0 ? true : false
    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-10 text-right mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize'>
              <Link to='/'>
                <button
                  className='px-5 mb-3 btn btn-outline-danger text-uppercase'
                  type='button'
                  onClick={() => {
                    clearCart()
                  }}
                >
                  clear cart
                </button>
              </Link>
              <h5>
                <span className='text-title'>subtotal : </span>
                {/* {''} */}
                <strong>$ {cartSubTotal} </strong>
              </h5>
              <h5>
                <span className='text-title'>tax : </span>
                {/* {''} */}
                <strong>$ {cartTax} </strong>
              </h5>
              <h5>
                <span className='text-title'>total : </span>
                {/* {''} */}
                <strong>$ {CartTotal} </strong>
              </h5>
              <PayPalButton
                total={CartTotal}
                clearCart={clearCart}
                history={history}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
}

