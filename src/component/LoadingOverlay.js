
import {View, ActivityIndicator, StyleSheet} from 'react-native';

function LoadingOverlay() {
    return <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
    </View>
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: { 
        justifyContent:'center',
        alignItems: 'center',
        padding: 24
    }
})