import React,{useState} from 'react'
import axios from 'axios';

const Register = () => {
    const [data,setData] = useState({
        name:'',
        email:'',
        phone:'',
        password:''
    });

    const changeHandler = (e) =>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log(data);
        axios.post('http://localhost:5000/register',data).then(
            res => alert(res.data)
        )
        setData({
            name:'',
            email:'',
            phone:'',
            password:''
        });
    }

  return (
    <div>
        <center>
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <input type='text' onChange={changeHandler} name="name" placeholder='User name'/><br/>
                <input type='text' onChange={changeHandler} name="email" placeholder='Email'/><br/>
                <input type='text' onChange={changeHandler} name="phone" placeholder='Phone number'/><br/>
                <input type='password' onChange={changeHandler} name="password" placeholder='Password'/><br/>
                <input type='submit' name='Submit'/>
            </form>
        </center>
    </div>
  )
}

export default Register