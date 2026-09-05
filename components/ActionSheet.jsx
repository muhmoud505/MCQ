import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../utils/colors';
import { responsiveHeight, responsiveWidth } from '../utils/responsive';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ActionSheet = ({
  visible,
  onClose,
  options = [],
  title,
  destructiveIndex,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if(visible){
      Animated.parallel([
        Animated.timing(slideAnim,{
          toValue:0,
          duration:3000,
          useNativeDriver:true
        }),
        Animated.timing(fadeAnim,{
          toValue:1,
          duration:3000,
          useNativeDriver:true
        })
      ]).start()
    }else{
      Animated.parallel([
        Animated.timing(slideAnim,{
          toValue:SCREEN_HEIGHT,
          duration:3000,
          useNativeDriver:true
        }),
        Animated.timing(fadeAnim,{
          toValue:0,
          duration:3000,
          useNativeDriver:true
        })
      ]).start()
    }
  
  }, [visible]);

 
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback >
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheetContainer
          ,{transform:[{translateY:slideAnim}]}
        ]}
      >
        <View style={styles.dragHandle} />

        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isDestructive = destructiveIndex === index;

            return (
              <TouchableOpacity
                key={index}
                style={[
                 styles.option,
                ]}
                onPress={() => handleOptionPress(option, index)}
                activeOpacity={0.7}
              >
                {option.icon && (
                  <View style={styles.optionIcon}>
                    <Ionicons
                      name={option.icon}
                      size={24}
                      color={isDestructive ? COLORS.incorrect : COLORS.primary}
                    />
                  </View>
                )}
                <Text
                  style={[
                    styles.optionText,
                    
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
         style={styles.cancelButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
 backdrop:{
  flex:1,
  backgroundColor:'rgba(0,0,0,0.5)',
 },
 sheetContainer:{
  position:'absolute',
  bottom:0,
  right:0,
  left:0,
  backgroundColor:COLORS.card,
  borderTopLeftRadius:BORDER_RADIUS.xl,
  borderTopRightRadius:BORDER_RADIUS.xl,
  paddingBottom:responsiveHeight(20),
  ...SHADOWS.md,
 },
dragHandle:{
  width:responsiveWidth(40),
  height:responsiveHeight(4),
  backgroundColor:COLORS.divider,
  borderRadius:BORDER_RADIUS.pill,
  alignSelf:'center',
  marginTop:SPACING.md,
  marginBottom:SPACING.md,
},
titleContainer:{
  paddingHorizontal:SPACING.lg,
  paddingBottom:SPACING.md,
  borderBottomWidth:1,
  borderBottomColor:COLORS.divider,
},
title:{
  ...TYPOGRAPHY.body,
  color:COLORS.label,
  textAlign:'center',
},
optionsContainer:{
  paddingHorizontal:SPACING.lg,
  paddingVertical:SPACING.md,
},
option:{
  flexDirection:'row',
  alignItems:'center',
  paddingVertical:SPACING.md,
  paddingHorizontal:SPACING.sm,
  borderRadius:BORDER_RADIUS.md,
},
optionIcon: {
    width: responsiveWidth(32),
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  optionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.headline,
    fontSize: 16,
  },
  destructiveText: {
    color: COLORS.incorrect,
  },
  cancelButton: {
    marginHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.divider,
  },
  cancelText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.headline,
    fontWeight: '600',
  },

});

export default ActionSheet;