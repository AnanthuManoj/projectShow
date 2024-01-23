import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import uploadImg from '../Assets/3129492.jpg'
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProjects() {
    const [show, setShow] = useState(false);

    const {setAddProjectResponse} =useContext(addProjectResponseContext)

    const handleClose = () => {
      setShow(false)
      handleClear()
    };
    const handleShow = () => setShow(true);
    //state to hold the token
    const [token , setToken]=useState('')

    useEffect(()=>{
       sessionStorage.getItem('token')&&setToken(sessionStorage.getItem('token'))
    },[])

    //state to hold the url of image
    const [imageUrl,setImageUrl]=useState("");

    const [uploadData , setUploadData] = useState({
       title:'',
       language:'',
       github:'',
       website:'',
       overview:'',
       projectImg:''
    })
    console.log(uploadData);

   useEffect(()=>{
     uploadData.projectImg&&setImageUrl(URL.createObjectURL(uploadData.projectImg))
   },[uploadData.projectImg])

   console.log(imageUrl);

   const handleClear =()=>{
    setUploadData({
      title:'',
      language:'',
      github:'',
      website:'',
      overview:'',
      projectImg:''
    })
    setImageUrl('')
   }

   const handleUplodProjects = async (e)=>{
       e.preventDefault()
       const{title,language,github,website,overview,projectImg} = uploadData

       if(!title||!language||!github||!website||!overview ||!projectImg){
           alert('please fill all the fields')
        }else{
           //reqBody
           //1)create an object for form data
           const reqBody = new FormData()
           //2)append each data to the formdata object
           reqBody.append('title',title)
           reqBody.append('language',language)
           reqBody.append('github',github)
           reqBody.append('website',website)
           reqBody.append('overview',overview)
           reqBody.append('projectImg',projectImg)

           //3)reqHeader
        if(token) { 
          const reqHeader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }

           const result = await addProjectApi(reqBody,reqHeader)
           console.log(result);

           if(result.status===200){
            alert('project added successfully')
            console.log(result.data);
            handleClose()
            setAddProjectResponse(result.data)
           }else{
            alert(result.response.data)
            handleClear()
           }
        }
      }

      }
  
  return (
    <div>
        <div>
            <button className='btn btn-info' onClick={handleShow}>Add Projects</button>
        </div>
        <div>
        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6}>
                  <label htmlFor="Upload">
                    <input type="file" style={{display:'none'}} id='Upload'onChange={(e)=>setUploadData({...uploadData,projectImg:e.target.files[0]})} />
                    <img src={imageUrl?imageUrl:uploadImg} alt="no image" width={'100%'} />
                  </label>
                </Col>
                <Col sm={12} md={6}>
                     <div>
                        <form>
                        <div className='mb-3'>
                          <input type='text' className='form-control' placeholder='Project Title' value={uploadData.title} onChange={(e)=>setUploadData({...uploadData,title:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                          <input type='text' className='form-control' placeholder='Language Used' value={uploadData.language}  onChange={(e)=>setUploadData({...uploadData,language:e.target.value})}/>
                        </div>
                        <div className='mb-3'>
                          <input type='email' className='form-control' placeholder='Git hub link' value={uploadData.github} onChange={(e)=>setUploadData({...uploadData,github:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                          <input type='text' className='form-control' placeholder='Website link'  value={uploadData.website} onChange={(e)=>setUploadData({...uploadData, website:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <textarea className='form-control' rows={3} placeholder='Project Overview' value={uploadData.overview} onChange={(e)=>setUploadData({...uploadData,overview:e.target.value})}></textarea>
                        </div>
                        </form>
                     </div>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClear} className='btn btn-danger'>
            Clear
          </Button>
          <Button variant="info" onClick={handleUplodProjects}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    </div>
  )
}

export default AddProjects