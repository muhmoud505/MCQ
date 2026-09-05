import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS, { BORDER_RADIUS, SPACING, TYPOGRAPHY } from '../utils/colors'
import { responsiveHeight } from '../utils/responsive'
import { Ionicons } from '@expo/vector-icons'

const EmptyState = ({
    icon = 'add-circle-outline',
    title = 'No Items Yet',
  subtitle = 'Start adding content to see it here.',
  buttonText = 'Add Item',
  onPress,
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon} size={64} color={COLORS.label} />
        </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {
        onPress&&(
            <TouchableOpacity style={styles.button}>
                <Ionicons name='add' size={20} color={COLORS.background}/>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        )
      }
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:SPACING.xl,
        minHeight:responsiveHeight(300),
    },
    iconContainer:{
        marginBottom:SPACING.lg
    },
    title:{
        ...TYPOGRAPHY.h3,
        color:COLORS.headline,
        marginBottom:SPACING.sm,
        textAlign:'center',

    },
    subtitle:{
        ...TYPOGRAPHY.body,
        color:COLORS.label,
        textAlign:'center',
        marginBottom:SPACING.xl
    },
    button:{
        flexDirection:'row',
        alignItems:'center',
        gap:SPACING.sm,
        backgroundColor:COLORS.primary,
        paddingHorizontal:SPACING.xl,
        paddingVertical:SPACING.lg,
        borderRadius:BORDER_RADIUS.md
    },
    buttonText:{
        ...TYPOGRAPHY.bodyMedium,
        color:COLORS.background,
        fontWeight:'600'
    }
})