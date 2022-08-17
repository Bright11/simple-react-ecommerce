import './Cart.css'
import Navbar from './../navbar/Navbar';
import {useSelector,useDispatch} from "react-redux"
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../../../features/cartSlice';
import {useEffect} from 'react'
function Cart() {
  const cart = useSelector((state)=> state.cart);
  //for cart total
  useEffect(() =>{
    dispatch(getTotals());
  },[cart]);
  //the end
  //this code is for removing item from cart
  const dispatch = useDispatch();

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }
  //the end

  //decreaseing cart quantity
  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  }
  //the end

  //increase cart quantity
const handleincreaseCart =(cartItem) =>{
  dispatch(addToCart(cartItem));
}
  //the end

  //clear all cart
const handleclearallCart =() => {
  dispatch(clearCart());
}
  //the end
  return (
    <div className="cart">
        <Navbar/>
        <div className="cart-container">
          <h2>Shopping Cart</h2>
          {cart.cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <div className="start-shopping">
               
                <Link to="/">
                <ArrowBack/>
                  <p>Back to shop</p>
                  </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="titles">
                <h3 className="product-title">Product</h3>
                <h3 className="price">Price</h3>
                <h3 className="quantity">Quantity</h3>
                <h3 className="total">Total</h3>
              </div>
              <div className="cart-items">
                {cart.cartItems?.map(cartItem => (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                <img src={cartItem.img} className="my-cart-img" alt={cartItem.name}  />

               <div className="remove-dec-flex">
               <p>{cartItem.name}</p>
               <p>{cartItem.description}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)} >Remove</button>
               </div>
                    
                </div>
                <div className="cart-product-price">
                      ${cartItem.price}
                    </div>
                   <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleincreaseCart(cartItem)}>+</button>
                   </div>
                   <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.cartQuantity}
                   </div>
                    </div>
                  
                  
                ))}
              </div>
              <div className="cart-summery">
                <button className="clear-cart" onClick={() => handleclearallCart()}>Clear Cart</button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <span>Subtotal</span>
                    <span className="amount">${cart.cartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  <button className='check-out-btn'>Check out</button>
                  <div className="continue-shopping">
               
               <Link to="/" className='bactoshopbtn'>
               <ArrowBack className='mybackarro'/>
                 <p>Back to shop</p>
                 </Link>
             </div>
                </div>
              </div>
            </div>
          )}
        </div>

    </div>
  )
}

export default Cart