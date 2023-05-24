import { StyleSheet, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Playground({navigation}) { 
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Test</Text>
        <Ionicons name="add" size={30} />
    </View>
  )
}
