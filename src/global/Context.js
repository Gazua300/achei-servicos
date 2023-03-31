import React, { createContext, useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from '../constants/urls'
import { Platform } from 'react-native'


const Context = createContext()


Notifications.setNotificationHandler({
  handleNotification: async()=>({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true
  })
})


export const Provider = (props)=>{
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState({})
  const [user, setUser] = useState({})
  const [expoPushToken, setExpoPushToken] = useState('')
  

  

  useEffect(()=>{
    registerForPushNotificationsAsync().then(token=>{
      setExpoPushToken(token)
    })
  }, [])
    
  
  const getAllJobs = async()=>{
    axios.get(`${url}/jobs`, {
      headers: {
        Authorization: await AsyncStorage.getItem('id')
      }
    }).then(res=>{
      setJobs(res.data)
    }).catch(err=>{
      alert('erro na função getAlljobs: '+err.response.data)
    })
  }

//FUNÇÃO PARA REGISTRO DE TOKEN DE NOTIFICAÇÃO

  const registerForPushNotificationsAsync = async()=>{
    let token

    if(Platform.OS === 'android'){
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    
    if(existingStatus !== 'granted'){
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if(finalStatus !== 'granted'){
      alert('Dispositivo não concedeu permissão para receber token de noficação!')
      return
    }

    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)  
    
    return token
  }


//ATUALIZAÇÃO DE TOKEN DE NOTIFICAÇÃO NO BACKEND

  const updatePushToken = async()=>{
    const id = await AsyncStorage.getItem('jobId')
    
    const body = {
      push_token: expoPushToken
    }
    axios.put(`${url}/pushtoken/${id}`, body).then(res=>{
      console.log(res.data)
    }).catch(e=>{
      console.log(e.response.data)
    })
  }

//ENVIO DE NOTIFICAÇÕES

  const sendPushNotifications = (title, body)=>{
    jobs && jobs.map(async(job)=>{
      const message = {
        to: job.push_token,
        sound: 'default',
        title: title,
        body: body 
      }
      await axios.post('https://exp.host/--/api/v2/push/send', message).then(res=>{
        console.log(res.data)
      }).catch(e=>{
        console.log(e.response.data)
      })
    })
  }


  const getProfile = async()=>{
    axios.get(`${url}/user`, {
        headers: {
            Authorization: await AsyncStorage.getItem('id')
        }
    }).then(res=>{
        setUser(res.data)
    }).catch(e=>{
        alert(e.response.data)
    })
  }


    
  return<Context.Provider value={{
    getAllJobs,
    jobs,
    job,
    setJob,
    user,
    getProfile,
    expoPushToken,
    updatePushToken,
    sendPushNotifications
  }}>
          { props.children }
        </Context.Provider>
}

export default Context
