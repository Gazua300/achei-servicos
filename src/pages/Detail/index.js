import { useContext, useEffect } from "react"
import Context from "../../global/Context"
import { convertPhone } from "../../utils/convertPhone"
import * as Contacts from 'expo-contacts'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from "react-native"



export default function Detail(props){
    const { job, perfil, getUser } = useContext(Context)

    
        
    useEffect(()=>{
        getUser()
    }, [])


    
    const addContact = async()=>{
        const { status } = await Contacts.requestPermissionsAsync()
        if(status === 'granted'){}

        await Contacts.presentFormAsync(null, {
            [Contacts.Fields.Company]: job.title,
            [Contacts.Fields.PhoneNumbers]: job.phone
        })
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
                    </View>                    
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={addContact}>
                    <Text style={{color:'whitesmoke'}}>Salvar nos contatos</Text>
                </TouchableOpacity>
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
        marginTop:'20%',
        marginHorizontal: '20%'        
    }
})