import React, { useState, useContext, useEffect } from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import styles from './style'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'



export default function Register(props){
  const { expoPushToken, getToken, sendPushNotifications } = useContext(Context)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [period, setPeriod] = useState('')
  const placeholderBackground = 'rgba(255, 255, 255, 0.5)'
  

  
  const registJob = ()=>{
    const body = {
      title,
      description,
      phone,
      period,
      push_token: expoPushToken
    }
    
    axios.post(`${url}/jobs`, body).then(res=>{
      getToken(res.data.id)
      alert(`${title} cadastrado com sucesso!`)
      props.navigation.navigate('List')
      sendPushNotifications('Novo serviço cadastrado', `${title} acaba de ser cadastrado`)
    }).catch(err=>{
      alert(err.response.data)
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
