import Mail from 'react-native-vector-icons/Entypo'
import Zap from 'react-native-vector-icons/FontAwesome'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native"



export default function ContactUs(props){

    return(
        <ImageBackground style={styles.bgImage}
            source={require('../../../assets/terceirizacao.jpg')}>
            <View style={styles.container}>
                <Text style={styles.txtStyle}>
                    Estamos na fase inicial do nosso aplicativo, então para eventuais
                    problemas, sugestões ou reclamações. Entre em contato conosco:
                </Text>
                <Text style={styles.txtContact}>
                    <Mail name='email' size={30} color='whitesmoke'/>{'\n'}
                    francadasilvaflamarion@gmail.com{'\n\n\n'}
                    <Zap name='whatsapp' size={30} color='whitesmoke'/>{'\n'}
                    71 8623-9984
                </Text>
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
    txtStyle: {
        color: 'whitesmoke',
        textAlign: 'center',
        margin: 30,
        fontSize: 17
    },
    txtContact: {
        marginTop: '20%',
        color: 'whitesmoke',
        textAlign: 'center',
        fontSize: 20
    }
})