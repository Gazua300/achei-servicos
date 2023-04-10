import { useContext, useEffect } from "react"
import Context from "../../global/Context"
// import AsyncStorage from "@react-native-async-storage/async-storage"
import { convertPhone } from "../../utils/convertPhone"
import * as Contacts from 'expo-contacts'
import Add from 'react-native-vector-icons/Entypo'
import Zap from 'react-native-vector-icons/FontAwesome'
// import AddPic from 'react-native-vector-icons/MaterialIcons'
// import * as ImagePicker from 'expo-image-picker'
// import { Video } from "expo-av"
// import axios from "axios"
// import { url } from "../../constants/urls"
import styles from './styles'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Linking,
    // Image,
    // Button,
    Alert,
    // FlatList,
    // Modal
} from "react-native"



export default function Detail(props){
    const { job, user } = useContext(Context)
    const message = `Olá, vi seu serviço anunciado no aplicativo Loja de Serviços e gostaria de contratá-lo`
    // const videoRef = useRef(null)
    // const [images, setImages] = useState([])
    // const [image, setImage] = useState(null)
    // const [video, setVideo] = useState(null)
    // const [status, setStatus] = useState({})
    // const [match, setMatch] = useState(false)
    // const [showModal,setShowModal] = useState(false)
    


    // useEffect(()=>{
    //      getImages()
        
    //     if(job.provider === user.id){
    //         setMatch(true)
    //     }else{
    //         setMatch(false)
    //     }

    // }, []) 
    
   
    
    // const getImages = ()=>{
    //     axios.get(`${url}/image/${job.id}`).then(res=>{
    //         setImages(res.data)
    //     }).catch(e=>{
    //         console.log(e.response.data)
    //     })
    // }

    
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
            Alert.alert(
               'Necessário permissão para acessar os contatos',
               'O aplicativo Loja de Serviço não teve permissão para adicionar contatos. Se desejar o redirecionaremos para as configurações para ativar as permissões?',
                [
                    {
                        text:'Cancelar'
                    },
                    {
                        text:'Ok',
                        onPress: ()=> Linking.openSettings()                        
                    }
                ]

            )
        }        
    }


    // const sendImage = async()=>{
    //     const formData = new FormData()
    //     formData.append('image', {
    //         name: image,
    //         uri: image,
    //         type: 'image/jpg' || 'image/png' || 'video/mp4'
    //     })

    //     axios.create({
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: await AsyncStorage.getItem('id')
    //         }
    //     }).post(`${url}/image/${job.id}`, formData).then(res=>{
    //         alert(res.data)
    //     }).catch(e=>{
    //         alert(e.response.data)
    //     })
    // }


    // const addImage = async()=>{
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    //     if(status !== 'granted'){
    //         Alert.alert(
    //             'Necessário permissão para acessar arquivos',
    //             'O aplicativo Loja de Serviço não teve permissão para acessar suas imagens. Se desejar o redirecionaremos para as configurações para ativar as permissões?',
    //             [
    //                 {
    //                     text:'Cancelar'
    //                 },
    //                 {
    //                     text:'Ok',
    //                     onPress: ()=> Linking.openSettings()                        
    //                 }
    //             ]
    //         )            
    //     }

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         quality: 1
    //     })

    //     //  console.log(result)
        
    //     if(!result.canceled){
    //         const uriArray = result?.assets[0].uri.split('')
    //         const lastLetter = uriArray.length - 1
    //         const fileType = `${uriArray[lastLetter - 1]}${uriArray[lastLetter]}`
    //         if(fileType === 'ng' || fileType === 'eg' || fileType === 'pg'){
    //             setImage(result.assets[0].uri)
    //             sendImage()
    //             getImages()
    //         }else if(fileType === 'p4'){
    //             Alert.alert(
    //                 'Ainda não é possível postar vídeos',
    //                 'Estamos em fase de testes para esta operação para habilitarmos na nova atualização do app. Deseja retornar e escolher uma imagem?',
    //                 [
    //                     {
    //                         text:'Cancelar'
    //                     },
    //                     {
    //                         text:'Ok',
    //                         onPress: ()=> addImage()
    //                     }
    //                 ]
    //             )
    //         }
    //     }

    // }


    // const removeImage = (id)=>{
    //     Alert.alert(
    //         'Deletar imagem',
    //         'Tem certeza que deseja excluir a imagem selecionada',
    //         [
    //             {
    //                 text:'Cancelar'
    //             },
    //             {
    //                 text:'Ok',
    //                 onPress: async()=>{
    //                     axios.delete(`${url}/image/${id}`, {
    //                         headers: {
    //                             Authorization: await AsyncStorage.getItem('id')
    //                         }
    //                     }).then(res=>{
    //                         alert(res.data)
    //                         getImages()
    //                     }).catch(e=>{
    //                         alert(e.response.data)
    //                     })
    //                 }
    //             }
    //         ]
    //     )
    // }



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
                
                {/* <Modal
                    animationType="fade" 
                    transparent
                    visible={showModal}>
                    <View style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }}>
                        <Button title="fechar" onPress={()=> setShowModal(false)}/>
                        <Image style={{width:300, height:500, margin:10}}
                            source={{ uri: image?.imageSrc }}/>
                    </View>
                </Modal>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:20
                }}>
                    {match ? (
                        <>
                        <Text style={{
                            textAlign:'center',
                            fontSize:15,
                            color:'whitesmoke',
                            marginRight:10}}>
                            Adicionar imagem
                        </Text>
                        <TouchableOpacity onPress={addImage}>
                            <AddPic name="add-photo-alternate" size={25} color='whitesmoke'/>
                        </TouchableOpacity>
                        </>
                    ) : null}
                </View>  */}
                {/* <Video style={{width:100, height:100, borderRadius:10}}
                    ref={videoRef}
                    source={{ uri: video }}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                    onPlaybackStatusUpdate={(status)=> setShowModal(()=> status)}/> */}
                {/* <View style={{alignItems:'center'}}>
                    <FlatList
                        contentContainerStyle={{alignItems:'center'}}
                        data={images}
                        keyExtractor={image => image.imageId}
                        numColumns={3}
                        renderItem={({item: image})=>(
                            <TouchableOpacity onLongPress={()=> removeImage(image.imageId)}
                                onPress={()=>{
                                    setShowModal(true)
                                    setImage(image)
                                }}>
                                <Image style={{width:100, height:100, margin:10, borderRadius:10}}
                                    source={{ uri: image?.imageSrc }}/>
                            </TouchableOpacity>                        
                        )}/>
                </View> */}
            </View>
        </ImageBackground>
    )
}

