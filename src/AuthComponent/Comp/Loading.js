
import {View, ActivityIndicator, StyleSheet} from 'react-native';

function LoadingProgress() {
    return <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
    </View>
}

export default LoadingProgress;

const styles = StyleSheet.create({
    container: { 
        flex:1,
        alignSelf: 'center'
    }
})