import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../Assets/vecteezy_man-in-front-of-computer-monitor-flat-vector-illustraiton_7686736.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { homeProjectApi } from '../services/allApi'
import { isAuthTokenContext } from '../context/ContextShare'

function Home() {

  const [isLogin, setIsLogin] = useState(false)
  const [project , setProject ]= useState([])
  const{isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)

  const checkLogin =()=>{
    if(sessionStorage.getItem('token')){
      setIsLogin(true)
    }
  }

  useEffect(()=>{
    checkLogin()
  },[])

  const getHomeProject = async ()=>{
    const result = await homeProjectApi()
    setProject(result.data);
  }

  useEffect(()=>{
    getHomeProject()
  },[])


  return (
    <div>
            <Header/>


     <div  style={{height:'100vh',backgroundColor:'#F6F6F6'}}>
         <div className='container rounded '>
             <Row style={{height:'100vh'}}>
                <Col className='d-flex align-items-center justify-content-center' sm={12} md={6}>
                    <div>
                        <h1 className='display-4 fw-bold'>ProjectPulse</h1>
                        <p className='fs-5'>A simple and easy way to manage your projects.</p>
                         {!isLogin?
                        <Link to={'/login'}><button className='btn btn-info' >Get Started</button></Link>
                        : <Link to={'/dashboard'}><button className='btn btn-info'onClick={()=>setIsAuthToken(true)}>manage projects</button></Link>
                        }
                    </div>
                </Col>
                <Col className='d-flex align-items-center' sm={12} md={6}>
                    <div>
                        <img style={{mixBlendMode:'multiply'}} src={titleImage} className='img-fluid' alt=''/>
                    </div>
                </Col>
             </Row>
         </div>
     </div>

     <div className='mt-5 all-projects mb-5'>
       <h1 className='text-center display-5 fw-bold mb-5'>Explore Our Projects</h1>
       <div className='d-flex container justify-content-center'>
          <Row>

            {project?.length>0?
             project?.map((item)=>(
              <Col sm={12} md={12} lg={4} >
              <ProjectCard projects={item}  />
               </Col>
             ))
              :null
            }
  
          </Row>
       </div>
     </div>

     <div className='text-center mt-5 mb-5'>
        <Link to={isLogin?'/project':'/login'}  className='text-primary'>
          <button className='btn btn-outline-primary'>See More Projects</button>
          </Link>
     </div>

    </div>
  )
}

export default Home