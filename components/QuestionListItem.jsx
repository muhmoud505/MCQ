import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS, { BORDER_RADIUS, SPACING, TYPOGRAPHY } from '../utils/colors'
import { SHOALLA } from '../assets/icons'
const DIFFICULTY_COLORS={
    easy:COLORS.easy,
    meduim:COLORS.medium,
    hard:COLORS.hard,

}

const QuestionListItem = ({question,onPress,onDelete}) => {
    const difficulty=question.difficulty || 'easy'
    const color=DIFFICULTY_COLORS[difficulty];
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
        <View style={styles.cardContent}>
            <View style={styles.questionRow}>
                <View style={[styles.dot,{backgroundColor:color}]}/>
                <Text style={styles.question} numberOfLines={2}>
                        Explain the difference between TCP and UDP.
                </Text>
            </View>
            <Text style={styles.answerPreview}numberOfLines={1}>
                {question.answer || 'No answer provided'}
            </Text>
            {onDelete&&(
                <TouchableOpacity 
                 style={styles.deleteButton}
                 onPress={onDelete}
                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                 >
                    <SHOALLA/>
                </TouchableOpacity>
            )}
        </View>
    </TouchableOpacity>
  )
}

export default QuestionListItem

const styles = StyleSheet.create({
    card:{
        backgroundColor:COLORS.card,
        borderRadius:BORDER_RADIUS.md,
        padding:SPACING.md,
        borderWidth:1,
        borderColor:COLORS.divider
    },
    cardContent:{
        gap:SPACING.xs
    },
    questionRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:SPACING.sm
    },
    dot:{
        width:10,
        height:10,
        borderRadius:5,
        flexShrink:0,
        backgroundColor:'#ff0000'
    },
    question:{
        ...TYPOGRAPHY.bodySmall,
        color:COLORS.headline,
        flex:1,

    },
    answerPreview:{
        ...TYPOGRAPHY.label,
        color:COLORS.label,
        marginLeft:SPACING.sm+10,

    },
    deleteButton:{
        position:'absolute',
        top:SPACING.xs,
        right:SPACING.xs,
        padding:SPACING.xs
    }

})