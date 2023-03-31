import React, { useState, useContext, useEffect } from 'react'
import Context from '../../global/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { url } from '../../constants/urls'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'



export default function Signup(props){
  const { expoPushToken } = useContext(Context)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPass, setVerifyPass] = useState('')
  const placeholderBackground = 'rgba(255, 255, 255, 0.5)'
  

  
  const registUser = ()=>{
    const body = {
      name,
      email,
      password,
      verifyPass,
      push_token: expoPushToken
    }
    
    axios.post(`${url}/signup`, body).then(async res=>{
      await AsyncStorage.setItem('id', res.data)
      props.navigation.navigate('List')
    }).catch(err=>{
      alert(err.response.data)
    })
    
  }


  const limpar = ()=>{
    setName('')
    setEmail('')
    setPassword('')
    setVerifyPass('')
  }



  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput style={styles.input}
              onChangeText={setName}
              value={name}
              placeholderTextColor={placeholderBackground}
              placeholder='Nome de usuário'/>

            <TextInput style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={placeholderBackground}
              placeholder='nome@email.com'
              />

            <TextInput style={styles.input}
              onChangeText={setPassword}
              value={password}
              keyboardType='numeric'
              placeholderTextColor={placeholderBackground}
              placeholder='Sua senha'
              secureTextEntry={true}
              />

            <TextInput style={styles.input}
              onChangeText={setVerifyPass}
              value={verifyPass}
              placeholderTextColor={placeholderBackground}
              placeholder='Repita sua senha'
              secureTextEntry={true}
              />


            <View style={styles.btnContainer}>              
              <TouchableOpacity style={styles.btnNav}
                onPress={limpar}>
                <Text style={styles.txtBtn}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNav}
                onPress={registUser}>
                <Text style={styles.txtBtn}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    bgImage: {
      flex: 1
    },
    formContainer: {
      marginHorizontal: 20,
      marginTop: 50
    },
    btnContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnNav: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#151E3D',
      width: '45%',
      height: 40,
      borderRadius: 20,
      margin: 10,
  
    },
    txtBtn: {
      color: 'whitesmoke',
      fontSize: 15
    },
    input: {
      margin: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: 'whitesmoke',
      height: 40,
      fontSize: 18,
      paddingHorizontal: 15,
      color: 'whitesmoke'
    }
  })