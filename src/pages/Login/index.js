import React, { useState, useEffect } from 'react'
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



export default function Login(props){
  const [email, setEmail] = useState('visitante@email.com')
  const [password, setPassword] = useState('123456')
  const placeholderBackground = 'rgba(255, 255, 255, 0.5)'



  useEffect(()=>{
    (async()=>{
        const token = await AsyncStorage.getItem('id')

        if(token){
            props.navigation.navigate('List')
        }
    })()
  }, [])
  

  
  const login = ()=>{
    const body = {
      email,
      password
    }
    
    axios.post(`${url}/login`, body).then(async res=>{
      await AsyncStorage.setItem('id', res.data)
      props.navigation.navigate('List')
    }).catch(err=>{
      alert(err.response.data)
    })
    
  }


  const limpar = ()=>{
    setEmail('')
    setPassword('')
  }



  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.formContainer}>
            <TextInput style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholderTextColor={placeholderBackground}
              placeholder='nome@email.com'
              />

            <TextInput style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholderTextColor={placeholderBackground}
              placeholder='Sua senha'
              secureTextEntry={true}
              />
            <View style={styles.btnContainer}>              
              <TouchableOpacity style={styles.btnNav}
                onPress={limpar}>
                <Text style={styles.txtBtn}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnNav}
                onPress={login}>
                <Text style={styles.txtBtn}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{color:'whitesmoke'}}>Se não tem cadastro clique
              <Text style={{color:'blue'}}
                onPress={()=>{
                  props.navigation.navigate('Signup')
                }}>{' '}aqui</Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  bgImage: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  }
})