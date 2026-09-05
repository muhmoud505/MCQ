import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import QuestionListItem from './QuestionListItem'
import COLORS, { BORDER_RADIUS, SHADOWS, SPACING, TYPOGRAPHY } from '../utils/colors'
import { Ionicons } from '@expo/vector-icons'

const DifficultySection = ({
  onToggle
  ,isExpanded=true
  ,onQuestionPress
  ,OnDeleteQuestion
  ,questions=[],
  title,
count,
icon,
color}) => {
   return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={onToggle}
        activeOpacity={0.7}
        >
        <View style={styles.headerLeft} >
          <Text style={styles.icon}>{icon}</Text>
          <Text style={[styles.headerTitle,{color:color}]}>{title}</Text>
          <Text style={styles.headerCount}>{count}</Text>
        </View>
        <Ionicons
          name={isExpanded?'chevron-up' : 'chevron-down'}
          size={20}
          color={COLORS.label}
        />
      </TouchableOpacity>
      {
        isExpanded&&(
          <View style={styles.questionsContainer}>
            {
              questions.map((question)=>(
               <QuestionListItem
                 question={question}
                 key={question.key}
                 onPress={()=>onQuestionPress(question)}
                  onDelete={()=>OnDeleteQuestion(question._id||question.id)}
           />
              ))
            }
      </View>
        )
      }
      
    </View>
  )
}

export default DifficultySection

const styles = StyleSheet.create({
  container:{
    marginBottom:SPACING.xxl,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:SPACING.md,
    paddingHorizontal:SPACING.md,
    backgroundColor:COLORS.card,
    borderRadius:BORDER_RADIUS.md,
    ...SHADOWS.xs
  },
  headerLeft:{
    flexDirection:'row',
    alignItems:'center',
    gap:SPACING.sm
  },
  icon:{
    fontSize:18
  },
  headerTitle:{
    ...TYPOGRAPHY.bodyMedium,
    fontWeight:'600'
  },
  headerCount:{
    ...TYPOGRAPHY.label,
  },
  questionsContainer:{
    marginTop:SPACING.md,
    gap:SPACING.sm
  }
})