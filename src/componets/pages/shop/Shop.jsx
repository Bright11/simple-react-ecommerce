import { CircularProgress,} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Navbar from './../navbar/Navbar';
import './Shop.css'
import { onSnapshot, collection,doc } from 'firebase/firestore';
import { db } from './../../../firebase';
import {useDispatch} from 'react-redux'
import { addToCart } from '../../../features/cartSlice';
//for redirect
import { useNavigate } from 'react-router-dom';
import { ShoppingBasket } from '@material-ui/icons';
import BSlider from '../slide/BSlider';


function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onSnapshot(collection(db,'products'), (snapshot) =>{
      let list =[];
      snapshot.docs.forEach((doc) => {
        list.push({id: doc.id, ...doc.data()})
      })
      setProducts(list);
    },
    (error) =>{
      console.log(error);
    });

    return () =>{
      unsub();
    };
  },[]);
//for add to cart
  const dispatch = useDispatch();

  // const handleAddToCart = (products) => {
  //   dispatch(addToCart(products));
  // };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    //redirect after add to cart
    navigate("/cartpage");
  };
  return (
    <div>
       <Navbar/>
       <div className="container productholder">
        {/* <BSlider/> */}
{/*      
       <div className="loading">
       <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
       </div> */}
      
        <div className="row">
          {products && products.map((item) =>(
             <div className="col-md-3 itemstorflex" key={item.id}>
             <div className="img-holder">
             <img src={item.img} alt={item.name} className="storeimgename img-fluid" />
             <div className="sales">
              <p>Sales</p>
             </div>
             </div>
             <div className="product-names-holder">
             <h1>{item.name}</h1>
           <div className="cart__price_holder">
           <p>$ {item.price}</p>
           {/* <button onClick={() => handleAddToCart(products)}>Add to cart</button> */}
           <button className='add-to-to-cart-flex' onClick={() => handleAddToCart(item)}> <ShoppingBasket/> Add to cart</button>
           </div>
             </div>
           </div>
          ))}
      
      {/* <div className="col-md-4">
        hi
      </div>
      <div className="col-md-4">
        hi
      </div>
      <div className="col-md-4">
        hi
      </div> */}
        </div>
       </div>
        
    </div>
  )
}

export default Shop