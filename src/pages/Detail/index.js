import { useContext, useEffect } from "react"
import Context from "../../global/Context"
import { convertPhone } from "../../utils/convertPhone"
import * as Contacts from 'expo-contacts'
import Add from 'react-native-vector-icons/Entypo'
import Zap from 'react-native-vector-icons/FontAwesome'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Linking
} from "react-native"



export default function Detail(props){
    const { job } = useContext(Context)
    const message = `Olá, vi seu serviço anunciado no aplicativo Loja de Serviços e gostaria de contratá-lo`


    
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




    return(
        <ImageBackground style={styles.bgImage}
            source={require('../../../assets/terceirizacao.jpg')}>
            <View style={styles.container}>  
                <View style={styles.cardContainer}> 
                    <Text style={styles.title}>{job.title}</Text>
                    <View style={{margin:15}}>
                        <Text style={{color:'whitesmoke'}}>
                            <Text style={{fontWeight:'bold'}}>Descrição:</Text> {job.description}
                        </Text>
                        <Text style={{color:'whitesmoke'}}>
                            <Text style={{fontWeight:'bold'}}>Telefone:</Text> {convertPhone(job.phone)}
                        </Text>
                        <Text style={{color:'whitesmoke'}}>
                            <Text style={{fontWeight:'bold'}}>Atendimento:</Text> {job.period}
                        </Text>
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
        marginBottom: 5
    },
    iconsContainer: {
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 10 
    },
    button: {
        backgroundColor: '#151E3D',
        padding: 5,
        alignItems: 'center',
        borderRadius: 10,
        marginTop:'20%',
        marginHorizontal: '20%'        
    }
})