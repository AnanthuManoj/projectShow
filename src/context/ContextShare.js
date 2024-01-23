import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({children}) {
    //childern is a predefined prop used to share data between component
const [addProjectResponse, setAddProjectResponse]= useState({})

const [editProjectResponse , setEditProjectResponse] = useState({})

const [isAuthToken,setIsAuthToken] = useState(false)

  return (
    <div>

      {/* 
      provider 
       */}

      <addProjectResponseContext.Provider value={{addProjectResponse, setAddProjectResponse}}>
       <editProjectResponseContext.Provider value={{editProjectResponse , setEditProjectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}> {children}</isAuthTokenContext.Provider>
         </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
        
    </div>
  )
}

export default ContextShare