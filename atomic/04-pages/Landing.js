import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Image, Button, SafeAreaView, StyleSheet, StatusBar, View, Platform } from 'react-native';
import { readProducts } from '../../store/productsSlice'
import { CreateResponsiveStyle, DEVICE_SIZES, useDeviceSize, minSize } from 'rn-responsive-styles'
import { processStyle } from '../00-helpers/styles'

export default function Landing({navigation}) { 
  const styles = useStyles()
  const dispatch = useDispatch()

 const downloadApp = () => {
		fetch('http://13.39.95.173:80/download')
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'Catalog.apk';
        a.click();
      });
   });
  }

  useEffect(() => {
    dispatch(readProducts())
  }, [])

  return (
    <SafeAreaView style={processStyle(styles.container)}>
      <Image
          style={processStyle(styles.logo)}
          source={require('../../assets/logo.png')}
          resizeMode={"contain"}
      />
      <View style={processStyle(styles.buttonContainer)}>
        <Button
          style={processStyle(styles.buttonLink)}
          title="Catalog"
          accessibilityLabel="Filter and browse products"
          onPress={() => navigation.navigate('Catalog')}
        />
      </View>
      <View style={processStyle(styles.buttonContainer)}>
        <Button
          style={processStyle(styles.buttonLink)}
          title="Settings"
          accessibilityLabel="Settings"
          onPress={() => navigation.navigate('Playground')}
          disabled={true}
        />
      </View>
      {
        (Platform.OS == "web") ? (
          <View style={processStyle(styles.buttonContainer)}>
            <Button
              style={processStyle(styles.buttonLink)}
              title="Download app"
              accessibilityLabel="Download app"
              onPress={downloadApp}
            />
          </View>
        ) : null
      }
    </SafeAreaView>
  )
}

const useStyles = CreateResponsiveStyle(
  {
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 10,
      justifyContent: "center",
      gap: 20,
      marginHorizontal: 10,
    },
    buttonContainer: {
      marginBottom: 16,
      paddingLeft: 20,
      paddingRight: 20,
    },
    buttonLink: {
      height: 70,
      width: 100
    },
    logo: {
      width: 300,
      height: 150,
      marginHorizontal: "auto",
      marginBottom: 50,
      marginLeft: "auto",
      marginRight: "auto",
    }
  },
  {
    [minSize(DEVICE_SIZES.LG)]: {
      buttonContainer: {
        width: 150,
        marginBottom: 0,
        marginLeft: "auto",
        marginRight: "auto",
      }
    }
  }
)