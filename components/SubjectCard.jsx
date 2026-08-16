import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight,responsiveWidth,responsivefontSize } from '../utils/responsive'  
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  BORDER_RADIUS,
  COMPONENT_SIZES 
} from '../utils/colors';
const SubjectCard = ({subject,onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      >
      <View style={styles.cardContent}>
        <Text style={styles.icon}>{'icon here'|| '📚'}</Text>
        <Text style={styles.name}>{'subject.name '|| 'Subject Name'}</Text>
        <Text style={styles.description}>{'subject.description '|| 'Subject Description'}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SubjectCard

const styles = StyleSheet.create({
  card:{
    flex:1,
    minHeight:responsiveHeight(160),
    padding:SPACING.lg,
    marginHorizontal:SPACING.sm,
    borderRadius:BORDER_RADIUS.md,
    backgroundColor:COLORS.card,

  },
  cardContent:{
    flex:1,
    justifyContent:'space-between',

  },
  icon:{
    color:COLORS.primary,
    ...TYPOGRAPHY.h1,
  },
  name:{
    ...TYPOGRAPHY.h4,
    color:COLORS.headline,
    marginBottom:SPACING.xs,
    fontWeight:'600'
  },
  description:{
    color:COLORS.secondary,
    ...TYPOGRAPHY.bodySmall,
    marginBottom:SPACING.xs
  }
})