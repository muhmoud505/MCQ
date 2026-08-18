import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveHeight, responsiveWidth } from '../utils/responsive';
import { 
  COLORS, 
  TYPOGRAPHY, 
  SPACING, 
  BORDER_RADIUS,
} from '../utils/colors';
import { getIconForSubject, DefaultIcon } from '../assets/icons';

const SubjectCard = ({ subject, onPress }) => {
  // ============================================================
  // ✅ SAFEGUARD: If subject is undefined, show nothing
  // ============================================================
  
  if (!subject) {
    console.warn('⚠️ SubjectCard: subject is undefined, returning null');
    return null;
  }

  // ============================================================
  // ✅ SAFEGUARD: If subject is a string, try to parse it
  // ============================================================
  
  let subjectData = subject;
  if (typeof subject === 'string') {
    try {
      subjectData = JSON.parse(subject);
      console.log('✅ Parsed subject string:', subjectData);
    } catch (error) {
      console.error('❌ Failed to parse subject:', error);
      return null;
    }
  }

  // ============================================================
  // ✅ GET THE RIGHT ICON
  // ============================================================
  
  const IconComponent = getIconForSubject(subjectData);
  
  console.log('📚 Subject:', subjectData.name || 'Unknown');
  console.log('📚 Icon Component:', IconComponent.name || 'Default');

  // ============================================================
  // ✅ DESTRUCTURE WITH FALLBACKS
  // ============================================================
  
  const {
    name = 'Subject Name',
    description = 'Subject Description',
    mastery = 0,
  } = subjectData;

  // ============================================================
  // ✅ RENDER
  // ============================================================
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {/* Top Section: Mastery + Icon */}
        <View style={styles.topSection}>
          <IconComponent 
            color={COLORS.secondary} 
            size={responsiveWidth(38)} 
          />
          <Text style={styles.progressText}>{mastery || 0}% Mastery</Text>
        </View>

        {/* Middle Section: Name + Description */}
        <Text style={styles.name}>{name || 'Subject Name'}</Text>
        <Text style={styles.description}>{description || 'Subject Description'}</Text>

        {/* Bottom Section: Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${mastery || 0}%` }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: responsiveHeight(180),
    padding: SPACING.lg,
    marginHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  name: {
    ...TYPOGRAPHY.h4,
    color: COLORS.headline,
    marginBottom: SPACING.xs,
    fontWeight: '600',
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.secondary,
    marginBottom: SPACING.md,
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: responsiveHeight(6),
    backgroundColor: COLORS.divider,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    fontWeight: '600',
  },
});