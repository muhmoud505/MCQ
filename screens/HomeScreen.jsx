import { View, Text,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubjectCard from '../components/SubjectCard'
import useAppStore, { useSubjects } from '../utils/useAppStore'
import COLORS from '../utils/colors'


const HomeScreen = () => {
  
 const subjects=useSubjects()

 
  return (
    <SafeAreaView>
      <View style={{backgroundColor:COLORS.background}}>

      
      <FlatList
        data={subjects}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <SubjectCard
             subject={item}
             onPress={() => console.log('Pressed:', item.name)}
             />
        )}

      />
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen