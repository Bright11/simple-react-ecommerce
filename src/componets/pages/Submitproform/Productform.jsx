import { useEffect, useState } from 'react'
import './Productform.css'
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {storage,db} from '../../../firebase';
import {LinearProgress} from '@material-ui/core'
import { async } from '@firebase/util';
import { addDoc, serverTimestamp,collection, getDoc,doc, updateDoc } from 'firebase/firestore';
import {useNavigate,useParams} from 'react-router-dom'
import Sidebar from './../sidebar/Sidebar';

const initialState = {
  name:'',
  price:'',
  description:'',
  keywords:''

}
function Productform() {

  const [data, setDate]= useState(initialState);
  const {name,price,description,keywords} = data;
  const [file, setFile]= useState(null);
  const [progress, setProgress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit]= useState(false);
const navigate = useNavigate();
const [chika, setChika] = useState(false);//editing
const {id} = useParams();

useEffect(() =>{
  id && getSingleProduct();
},[id]);

const getSingleProduct = async () => {
  const docRef = doc(db, 'products', id);
  const snapshot = await getDoc(docRef);
  if(snapshot.exists()) {
    setDate({...snapshot.data()});
  }
};


//the end of editting code
  //image upload
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage,file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_change', (snapshot) => {
        const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log('The upload is paused ');
            break;
            case "running":
              console.log('running upload')
              break;

              default:
                break;
        }
      },(error) => {
        console.log(error);
      },() =>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDate((prev) => ({...prev, img:downloadURL}));
        });
      });
    };
    file && uploadFile()
  }, [file]);
  
  const handleChange = (e) =>{
    setDate({...data, [e.target.name]: e.target.value});
  }
  
  const handlesubmit = async (e) =>{
    e.preventDefault();
    // if(name == "" || price == ""){
    //   setChika(true)
    //   navigate('/addpro');
    // }
    setIsSubmit(true);
    if(!id){
      try{
        await addDoc(collection(db, 'products'), {
          ...data,
          timetamp: serverTimestamp()
        });
      }catch (error){
        console.log(error);
      }
    }else{
      try{
        await updateDoc(doc(db, 'products',id), {
          ...data,
          timetamp: serverTimestamp()
        });
      }catch (error){
        console.log(error);
      }
    }
    
    navigate('/viewpro');
  }
  return (
    <div className='main__container'>
      <Sidebar/>
    <div className='productform'>
      <p>{chika ? 'hi': ''}</p>
        <h1 className='uploadeproh1'>{id? "Update product" : "Upload product"}</h1>
    {isSubmit ? <LinearProgress color="secondary" />:(
    // <p className="uploadimg">image upload in progress</p>:(
         <form className='proform' onSubmit={handlesubmit}>
  <div className="mb-3 myforminut__holder">
    <label className="form-label">Product Name</label>
    <input type="text" name='name' className="form-control" onChange={handleChange} value={name} />
  </div>
  <div className="mb-3 myforminut__holder">
    <label className="form-label">Price</label>
    <input type="text" name='price' className="form-control" onChange={handleChange} value={price} />
  </div>

  <div className="mb-3 myforminut__holder">
    <label className="form-label">Description</label>
    <input type="text" name='description' className="form-control" onChange={handleChange} value={description} />
  </div>

  <div className="mb-3 myforminut__holder">
    <label className="form-label">Keywords</label>
    <textarea name="keywords" cols="35" rows="10" onChange={handleChange} value={keywords}></textarea>
  </div>

  
  <div className="mb-3 myforminut__holder">
    <label className="form-label">Image</label>
    <input type="file" name='image' className="form-control"onChange={(e) => setFile(e.target.files[0]) } />
  </div>
  
  <button type="submit" className="btn btn-primary" disabled={progress !==null && progress < 100} >Submit</button>
</form>
 )};
    </div>
    </div>
  )
}

export default Productform