import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 30
  },
  bgImage: {
    flex: 1
  },
  btnContainer: {
    marginTop: 10
  },
  btnNav: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151E3D',
    height: 30,
    borderRadius: 15,
    marginTop: 10
  },
  txtBtn: {
    color: 'whitesmoke'
  },
  legend: {
    color: 'whitesmoke',
    fontWeight: 'bold'
  },
  card: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'whitesmoke',
    borderRadius: 10,
    padding: 5
  },
  cardContent: {
    margin: 10,
  }
})

export default styles
