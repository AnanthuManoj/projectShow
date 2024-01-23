import axios from "axios"


export const commonApi = async(httpRequest,url,reqBody,reqHeader)=>{
    const  requestConfig  = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}//we have 2 types of content on from internet and other from our device  so we used ternary operator
    }
   return await axios(requestConfig).then((result)=>{

           return result

       }).catch((error)=>{

        return error

       })
}