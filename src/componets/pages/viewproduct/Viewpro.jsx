import './Viewpro.css'
import { useState, useEffect } from 'react';
import { onSnapshot, collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from './../../../firebase';
import {Delete,AssignmentTurnedIn} from '@material-ui/icons'
import { useNavigate } from 'react-router-dom';
import Sidebar from './../sidebar/Sidebar';

function Viewpro() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({id: doc.id, ...doc.data()})
            })
            setProducts(list);
            setLoading(false);
        },
        (error) =>{
            console.log(error);
        }
        );
        return () =>{
            unsub();
        };
    },[]);

  return (
    <div className='main__container'>
      <Sidebar/>
    <div className='viewpro'>
       <table className="table product__table">
  <thead>
    <tr>
      <th scope="col">product name</th>
      <th scope="col">price</th>
      <th scope="col">image</th>
      <th scope="col">action</th>
    </tr>
  </thead>
  <tbody>
    {products && products.map((item) => (

<tr key={item.id}>
<td>{item.name}</td>
<td>{item.price}</td>
<td><img src={item.img} alt={item.name} className="prodct__tableimg" /></td>
<th scope="row">
  <div  className='actiontable'>
  <button className="delete__btn updatebtn" onClick={() => navigate('/details/'+item.id)} >
  <AssignmentTurnedIn className='delete__pro'/>
  Details
  </button>
  <button className="delete__btn updatebtn" onClick={() => navigate('/updatepro/'+item.id)} >
  <AssignmentTurnedIn className='delete__pro'/>
  Update
  </button>
  <button className="delete__btn" onClick={() => {deleteDoc(doc(db, 'products', item.id))}} >
  <Delete className='delete__pro'/>
  Delete
  </button>
  </div>
</th>
</tr>
    ))}
   
    
  </tbody>
</table>
    </div>
    </div>
  )
}

export default Viewpro