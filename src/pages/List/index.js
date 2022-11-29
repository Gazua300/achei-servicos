import React, { useEffect, useState, useContext } from 'react'
import styles from './style'
import Context from '../../global/Context'
import axios from 'axios'
import { url } from '../../constants/urls'
import { convertPhone } from '../../utils/convertPhone'
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native'



export default function List(props){
  const { getAllJobs, jobs, setJob } = useContext(Context)  
  const [refreshing, setRefreshing] = useState(false)

  
  
  useEffect(()=>{
    getAllJobs()
  }, [])


  BackHandler.addEventListener('hardwareBackPress', ()=>{
    return true
  })
  


  const onRefresh = ()=>{
    setRefreshing(true)
    setTimeout(()=>{
      setRefreshing(false)
    }, 2000)
  }


  const getJobById = (id)=>{
    axios.get(`${url}/job/${id}`).then(res=>{
      setJob(res.data)
      props.navigation.navigate('Detalhes')
    }).catch(e=>{
      alert(e.response.data)
    })
  }



  return(
    <ImageBackground
      source={ require('../../../assets/terceirizacao.jpg') }
      style={styles.bgImage}>
      <View style={styles.container}>
        <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}
          refreshing={refreshing}/>}>

          {jobs && jobs.map(job=>{
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
                      onPress={()=> getJobById(job.id)}>
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
