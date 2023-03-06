import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Image, Button, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { readProducts } from '../../store/productsSlice'

export default function Landing({navigation}) { 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readProducts())
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
          resizeMode={"contain"}
      />
      <Button
        style={styles.buttonLink}
        title="Catalog"
        accessibilityLabel="Filter and browse products"
        onPress={() => navigation.navigate('Catalog')}
      />
      <Button
        style={styles.buttonLink}
        title="Products"
        accessibilityLabel="Filter and browse products"
        onPress={() => navigation.navigate('Products')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    justifyContent: "center",
    gap: 20,
    marginHorizontal: 10,
  },
  buttonLink: {
    display: "block",
    marginBottom: 16,
  },
  logo: {
    width: 300,
    height: 150,
    marginHorizontal: "auto",
    marginBottom: 50
  }
});