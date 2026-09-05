import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import SubjectCard from '../components/SubjectCard';
import useAppStore, { useSubjects, useLoading } from '../utils/useAppStore';
import COLORS, {
  BORDER_RADIUS,
  COMPONENT_SIZES,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from '../utils/colors';
import { QUESTIONDONE, SHOALLA } from '../assets/icons';

// ============================================================
// ENABLE LAYOUT ANIMATION FOR ANDROID
// ============================================================

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = () => {
  const [showAll, setShowAll] = useState(false);
  const Subjects = useSubjects();
  const isLoading = useLoading();
  const navigation = useNavigation();
  const fetchSubjects = useAppStore((state) => state.fetchSubjects);

  // ============================================================
  // FETCH SUBJECTS ON MOUNT
  // ============================================================

  useEffect(() => {
    const loadSubjects = async () => {
      try {
  
        
        await fetchSubjects();
        console.log('✅ Subjects loaded');
      } catch (error) {
        console.error('❌ Failed to load subjects:', error);
      }
    };
    loadSubjects();
  }, []);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleViewAllToggle = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setShowAll(!showAll);
  };

  const handleSubjectPress = (subject) => {
    navigation.navigate('SubjectDetail', {
      subjectId: subject._id || subject.id,
      subjectName: subject.name,
    });
  };

  const handleRefresh = () => {
    fetchSubjects();
  };

  const subjects = showAll ? Subjects : Subjects.slice(0, 4);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <SHOALLA />
            <Text style={styles.statNumber}>12 Days</Text>
            <Text style={styles.statLabel}>Study Streak</Text>
          </View>
          <View style={styles.statCard}>
            <QUESTIONDONE />
            <Text style={styles.statNumber}>342</Text>
            <Text style={styles.statLabel}>Question Mastered</Text>
          </View>
        </View>

        {/* Start Daily Quiz Button */}
        <TouchableOpacity activeOpacity={0.5} style={styles.quizButton}>
          <Text style={styles.quizButtonText}>Start Daily Quiz</Text>
        </TouchableOpacity>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Core Subjects</Text>
          <TouchableOpacity onPress={handleViewAllToggle}>
            <Text style={styles.viewAllText}>
              {showAll ? 'Show Less ↑' : 'View All →'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FlatList */}
        <View style={styles.listWrapper}>
          <FlatList
            data={subjects}
            keyExtractor={(item) => item.id || item._id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => (
              <SubjectCard
                subject={item}
                onPress={() => handleSubjectPress(item)}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={handleRefresh}
                tintColor={COLORS.primary}
                colors={[COLORS.primary]}
              />
            }
            overScrollMode="never"
            initialNumToRender={10}
            windowSize={10}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.padding,
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  statNumber: {
    ...TYPOGRAPHY.statNumber,
    color: COLORS.headline,
  },
  statLabel: {
    ...TYPOGRAPHY.statLabel,
    color: COLORS.label,
  },

  quizButton: {
    backgroundColor: COLORS.primary,
    height: COMPONENT_SIZES.button.large.height,
    borderRadius: BORDER_RADIUS.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.padding,
    marginBottom: SPACING.md,
    ...SHADOWS.primary,
  },
  quizButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.background,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.padding,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.headline,
  },
  viewAllText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
  },

  listWrapper: {
    flex: 1,
    paddingHorizontal: SPACING.padding,
  },
  row: {
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingBottom: SPACING.xxxl + 80,
    flexGrow: 1,
  },
});

export default HomeScreen;