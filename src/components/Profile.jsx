import React, { useEffect, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import pImg from "../Assets/avatar-3814049_1280.png";
import { getUserDetails, updateUserProfileApi } from '../services/allApi';
import { BASE_URL } from '../services/baseUrl';

function Profile() {
    const [open, setOpen] = useState(false);
    const [imageUrl,setImageUrl]=useState("")

    const [userPFP,setUserPFP] = useState("")
    

    const users = JSON.parse(sessionStorage.getItem('ExistingUser'))
    const id = users._id

    const getUser = async()=>{
      const result = await getUserDetails(id)
      setUserProfile(result.data[0]);
    }

    useEffect(()=>{
      getUser()
    },[])

    
    const [userProfile, setUserProfile]=useState({
        username:users.username,
        email:users.email,
        password:users.password,
        github:users.github,
        linkedin:users.linkedin,
        profile:""
    })

    console.log(userProfile);

    const handleSave = async (e)=>{
      e.preventDefault()
      const{username,email,password,github,linkedin,profile}= userProfile
      const reqBody = new FormData()
      reqBody.append('username',username)
      reqBody.append('email',email)
      reqBody.append('password',password)
      reqBody.append('github',github)
      reqBody.append('linkedin',linkedin)
      imageUrl?reqBody.append('profile',userPFP):reqBody.append('profile',profile)

      const token = sessionStorage.getItem('token')
     
     
      if(imageUrl){
        const reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
         const result = await updateUserProfileApi(id,reqBody,reqHeader)
         console.log(result.data);
         if(result.status ===200){
         
          alert('sucessfully updated')
         }else{
          console.log(result.response.data);
        }
      }else{
        const reqHeader ={
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        const result = await updateUserProfileApi(id,reqBody,reqHeader)
         console.log(result.data);
         if(result.status ===200){
         
          alert('sucessfully updated')

         }else{
          console.log(result.response.data);
        }
      }
    }

    useEffect(()=>{
      userPFP&&setImageUrl(URL.createObjectURL(userPFP))
    },[userPFP])

   console.log(imageUrl);
   console.log(userPFP);

  return (
    <div>
 
     <div className='border shadow rounded p-3'>
        <div className='d-flex justify-content-between mb-3'>
            <h3 className='fw-bold'>Profile</h3>
            <button   onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open} className='btn btn-outline-info fs-3'><i class="fa-solid fa-circle-chevron-down"></i></button>
        </div>
           {!open&&
            <p className='fw-bold'>{userProfile.profile? `Update`:`Upload` } your profile picture</p>}
        <div>
        <Collapse in={open}>
        <div id="example-collapse-text">
            <div>
                <div className=' d-flex justify-content-center'>
                    <label htmlFor="Profile" className='d-flex justify-content-center'>
                        <input type="file" style={{display:'none'}} id='Profile' onChange={(e)=>setUserPFP(e.target.files[0])} />
                        <img src={imageUrl?imageUrl:userProfile.profile?`${BASE_URL}/upload/${userProfile.profile}`:pImg} alt="" width={'70%'}className='rounded-circle'/>
                    </label>
                </div>
                <div>
                    <div className='mt-4'>
                       <input type="text" placeholder='GitHub' className='form-control' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})}/>
                    </div>
                    <div className='mt-4'>
                       <input type="text" placeholder='LinkedIn' className='form-control' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})}/>
                    </div>
                    <div className='mt-4'>
                      <button className='btn btn-info w-100' onClick={handleSave}>Save</button>
                    </div>
                   { !userProfile.profile&&<p className='mt-3 fw-bold'>Once you're satisfied, hit save! Your profile picture is now part of your unique presence</p>}
                </div>
            </div>
        </div>
      </Collapse>
        </div>
     </div>

    </div>
  )
}

export default Profile