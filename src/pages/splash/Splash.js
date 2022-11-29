import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

export default function Splash(props) {
  

  useEffect(()=>{
    setTimeout(()=>{
      props.navigation.navigate('List')
    }, 3000)
  }, [])


 
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        speed={1}
        source={require('../../../assets/splash.json')}
        onAnimationFinish={()=>{
          props.navigation.navigate('List')
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    backgroundColor: '#151E3D'
  }
});