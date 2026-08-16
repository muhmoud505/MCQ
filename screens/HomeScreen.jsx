import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubjectCard from '../components/SubjectCard'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <SubjectCard/>
    </SafeAreaView>
  )
}

export default HomeScreen