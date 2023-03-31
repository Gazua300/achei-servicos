import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, ImageBackground } from 'react-native';

export default function Splash(props) {
  

  useEffect(()=>{
    setTimeout(()=>{
      props.navigation.navigate('Login')
    }, 3000)
  }, [])


 
  return (
    <ImageBackground style={{flex:1}}
      source={require('../../../assets/splash.png')}>
      <View style={styles.animationContainer}>      
        <LottieView
          autoPlay
          speed={1}
          source={require('../../../assets/splash.json')}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    backgroundColor: '#151E3D'
  }
});