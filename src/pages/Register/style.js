import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  bgImage: {
    flex: 1
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 50
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnNav: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151E3D',
    width: '45%',
    height: 40,
    borderRadius: 20,
    margin: 10,

  },
  txtBtn: {
    color: 'whitesmoke',
    fontSize: 15
  },
  input: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'whitesmoke',
    height: 40,
    fontSize: 18,
    paddingHorizontal: 15,
    color: 'whitesmoke'
  },
  textarea: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'whitesmoke',
    height: 80,
    fontSize: 18,
    paddingHorizontal: 15,
    color: 'whitesmoke'
  }
})

export default styles
