import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-info p-5'>
    <div className='container border-bottom '>
        <ul style={{listStyle:'none'}} className=' text-white text-start mb-5'>
      <Row>

        <Col sm={12} md={6} lg={3}>
        <li >

          <h3 className='fw-bold display-5 text-dark'>
          ProjectPulse.
          </h3>
       <p>A simple and easy way to manage your projects.</p>
    
       </li>
       </Col>

       <Col sm={12} md={6} lg={3}>
       <li >
       <ul style={{listStyle:'none'}}>
         <p className='fw-bold text-dark mt-3'>links</p>
          <li><Link to={'/'} style={{textDecoration:'none', color:'white'}}>Home</Link></li>
          <li><Link to={'/login'} style={{textDecoration:'none', color:'white'}}>Login</Link></li>
          <li><Link to={'/register'} style={{textDecoration:'none', color:'white'}}>Register</Link></li>
          </ul>
      </li>
       </Col>

       <Col sm={12} md={6} lg={3}>
       <li  >
       <ul style={{listStyle:'none'}}>
        <p className='fw-bold text-dark mt-3'>Products</p>
          <li>Angular</li>
          <li>React</li>
          <li>Next js</li>
          </ul>
 </li>
       </Col>

        <Col sm={12} md={6} lg={3}>
       <li >
       <ul style={{listStyle:'none'}}>
         <p className='fw-bold text-dark mt-3'>Useful links</p>
          <li>Pricing</li>
          <li>Blog</li>
          <li>Bootstrap</li>
          </ul>
      </li>
        </Col>

      </Row>
        </ul>
  
     </div>

       <p className='text-white text-center'>copyright © 2023 : projectPulse.</p>  

</div>
  )
}

export default Footer

