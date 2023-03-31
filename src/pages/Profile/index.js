import { useEffect, useState, useContext } from "react"
import Context from '../../global/Context'
import axios from 'axios'
import { url } from "../../constants/urls"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Delete from 'react-native-vector-icons/MaterialIcons'
import Add from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Alert
} from "react-native"



export default function Profile(props){
    const { setJob, user, getProfile } = useContext(Context)
    const [jobs, setJobs] = useState([])  



    useEffect(()=>{
        getProfile()
        jobsByProvider()
    }, [])


    const jobsByProvider = async()=>{
        axios.get(`${url}/userjobs`, {
            headers: {
                Authorization: await AsyncStorage.getItem('id')
            }
        }).then(res=>{
            setJobs(res.data)
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const deleteJob = async(id)=>{
        axios.delete(`${url}/job/${id}`, {
            headers: {
                Authorization: await AsyncStorage.getItem('id')
            }
        }).then(()=>{
            jobsByProvider()
        }).catch(e=>{
            alert(e.response.data)
        })
    }


    const confirmDelJob = (job)=>{
        Alert.alert(
            `Deseja excluir ${job.title}?`,
            'Seu serviço não poderá mais ser visualizado na lista',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: ()=> deleteJob(job.id)
                }
            ] 
        )
    }


    const logout = ()=>{
        Alert.alert(
            'Atenção!',
            'Tem certeza que deseja deslogar da sua conta?',
            [
                {
                    text:'Cancelar'
                },
                {
                    text:'Ok',
                    onPress: async()=>{
                        await AsyncStorage.clear()
                        props.navigation.navigate('Login')
                    }
                }
            ]
        )
    }



    return(
        <ImageBackground style={{flex:1}}
            source={require('../../../assets/terceirizacao.jpg')}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.txtStyle, { marginTop:'5%' }]}>
                        <Text style={{fontWeight:'bold'}}>Nome: </Text>
                            {user.name}{'\n'}
                        <Text style={{fontWeight:'bold'}}>Email: </Text>{user.email}
                    </Text>
                    <TouchableOpacity onPress={logout}>
                        <Delete name="logout" size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                </View>
                <Text style={{color:'whitesmoke', textAlign:'center', fontSize:20, marginTop:20}}>
                    Serviços cadastrados
                </Text>
                <View style={{borderWidth:1, borderColor:'whitesmoke', margin:10}}/>

                {jobs.length > 0 ? (
                    <FlatList
                        data={jobs}
                        keyExtractor={job => job.id}
                        renderItem={({item: job})=>(
                            <View style={styles.card}>
                                <TouchableOpacity onPress={()=>{
                                    setJob(job)
                                    props.navigation.navigate('Detalhes')                                    
                                }}>
                                    <Text style={styles.txtStyle}>{job.title}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> confirmDelJob(job)}>
                                    <Delete name="delete-forever" size={20} color='red'/>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                        />
                ) : <>
                    <Text style={{margin:20, textAlign:'center', color:'whitesmoke'}}>
                        Você ainda não cadastrou nenhum serviço
                    </Text>
                    <TouchableOpacity style={{alignItems:'center'}}
                        onPress={()=> props.navigation.navigate('Register')}>
                        <Add name="add-circle" size={25} color='whitesmoke'/>
                    </TouchableOpacity>
                    </>
                    } 

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    header: {
        margin:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    txtStyle: {
        fontSize:15,
        color:'whitesmoke',        
    },
    card: {
        borderWidth: 1,
        borderColor: 'whitesmoke',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})