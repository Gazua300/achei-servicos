import React, { useEffect, useState, useContext, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import { convertPhone } from '../../utils/convertPhone'
import { Searchbar } from 'react-native-paper'
import styles from './style'
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler
} from 'react-native'



export default function List(props){
  const { getAllJobs, jobs, setJob } = useContext(Context)  
  const [refreshing, setRefreshing] = useState(false)
  const [searchWord, setSearchWord] = useState('')

  useEffect(()=>{
    getAllJobs()
  }, [])

  useEffect(()=>{
    (async()=>{
      axios.get(`${url}/jobs`, {
        headers: {
          Authorization: await AsyncStorage.getItem('id')
        }
      }).then((res)=>{
        console.log(res.data)
      }).catch(async err=>{
        if(err.response.data === 'jwt expired'){
          await AsyncStorage.clear()
          props.navigation.navigate('Login')
        }
      })
    })()
  }, [])

  useEffect(()=>{
    (async()=>{
      const token = await AsyncStorage.getItem('id')

      if(!token){
        props.navigation.navigate('Login')
      }
    })()
  }, [])


  BackHandler.addEventListener('hardwareBackPress', ()=>{
    
    return true
  })
  

  const wait = (timout)=>{    
    return new Promise(resolve => setTimeout(resolve, timout))
  }


  const onRefresh = useCallback(()=>{
    getAllJobs()
    setRefreshing(true)    
    wait(3000).then(()=> setRefreshing(false))
  }, [])

  


  const getJobById = async(job)=>{
    axios.get(`${url}/job/${job.id}`, {
      headers: {
        Authorization: await AsyncStorage.getItem('id')
      }
    }).then(res=>{
      setJob(res.data)
      props.navigation.navigate('Detalhes')
    }).catch(e=>{
      alert(e.response.data)
    })
  }
  

  const found = jobs && jobs.filter(res=>{
    return res.title.toLowerCase().includes(searchWord.toLocaleLowerCase())
  })


  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>        
      <View style={styles.container}>
        <Searchbar style={{
          backgroundColor:'rgba(21, 30, 61, 0.7)',
          marginBottom:10, 
          marginHorizontal:10}} 
          placeholder='Título do serviço'
          placeholderTextColor='rgba(255, 255, 255, 0.5)' 
          color='white'
          onChangeText={setSearchWord}
          value={searchWord}
          />
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}
          refreshing={refreshing}/>}>
          {found.length > 0 ? found.map(job=>{
            return(
              <View key={job.id}
                style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={{color:'whitesmoke', fontSize:18, textAlign:'center', marginBottom:'5%'}}>
                    {job.title}
                  </Text>
                  <Text style={styles.txtBtn}><Text style={styles.legend}>Descrição:</Text> {job.description}</Text>
                  <Text style={styles.txtBtn}><Text style={styles.legend}>Telefone:</Text> {convertPhone(job.phone)}</Text>
                  <Text style={styles.txtBtn}><Text style={styles.legend}>Atendimento:</Text> {job.period}</Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btnNav}
                      onPress={()=> getJobById(job)}>
                      <Text style={styles.txtBtn}>Adicionar aos contatos</Text>
                    </TouchableOpacity>
                  </View>                 
                </View>
              </View>
            )
          }) : <TouchableOpacity onPress={()=> props.navigation.navigate('Register')}>
                  <Text style={{textAlign:'center', fontSize:20, color:'whitesmoke'}}>
                    Adicionar serviço
                  </Text>
               </TouchableOpacity>}
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
