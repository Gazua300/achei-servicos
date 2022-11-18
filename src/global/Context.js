import React, { createContext, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from '../constants/urls'


const Context = createContext()


export const Provider = (props)=>{
  const [providerJob, setProviderJob] = useState([])
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState({})
  const [perfil, setPerfil] = useState({})
  const [detailHiredJob, setDetailHiredJob] = useState({})
  const [hiredJobs, setHiredJobs] = useState([])



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


  const getUser = async()=>{
    const id = await AsyncStorage.getItem('id')

    axios.get(`${url}/user/${id}`).then(res=>{
        setPerfil(res.data)
    }).catch(e=>{
        console.log(e.response.data)
    })
  }


  const jobByProvider = async()=>{
    const id = AsyncStorage.getItem('id')

    axios.get(`${url}/provider/jobs/${id}`).then(res=>{
      setProviderJob(res.data)
    }).catch(e=>{
      alert(e.response.data)
    })
  }


  const getHiredJobs = async()=>{
    const id = await AsyncStorage.getItem('id')

    axios.get(`${url}/provider/${id}`).then(res=>{
        setHiredJobs(res.data)
    }).catch(e=>{
        alert(e.response.data)
    })
}


  
  return<Context.Provider value={{
    getAllJobs, jobs, job, setJob, getToken, getId, jobByProvider, providerJob, perfil, setPerfil,
    getUser, detailHiredJob, setDetailHiredJob, getHiredJobs, hiredJobs
  }}>
          { props.children }
        </Context.Provider>
}

export default Context
