import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Sidebar from './componets/pages/sidebar/Sidebar'
import Viewpro from './componets/pages/viewproduct/Viewpro';
import Productform from './componets/pages/Submitproform/Productform';
import Navbar from './componets/pages/navbar/Navbar';
import AdminHome from './componets/pages/admin/AdminHome';
import Shop from './componets/pages/shop/Shop';
import Cart from './componets/pages/cart/Cart';
import NotFund from './componets/pages/notfund/NotFund';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Details from './componets/pages/details/Details';
function App() {
  return (
    <div className="App">
      <Router>
        {/* for display cart message */}
        <ToastContainer/>
    <Routes>
      <Route path="/details/:id" exact element={<Details/>}/>
      <Route path='/cartpage' exact element={<Cart/>} />
      <Route path='/admin'exact element={<AdminHome/>} />
      <Route path='/addpro' element={<Productform/>} /> 
      <Route path='/updatepro/:id' exact element={<Productform/>} /> 
     <Route path='/viewpro' exact element={<Viewpro/>} />
     <Route path='/not-fund' element={<NotFund/>} />
     <Route path='/' exact element={<Shop/>} />
     {/* <Redirect to="/not-fund" /> */}
     </Routes>
    </Router>
    </div>
  );
}

export default App;
