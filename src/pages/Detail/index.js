import { useContext, useEffect } from "react"
import Context from "../../global/Context"
import { convertPhone } from "../../utils/convertPhone"
import * as Contacts from 'expo-contacts'
import axios from "axios"
import { url } from "../../constants/urls"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native"



export default function Detail(props){
    const { job, getAllJobs } = useContext(Context)
    


    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Emails]
        });

        if (data.length > 0) {
            const contact = data[0]
            console.log(contact)
        }
        }
    }


    const delJob = async()=>{
        try{

            await axios.delete(`${url}/job/${job.id}`).then(res=>{
                AsyncStorage.clear()
                alert(res.data)
                props.navigation.navigate('List')
                getAllJobs()
            }).catch(e=>{
                alert(e.response.data)
            })

        }catch(e){
            alert(e)
        }
    }

    
    const confirmDelJob = ()=>{
        Alert.alert(
            'Atenção!',
            `Tem certeza que deseja excluir ${job.title}`,
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
    


    return(
        <ImageBackground style={styles.bgImage}
            source={require('../../../assets/terceirizacao.jpg')}>
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.cardContainer}> 
                    <Text style={styles.title}>{job.title}</Text>
                    <View style={{margin:5}}>
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
                <View style={{marginTop:30}}>
                    <TouchableOpacity style={styles.button}
                        onPress={confirmDelJob}>
                        <Text style={{color:'whitesmoke'}}>Excluir</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: 'whitesmoke',
        marginTop: 50,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 5
    },
    title: {
        fontSize: 20,
        color: 'whitesmoke',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'whitesmoke',
        height: 40,
        fontSize: 18,
        paddingHorizontal: 10,
        color: 'whitesmoke'
    },
    button: {
        backgroundColor: '#151E3D',
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
        margin: 20
    }
})