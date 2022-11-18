import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from './src/global/Context'
import Add from 'react-native-vector-icons/Entypo'
import ListAlt from 'react-native-vector-icons/FontAwesome'
import ContactIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import List from './src/pages/List'
import Register from './src/pages/Register'
import ContactUs from './src/pages/ContactUs'
import { StatusBar, TouchableOpacity, View } from 'react-native'



const Stack = createNativeStackNavigator()

export default function App(){


  return(
        <Provider>
          <NavigationContainer>
            <StatusBar backgroundColor='#151E3D'/>
            <Stack.Navigator
              initialRouteName='List'
              screenOptions={screenOptions}>
              
              
              <Stack.Screen
                name='List'
                component={List}
                options={({navigation})=> ({
                  headerLeft: ()=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                      <Add name='add-user' size={30} color='#151E3D'/>
                    </TouchableOpacity>
                  ),
                  title: 'Lista de Serviços',
                  headerRight: ()=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('ContactUs')}>
                      <ContactIcon name='email-send' size={30} color='#151E3D'/>
                    </TouchableOpacity>
                  )
                })}/>

              <Stack.Screen
                name='Register'
                component={Register}
                options={({navigation})=> ({
                  headerLeft: ()=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('List')}>
                      <ListAlt name='list-alt' size={30} color='#151E3D'/>
                    </TouchableOpacity>
                  ),
                  title: 'Cadastrar Serviço',
                  headerRight: ()=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('ContactUs')}>
                      <ContactIcon name='email-send' size={30} color='#151E3D'/>
                    </TouchableOpacity>
                  )
                })}/>
              <Stack.Screen
                name='ContactUs'
                component={ContactUs}
                options={({navigation})=>({
                  title: 'Contato',
                  headerLeft: ()=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('List')}>
                      <ListAlt name='list-alt' size={30} color='#151E3D'/>
                    </TouchableOpacity>
                  ),
                  headerRight: ()=>(
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                      <Add name='add-user' size={30} color='#151E3D'/>
                    </TouchableOpacity>
                  )
                })} />                
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#2e2e2e'
  },
  headerTitleStyle: {
    color: 'whitesmoke'
  },
  headerTitleAlign: 'center'
}
