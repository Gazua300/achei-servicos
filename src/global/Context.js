import React, { createContext, useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { url } from '../constants/urls'
import { Platform } from 'react-native'


const Context = createContext()


Notifications.setNotificationHandler({
  handleNotification: async()=>({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: true
  })
})


export const Provider = (props)=>{
  const [jobs, setJobs] = useState([])
  const [job, setJob] = useState({})
  const [expoPushToken, setExpoPushToken] = useState('')
  


  useEffect(()=>{
    registerForPushNotificationsAsync().then(token=>{
      setExpoPushToken(token)
    })
  }, [])



  const getToken = async(tk)=>{
    try{

      await AsyncStorage.setItem(tk, tk)

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

    if(Device.isDevice){
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
    }else{
      alert('Você deve usar um dispositivo fisico para notificações')
    }
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


    
  return<Context.Provider value={{
    getAllJobs,
    jobs,
    job,
    setJob,
    getToken,
    expoPushToken,
    updatePushToken,
    sendPushNotifications
  }}>
          { props.children }
        </Context.Provider>
}

export default Context
