import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight,responsiveWidth,responsivefontSize } from '../utils/responsive'  
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  BORDER_RADIUS,
} from '../utils/colors';
import { FF,DataStruc } from '../assets/icons';


const SubjectCard = ({subject,onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      >
      <View style={styles.cardContent}>
        <View>
           <Text style={styles.progressText}>{'70% Mastery'}</Text>
          <DataStruc color={COLORS.secondary}/>
        </View>
        <Text style={styles.name}>{'subject.name '|| 'Subject Name'}</Text>
        <Text style={styles.description}>{'subject.description '|| 'Subject Description'}</Text>
        <View style={styles.progresContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill,{width: '70%'}]} />
          </View>
         
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SubjectCard

const styles = StyleSheet.create({
  card:{
    flex:1,
    minHeight:responsiveHeight(180),
    height:responsiveHeight(162),
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
  },
  progresContainer:{
    flex:1,
    flexdirection:'row',
    alighnItems:'center',
    gap:SPACING.sm,
    margintop:SPACING.sm
  },
  progressBar:{
    flex:1,
    height:responsiveHeight(6),
    backgroundColor:COLORS.divider,
    borderRadius:BORDER_RADIUS.sm,
    overflow:'hidden'
  },
  progressFill:{
    height:'100%',
  
    backgroundColor:COLORS.primary,
    borderRadius:BORDER_RADIUS.sm,
  },
  progressText:{
    ...TYPOGRAPHY.label,
    color:COLORS.headline,
    minwidth:responsiveWidth(40),
    textAlign:'right',
    fontWeight:'600'
  }
})