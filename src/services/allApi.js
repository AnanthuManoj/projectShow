const { BASE_URL } = require("./baseUrl")
const { commonApi } = require("./commonApi")

//register Api

export const registerApi = async (users)=>{
    return  await commonApi('POST',`${BASE_URL}/user/register`,users,'')
}

//login api

 export  const loginApi = async(users)=>{
      return  await commonApi('POST',`${BASE_URL}/user/login`,users,"")
   }

   
//upload projects
export  const addProjectApi = async(reqBody,reqHeader)=>{
    return  await commonApi('POST',`${BASE_URL}/project/add`,reqBody,reqHeader)  
 }   

//home projects

 export  const homeProjectApi = async()=>{
    return  await commonApi('GET',`${BASE_URL}/project/home-project`)  
 }  

// all projects
export  const allProjectApi = async(searchkey , reqHeader)=>{
   //query parameter = path?key=value
    return  await commonApi('GET',`${BASE_URL}/project/all-project?search=${searchkey}`,'',reqHeader)  
 }  

 //user projects
 export  const userProjectApi = async(reqHeader)=>{
    return  await commonApi('GET',`${BASE_URL}/user/all-project`,'',reqHeader)  
 }   

 //edit project

 export  const editProjectApi = async(projectid , reqBody ,reqHeader)=>{
   return  await commonApi('PUT',`${BASE_URL}/project/edit/${projectid}`,reqBody,reqHeader)  
} 

//delete project


export  const deleteProjectApi = async(projectid,reqHeader)=>{
   return  await commonApi('DELETE',`${BASE_URL}/project/remove/${projectid}`,{},reqHeader)  
} 

//edit userProfile
export  const updateUserProfileApi = async(userid,reqBody,reqHeader)=>{
   return  await commonApi('PUT',`${BASE_URL}/user/profile/${userid}`,reqBody,reqHeader)  
} 

//user
export const getUserDetails = async(id)=>{
 return await commonApi('POST',`${BASE_URL}/user/details/${id}`)
}
