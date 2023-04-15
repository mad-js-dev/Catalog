import React, { useCallback, useEffect, useState } from 'react';
import { AppRegistry, StyleSheet, Text, SafeAreaView, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useDispatch, Provider } from 'react-redux'
import store from './store/store'
import { readProducts } from './store/productsSlice'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from "./atomic/pages/Landing";
import Catalog from "./atomic/pages/Catalog";
import Playground from "./atomic/pages/Playground";
import Test from "./atomic/pages/Test";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const Content = () => { 
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Ionicons.font);
        await dispatch(readProducts())
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see   a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
      <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Test" component={Test} />
            <Stack.Screen name="Playground" component={Playground} />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Catalog" component={Catalog} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    
  )
};

export default function App() { 
  return (
    <Provider store={store()}>
      <Content/>
    </Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});
