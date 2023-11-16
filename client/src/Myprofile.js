import React,{useContext,useEffect,useState} from 'react';
import {store} from './App';
import axios from 'axios';
import {Navigate} from 'react-router-dom'

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);

    useEffect(()=>{
        axios.get('http://localhost:5000/myprofile',{
            headers:{
                'x-token': token
            }
        }).then(res=>setData(res.data)).catch((err)=>console.log(err))
    },[]);
    if(!token){
        return <Navigate to='/login'/>
    }
  return (
    <div>
        {data && <h3>Welcome {data.name}</h3>}
    </div>
  )
}

export default Myprofile