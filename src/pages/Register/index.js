import React, { useState, useContext, useEffect } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'



export default function Register(props){
  const { expoPushToken, sendPushNotifications, getAllJobs } = useContext(Context)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [period, setPeriod] = useState('')
  const placeholderBackground = 'rgba(255, 255, 255, 0.5)'
  

  
  const registJob = async()=>{
    const body = {
      title,
      description,
      phone,
      period,
      push_token: expoPushToken
    }
    
    axios({
      method:'POST',
      url:`${url}/jobs`,
      headers: {
        Authorization: await AsyncStorage.getItem('id')
      },
      data: body
    }).then(res=>{
      alert(res.data)
      props.navigation.navigate('List')
      getAllJobs()
    }).catch(e=>{
      alert(e.response.data)
    })
    
  }


  const limpar = ()=>{
    setDescription('')
    setPeriod('')
    setPhone('')
    setTitle('')
  }



  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholderTextColor={placeholderBackground}
              placeholder='Título'
              />

            <TextInput style={styles.textarea}
              onChangeText={setDescription}
              value={description}
              multiline={true}
              placeholderTextColor={placeholderBackground}
              placeholder='Descrição dos seus serviços'
              />

            <TextInput style={styles.input}
              onChangeText={setPhone}
              value={phone}
              keyboardType='numeric'
              placeholderTextColor={placeholderBackground}
              placeholder='Telefone'
              />

            <TextInput style={styles.textarea}
              onChangeText={setPeriod}
              value={period}
              multiline={true}
              placeholderTextColor={placeholderBackground}
              placeholder='Período de atendimento'
              />


            <View style={styles.btnContainer}>              
              <TouchableOpacity style={styles.btnNav}
                onPress={limpar}>
                <Text style={styles.txtBtn}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNav}
                onPress={registJob}>
                <Text style={styles.txtBtn}>Cadastrar serviço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
