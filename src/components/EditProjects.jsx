import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseUrl';
import { editProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProjects({project}) {

  const {setEditProjectResponse} = useContext(editProjectResponseContext)

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
      };
    
    const handleShow = () => setShow(true);
    const [preview , setPreview] = useState('')
    const [EditData , setEditData] = useState({
        id:project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
     })

     useEffect(()=>{

        EditData.projectImage&&setPreview(URL.createObjectURL(EditData.projectImage))

     },[EditData.projectImage])

     const handleCancel =()=>{
        setEditData({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
     }

     const handleUpdate = async(e)=>{
      console.log(EditData);
         e.preventDefault()
        const{id,title,language,github,website,overview,projectImage}=EditData

        if(!title||!language||!github||!website||!overview){
            alert('please fill all the fields')
         }else{
       const reqBody = new FormData()
       reqBody.append('title',title)
       reqBody.append('language',language)
       reqBody.append('github',github)
       reqBody.append('website',website)
       reqBody.append('overview',overview)
       preview?reqBody.append('projectImg',projectImage):reqBody.append('projectImg',project.projectImage)
        

         const token = sessionStorage.getItem('token')

         if(preview){
          const reqHeader ={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await editProjectApi(id , reqBody , reqHeader)
          console.log(result);
          if(result.status ===200){
            alert('sucessfully updated')
            handleClose()
            setEditProjectResponse(result.data)
          }else{
            console.log(result.response.data);
          }
         }
         else{
          const reqHeader ={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await editProjectApi(id , reqBody , reqHeader)
          console.log(result);
          if(result.status ===200){
            alert('sucessfully updated')
            handleClose()
            setEditProjectResponse(result.data)
          }else{
            console.log(result.response.data);
          }
         }
      }
     }

    
  return (
    <>
         <a onClick={handleShow}><i class="fa-solid fa-pen-to-square me-3"></i></a>
         <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6}>
                  <label htmlFor="Upload">
                    <input type="file" style={{display:'none'}} id='Upload' onChange={(e)=>setEditData({...EditData,projectImage:e.target.files[0]})} />
                    <img src={preview?preview:`${BASE_URL}/upload/${project.projectImage}`} alt="no image" width={'100%'} />
                  </label>
                </Col>
                <Col sm={12} md={6}>
                     <div>
                        <form>
                        <div className='mb-3'>
                          <input type='text' className='form-control' placeholder='Project Title' value={EditData.title} onChange={(e)=>setEditData({...EditData,title:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                          <input type='text' className='form-control' placeholder='Language Used' value={EditData.language} onChange={(e)=>setEditData({...EditData,language:e.target.value})}/>
                        </div>
                        <div className='mb-3'>
                          <input type='email' className='form-control' placeholder='Git hub link' value={EditData.github} onChange={(e)=>setEditData({...EditData,github:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                          <input type='text' className='form-control' placeholder='Website link'  value={EditData.website} onChange={(e)=>setEditData({...EditData,website:e.target.value})} />
                        </div>
                        <div className='mb-3'>
                            <textarea className='form-control' rows={3} placeholder='Project Overview' value={EditData.overview} onChange={(e)=>setEditData({...EditData,overview:e.target.value})}></textarea>
                        </div>
                        </form>
                     </div>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCancel} className='btn btn-danger'>
            Cancel
          </Button>
          <Button variant="info" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProjects