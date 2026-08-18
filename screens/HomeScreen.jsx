import { View, Text,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubjectCard from '../components/SubjectCard'
import useAppStore, { useSubjects } from '../utils/useAppStore'

const HomeScreen = () => {
 const subjects=useSubjects()
  return (
    <SafeAreaView>
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
      
    </SafeAreaView>
  )
}

export default HomeScreen