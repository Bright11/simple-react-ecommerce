import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Sidebar from './../sidebar/Sidebar';
import  './AdminHome.css';

function AdminHome() {
  return (
    <div className='main__container'>
    <Sidebar/>
  <div className="admincontainer">
    <h1>Welcome Admin</h1>
  </div>
    </div>
  )
}

export default AdminHome