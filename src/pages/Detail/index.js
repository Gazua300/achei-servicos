import { useContext, useEffect, useState } from "react"
import Context from "../../global/Context"
import { convertPhone } from "../../utils/convertPhone"
import * as Contacts from 'expo-contacts'
import Add from 'react-native-vector-icons/Entypo'
import Zap from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { url } from "../../constants/urls"
import styles from './styles'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native"



export default function Detail(props){
    const { job, sendPushNotifications } = useContext(Context)
    const message = `Olá, vi seu serviço anunciado no aplicativo Loja de Serviços e gostaria de contratá-lo`
    const [jobId, setJobId] = useState('')


    useEffect(()=>{
        (async()=>{
            const id = await AsyncStorage.getItem(job.id)
            if(id){
             setJobId(id)
            }
        })()
    }, [])


    
    const addContact = async()=>{
        const { status } = await Contacts.requestPermissionsAsync()
        if(status === 'granted'){
            await Contacts.presentFormAsync(null, {
                [Contacts.Fields.Company]: job.title,
                [Contacts.Fields.PhoneNumbers]: [
                    {
                        number: `${job.phone}`
                    }
                ]
            })
        }else{
            alert('O aplicativo não tem permissão para adicionar aos contatos. Ver nas configurações')
        }        
    }


    const confirmDelJob = ()=>{
        Alert.alert(
            'Atenção!',
            'Tem certeza que deseja excluir o serviço da lista?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> delJob()
                }
            ]            
        )
    }
    
    
    const delJob = ()=>{
        axios.delete(`${url}/job/${job.id}`).then(async(res)=>{
            alert(res.data)
            await AsyncStorage.removeItem(job.id)
            props.navigation.navigate('List')
            sendPushNotifications('Serviço exlcuido', `${job.title} acaba de ser excluído`)
        }).catch(e=>{
            Alert.alert(
                'Erro ao excluir serviço:',
                e.response.data

            )
        })
    }


    return(
        <ImageBackground style={styles.bgImage}
            source={require('../../../assets/terceirizacao.jpg')}>
            <View style={styles.container}>  
                <View style={styles.cardContainer}> 
                    <Text style={styles.title}>{job.title}</Text>
                    <View style={{margin:15}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                            <View>
                                <Text style={{color:'whitesmoke'}}>
                                    <Text style={{fontWeight:'bold'}}>Descrição:</Text> {job.description}
                                </Text>
                                <Text style={{color:'whitesmoke'}}>
                                    <Text style={{fontWeight:'bold'}}>Telefone:</Text> {convertPhone(job.phone)}
                                </Text>
                                <Text style={{color:'whitesmoke'}}>
                                    <Text style={{fontWeight:'bold'}}>Atendimento:</Text> {job.period}
                                </Text>
                            </View>                            
                        </View>
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity
                                onPress={addContact}>
                                <Add name="add-user" size={30} color='rgba(250,250,250,0.7)'/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> Linking.openURL(
                                    `https://api.whatsapp.com/send?phone=55${job.phone}
                                    &text=${message}`
                                    )}>
                                <Zap name="whatsapp" size={30} color='green'/>
                            </TouchableOpacity>
                        </View>                        
                    </View>
                </View>
                {!jobId ? null : (
                    <TouchableOpacity style={styles.button}
                        onPress={confirmDelJob}>
                        <Text style={{color:'whitesmoke', fontSize:15}}>
                            Deletar serviço
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    )
}

