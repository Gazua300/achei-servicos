import React, { useEffect, useState, useContext, useCallback } from 'react'
import styles from './style'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import { convertPhone } from '../../utils/convertPhone'
import { Searchbar } from 'react-native-paper'
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

  


  const getJobById = (job)=>{
    axios.get(`${url}/job/${job.id}`).then(res=>{
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
        <Searchbar style={{backgroundColor:'#151E3D', marginBottom:10, marginHorizontal:10}} 
          placeholder='Título do serviço'
          placeholderTextColor='whitesmoke' 
          color='white'
          onChangeText={setSearchWord}
          value={searchWord}/>
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}
          refreshing={refreshing}/>}>
          {found && found.map(job=>{
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
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  )
}
