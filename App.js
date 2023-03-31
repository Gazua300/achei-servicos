import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from './src/global/Context'
import Add from 'react-native-vector-icons/Ionicons'
import ListAlt from 'react-native-vector-icons/FontAwesome'
import ContactIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Signup from './src/pages/Singup'
import Login from './src/pages/Login'
import List from './src/pages/List'
import Register from './src/pages/Register'
import Detail from './src/pages/Detail'
import Profile from './src/pages/Profile'
import ContactUs from './src/pages/ContactUs'
import Splash from './src/pages/splash/Splash'
import { StatusBar, TouchableOpacity, View } from 'react-native'



const Stack = createNativeStackNavigator()


export default function App(){


  return(
        <Provider>
          <NavigationContainer>
            <StatusBar backgroundColor='#151E3D'
              barStyle='light-content'/>
            
            <Stack.Navigator
              initialRouteName='Splash'
              screenOptions={screenOptions}>
            
            <Stack.Screen
                name='Splash'
                component={Splash}
                options={({navigation})=> ({
                  headerShown: false
                })}/> 

            <Stack.Screen
              name='Signup'
              component={Signup}
              options={{
                title:'Criar conta'
              }}/>
            
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                headerLeft: ()=>(
                  <View/>
                )
              }}/>
              
            <Stack.Screen
              name='List'
              component={List}
              options={({navigation})=> ({
                headerShown: false,
                headerLeft: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                    <Add name='add-circle' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                ),
                title: 'Lista de Serviços',
                headerRight: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('ContactUs')}>
                    <ContactIcon name='email-send' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                )
              })}/>

            <Stack.Screen
              name='Register'
              component={Register}
              options={({navigation})=> ({
                headerLeft: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('List')}>
                    <ListAlt name='list-alt' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                ),
                title: 'Cadastrar Serviço',
                headerRight: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                    <Add name='person' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                )
              })}/>

            <Stack.Screen
              name='Detalhes'
              component={Detail}
              options={({navigation})=> ({
                title: 'Contratar serviço',
                headerRight: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                    <Add name='add-circle' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                )
              })}/>
            
            <Stack.Screen
              name='Profile'
              component={Profile}
              options={({navigation})=>({
                title: 'Perfil da conta',
                headerLeft: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('List')}>
                    <ListAlt name='list-alt' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                ),
                headerRight: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('ContactUs')}>
                    <ContactIcon name='email-send' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                )
              })} />

            <Stack.Screen
              name='ContactUs'
              component={ContactUs}
              options={({navigation})=>({
                title: 'Contato',
                headerLeft: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('List')}>
                    <ListAlt name='list-alt' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                ),
                headerRight: ()=>(
                  <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                    <Add name='add-circle' size={30} color='whitesmoke'/>
                  </TouchableOpacity>
                )
              })} />                
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
  )
}

const screenOptions = {
  headerTintColor:'whitesmoke',
  headerStyle: {
    backgroundColor: '#2e2e2e'
  },
  headerTitleStyle: {
    color: 'whitesmoke'
  },
  headerTitleAlign: 'center'
}
