import React from 'react'
import { db } from './../../../firebase';
import {useEffect, useState} from 'react';
import {useHistory, useParams, Link} from 'react-router-dom'
import {doc, getDoc } from 'firebase/firestore';
import './Details.css'
import Sidebar from '../sidebar/Sidebar';
function Details() {
  const [products,setProducts] = useState({});

  const {id} = useParams();
  useEffect(() =>{
    id && getSingleProduct();
  },[id]);
  
  const getSingleProduct = async () => {
    const docRef = doc(db, 'products', id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()) {
      setProducts({...snapshot.data()});
    }
  };
  console.log(products);
  return (
    <div className='main__container'>
      <Sidebar/>
    <div className='details'>
    <div className='product-details-holder'>
   <div className="pro-detaols-img">
   <img src={products.img} alt="" />
   </div>
   <div className="pro-detaols-name">
    <Link to="/viewpro">Back</Link>
    
   <h1>{products.name}</h1>

   <p>Price ${products.price}</p>
   </div>
    </div>
    <p>{products.description}</p>
  
    </div>
    </div>
  )
}

export default Details