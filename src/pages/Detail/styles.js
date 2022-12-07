import { StyleSheet } from "react-native"


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
        borderRadius: 20,
        marginTop:'20%',
        marginHorizontal: '20%'        
    }
})

export default styles