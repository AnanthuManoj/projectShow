import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { isAuthTokenContext } from '../context/ContextShare';

function Header({dash}) {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  const dashboardbtn = dash?true:false;
  const [isLogin,setIsLogin] = useState(false)

  const handleLogOut = ()=>{
     sessionStorage.removeItem('token')
     sessionStorage.removeItem('existingUser')
     setIsAuthToken(false)
  }

  useEffect(()=>{
   if(sessionStorage.getItem('token')){
    setIsLogin(true);
   }
  },[])

 


  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
       <Container>
        <Navbar.Brand href="/" className='text-info'>
            <h3 className='fw-bold'>ProjectPulse.</h3>
        </Navbar.Brand>
        <Navbar id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link>{isLogin?
                <button className='btn btn-info'>
                  <Link to={dashboardbtn?"/":"/login"} style={{textDecoration:'none', color:'white'}} onClick={handleLogOut} >LogOut</Link>
                  </button>:
                <button className='btn btn-info'>
                  <Link to={"/login"} style={{textDecoration:'none', color:'white'}} >Login</Link>
                  </button>}
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header