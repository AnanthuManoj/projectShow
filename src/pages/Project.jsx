import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import Header from '../components/Header'
import { allProjectApi } from '../services/allApi'

function Project() {

  const [allprojects,setAllProjects]= useState([])
  const [search, setSearch] = useState('')

  console.log(search);


  const getAllProjects = async()=>{
       if(sessionStorage.getItem('token')){
        const token = sessionStorage.getItem('token')
        const reqHeader = {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        }
        const result = await allProjectApi(search , reqHeader)
        console.log(result);
        if(result.status === 200){
          setAllProjects(result.data)
        }else{
          console.log(result);
        }
       }
  }



  useEffect(()=>{
    getAllProjects();
  },[search])


  return (
    <div>
      <Header/>
      <div className='d-flex justify-content-center mb-5'>
        <div style={{gap:'2rem', width:'100%'}} className='d-flex flex-column align-items-center'>
          <h1 className='fw-bold'>All Projects</h1>
          <input type="text" className='form-control w-25' placeholder='search the projects' value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <Row className='container mb-5 text-center'>
  
       { allprojects?.length>0?
       allprojects.map((item)=>(
        <Col md={6}>  
      
        <ProjectCard projects={item} />
        </Col>
       ))
       :
        <p className='text-center text-warning display-4 fw-bold text-capitalize'>nothing to display</p>
        }
        </Row>
      </div>
    </div>
  )
}

export default Project