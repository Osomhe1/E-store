import React, { Component } from 'react'
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext()

 class ProductProvider extends Component {
   state = {
     products: [],
     detailsProduct: detailProduct,
     cart: [],
     modalOpen: false,
     modalProduct: detailProduct,
     cartSubTotal: 0,
     cartTax: 0,
     cartTotal: 0,
   }

   componentDidMount() {
     this.setProducts()
   }

   setProducts = () => {
     let tempProducts = []
     storeProducts.forEach((item) => {
       const singleItem = { ...item }
       tempProducts = [...tempProducts, singleItem]
     })
     this.setState(() => {
       return { products: tempProducts }
     })
   }

   getItem = (id) => {
     const product = this.state.products.find((item) => item.id === id)
     return product
   }

   handleDetails = (id) => {
     const product = this.getItem(id)
     this.setState(() => {
       return { detailProduct: product }
     })
   }

   addToCart = (id) => {
     // console.log('add to cart')
     let tempProducts = [...this.state.products]
     const index = tempProducts.indexOf(this.getItem(id))
     const product = tempProducts[index]
     product.inCart = true
     product.count = 1
     const price = product.price
     product.total = price
     this.setState(
       () => {
         return { products: tempProducts, cart: [...this.state.cart, product] }
         // return {
         //     products: tempProducts
         // }
       },
       () => {
         this.addTotal()
       }
     )
   }

   openModal = (id) => {
     const product = this.getItem(id)
     this.setState(() => {
       return { modalProduct: product, modalOpen: true }
     })
   }

   closeModal = () => {
     this.setState(() => {
       return { modalOpen: false }
     })
   }

   increment = (id) => {
     //  <h1>increament method</h1>
     let tempCart = [...this.state.cart]
     const selectedProduct = tempCart.find((item) => item.id === id)

     const index = tempCart.indexOf(selectedProduct)
     const product = tempCart[index]

     product.count = product.count + 1
     product.total = product.count * product.price

     this.setState(
       () => {
         return {
           cart: [...tempCart],
         }
       },
       () => {
         this.addTotal()
       }
     )
   }
   decrement = (id) => {
     //  <h1>decreement method</h1>
     let tempCart = [...this.state.cart]
     const selectedProduct = tempCart.find((item) => item.id === id)

     const index = tempCart.indexOf(selectedProduct)
     const product = tempCart[index]

     product.count = product.count - 1
     if (product.count === 0) {
       this.removeItem()
     } else {
       product.total = product.count * product.price

       this.setState(
         () => {
           return { cart: [...tempCart] }
         },
         () => {
           this.addTotal()
         }
       )
     }
   }
   removeItem = (id) => {
     //  <h1>removeed method</h1>
     let tempProducts = [...this.state.products]
     let tempCart = [...this.state.cart]

     tempCart = tempCart.filter((item) => item.id !== id)

     const index = tempProducts.indexOf(this.getItem(id))

     let removedProduct = tempProducts[index]
     removedProduct.inCart = false
     removedProduct.count = 0
     removedProduct.total = 0

     this.setState(
       () => {
         return {
           cart: [...tempCart],
           products: [...tempProducts],
         }
       },
       () => {
         this.addTotal()
       }
     )
   }
   clearcart = () => {
     //  <h1>clear  method</h1>
     this.setState(
       () => {
         return {
           cart: [],
         }
       },
       () => {
         this.setProducts()
         this.addTotal()
       }
     )
   }

    addTotal =() =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() =>{
            
            return {
              cartSubTotal: subTotal,
              cartTax: tax,
              cartTotal: total
              
            }

        })
       //  <h1>clear  method</h1>

    }


   render() {
     return (
         
       <ProductContext.Provider
         value={{
           ...this.state,
           handleDetails: this.handleDetails,
           addToCart: this.addToCart,
           openModal: this.openModal,
           closeModal: this.closeModal,
           increment: this.increment,
           decrement: this.decrement,
           removeItem: this.removeItem,
           clearCart: this.clearcart,
         }}
       >
         {this.props.children}
       </ProductContext.Provider>
     )
   }
 }
        


const ProductConsumer = ProductContext.Consumer;

 export { ProductConsumer, ProductProvider}
