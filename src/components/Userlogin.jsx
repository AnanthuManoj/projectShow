import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import loginImage  from '../Assets/Login-rafiki.png'
import regImage  from '../Assets/Sign up-rafiki.png'
import Header from './Header';
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../context/ContextShare';

function Userlogin({register}) {

  const{isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)

  const isRegister = register?true:false;
  const navigate = useNavigate()
  const [userData , setUserData] = useState({
     username:'',
     email:'',
     password:''
  })

  console.log(userData)

  const handleRegister = async(e)=>{
    const {username,email,password}=userData
    e.preventDefault()

    if(!username||!email||!password){
      toast.warn('Please fill all fields')
    }else{
      const res = await registerApi(userData)
      console.log(res);


      if(res.status===200){
        toast.info(`Registered Successfully completed ${res.data.username}`)
        setUserData({
          username:'',
          email:'',
          password:''
        })
        navigate('/login')
      }else{
        toast.warn(`${res.response.data}`)
      }
    }

  }

  const handleLogin = async(e)=>{
    e.preventDefault()
     const {email , password} = userData
  
     if(!email||!password){
      toast.warn('Please fill all fields')
     }else{
      const res = await loginApi(userData)
      console.log(res);
        if(res.status === 200){
          
          setIsAuthToken(true)
          sessionStorage.setItem("token",res.data.token)
          sessionStorage.setItem("ExistingUser",JSON.stringify(res.data.logUser))

          
          setUserData({
            username:'',
            email:'',
            password:''
          })
          
          toast.info('login successfull')
          navigate('/')
        }
        else{
          toast.warn(res.response.data)
        }
     }
  }


  return (
    <div>
      <Header/>
       <div className='mt-5 mb-5  d-flex align-items-center justify-content-center ' style={{height:'100vh'}}>

         <div className='container rounded shadow py-3 ' style={{backgroundColor:'whitesmoke'}}>
              <Row>
                <Col md={6} >
                   <img src={isRegister?regImage:loginImage}  width={'100%'} height={'100%'} alt="no image" style={{mixBlendMode:'multiply'}} />
                </Col>
                <Col md={6}>
                    <div className='d-flex align-items-center mt-3 flex-column'>  
                    <h1 className='fw-bold display-4'>ProjectPulse.</h1>
                    <h4 className='text-capitalize mt-3'>
                      {isRegister?'Sign up to your account':'Sign in to your account'}
                    </h4>
                    </div>

                    <div className='container'>
                     
                      <form>
                      {isRegister&&
                        <div className='mb-3'>
                          <label className='form-label'>UserName</label>
                          <input type='email' className='form-control' placeholder='UserName' value={userData.username}
                           onChange={(e)=>setUserData({... userData , username:e.target.value})} />
                        </div>}
                        <div className='mb-3'>
                          <label className='form-label'>Email address</label>
                          <input type='email' className='form-control' placeholder='Enter email'
                          value={userData.email}
                           onChange={(e)=>setUserData({... userData , email:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                          <label className='form-label'>Password</label>
                          <input type='password' className='form-control' placeholder='Enter password' value={userData.password} onChange={(e)=>setUserData({... userData , password:e.target.value})} />
                        </div>
                       { isRegister? <div className='mt-3'>
                        <button type='submit' className='btn btn-info mb-3' onClick={handleRegister} >Register</button>
                          <p>Already a User? <Link to ={"/login"} className='text-primary'>Login here</Link></p>
                        </div>:
                        <div className='mt-3'>
                        <button type='submit' className='btn btn-info mb-3' onClick={handleLogin}>Login</button>
                         <p>New User? <Link to ={"/register"} className='text-primary'>register here</Link></p>
                        </div>}
                      </form> 
                     
                    </div>
                </Col>
              </Row>
         </div>

       </div>
       <ToastContainer position="top-center"
        autoClose={3000} theme="light"/>
    </div>
  )
}

export default Userlogin