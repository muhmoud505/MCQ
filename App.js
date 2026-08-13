
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { JetBrainsMono_400Regular, JetBrainsMono_500Medium, JetBrainsMono_700Bold } from '@expo-google-fonts/jetbrains-mono';export default function App() {
  const [fontsLoaded,setFontsLoaded]=useState(false);

  useEffect(()=>{
    async function loadFonts(){
    await Font.loadAsync({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        JetBrainsMono_400Regular,
        JetBrainsMono_500Medium,
        JetBrainsMono_700Bold,
    })
    setFontsLoaded(true);
      
    }
    loadFonts()
  },[])
  if(!fontsLoaded){
    return null;
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar
        barStyle={'light-content'}
      />
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
