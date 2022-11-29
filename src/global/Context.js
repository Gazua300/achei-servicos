import React, { createContext, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from '../constants/urls'


const Context = createContext()


export const Provider = (props)=>{
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState({})
  const [perfil, setPerfil] = useState({})



  const getToken = async(tk)=>{
    try{

      await AsyncStorage.setItem('token', tk)

    }catch(e){
      alert(e)
    }
  }


  const getId = async(tk)=>{
    try{

      await AsyncStorage.setItem('id', tk)

    }catch(e){
      alert(e)
    }
  }
  
  
  const getAllJobs = ()=>{
    axios.get(`${url}/jobs`).then(res=>{
      setJobs(res.data)
    }).catch(err=>{
      alert(err.response.data)
    })
  }


  
  return<Context.Provider value={{
    getAllJobs,
    jobs,
    job,
    setJob,
    getToken,
    getId,
    setPerfil
  }}>
          { props.children }
        </Context.Provider>
}

export default Context
