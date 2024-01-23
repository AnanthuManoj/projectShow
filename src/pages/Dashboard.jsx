import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../components/Header'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dashboard({dashboard}) {
  const dash = dashboard
  const[uname , setUname] = useState('')

  useEffect(()=>{
    setUname(JSON.parse(sessionStorage.getItem('ExistingUser')).username)
  },[])

  return (
    <div>
     <Header dash/>
     <div className='container'>
      <h1 className='text-center display-4 fw-bold mt-4 mb-5'>Welcome <span className='text-primary text-capitalize'>{uname}</span></h1>
      <Row className='mb-5'>
        <Col md={4}>
          <Profile/>
        </Col>
        <Col md={8}>
          <MyProjects/>
        </Col>
      </Row>
     </div>

    </div>
  )
}

export default Dashboard