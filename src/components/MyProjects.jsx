import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { deleteProjectApi, userProjectApi } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProjects from './EditProjects'

function MyProjects() {
  const {editProjectResponse } = useContext(editProjectResponseContext)
  const [userProject , setUserProject]= useState([])
  const {addProjectResponse} =useContext(addProjectResponseContext)


  const getUserProjects = async()=>{
    const token = sessionStorage.getItem('token')
    const reqHeader = {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    }
    const result = await userProjectApi(reqHeader)
    setUserProject(result.data);
  }

const handleDelete = async(id)=>{
  const token = sessionStorage.getItem('token')
  const reqHeader = {
    'Content-Type':'application/json',
    'Authorization': `Bearer ${token}`
  }
  const result = await deleteProjectApi(id,reqHeader)
  console.log(result);
  if(result.status === 200){
    getUserProjects()
  }else{
    console.log(result.response.data);
  }
}


  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])

  return (
    <div>
      <div className='border p-4 mb-4 shadow rounded'>
        <div className='d-flex justify-content-between'>
          <h4>My projects</h4>
          <AddProjects/>
        </div>
           {userProject?.length>0?
           userProject?.map((item)=>(
        <div className='border mt-3 p-3 rounded'>
            <div className='d-flex justify-content-between align-items-center '>
            <h4 className='fw-bold'>{item.title}</h4>
            <div>
            <EditProjects project={item}/>
            <a href={item.github} target='_blank'><i class="fa-brands fa-github me-3 "></i></a>
            <a style={{cursor:'pointer'}} onClick={()=>handleDelete(item._id)}><i class="fa-solid fa-trash me-3 "></i></a>
            </div>
           </div>
           
           

        </div>
           )):<div className='mt-4'>
           <h3 className='text-warning'>No Project Uploaded Yet !!!</h3>
          </div>
        }
        
      </div>
    </div>
  )
}

export default MyProjects