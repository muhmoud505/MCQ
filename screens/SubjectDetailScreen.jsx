import { Ionicons } from '@expo/vector-icons';
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Alert,
  RefreshControl,
} from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute, useNavigation } from '@react-navigation/native';
import useAppStore, { 
  useQuestions, 
  useLoading, 
  useError,
} from '../utils/useAppStore';
import DifficultySection from '../components/DifficultySection';
import COLORS, { 
  BORDER_RADIUS, 
  COMPONENT_SIZES, 
  SHADOWS, 
  SPACING, 
  TYPOGRAPHY,
} from '../utils/colors';
import EmptyState from '../components/EmptyState';
import ActionSheet from '../components/ActionSheet';

const SubjectDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { subjectId, subjectName } = route.params;

  // ============================================================
  // STATE FROM STORE
  // ============================================================

  const questions = useQuestions();
  const isLoading = useLoading();
  const error = useError();
  const fetchQuestions = useAppStore((state) => state.fetchQuestions);
  const deleteQuestion = useAppStore((state) => state.deleteExistingQuestion);
  const deleteSubject = useAppStore((state) => state.deleteExistingSubject);
  const fetchSubjects = useAppStore((state) => state.fetchSubjects);

  // ============================================================
  // LOCAL STATE
  // ============================================================

  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ============================================================
  // ✅ SET THE CALLBACK IN ROUTE PARAMS (For header menu)
  // ============================================================

  useEffect(() => {
    console.log('🔄 Setting openActionSheet callback');
    navigation.setParams({
      openActionSheet: () => {
        console.log('🔴 openActionSheet called!');
        setActionSheetVisible(true);
      },
    });
  }, [navigation]);

  // ============================================================
  // FETCH QUESTIONS ON FOCUS
  // ============================================================

  useFocusEffect(
    useCallback(() => {
      fetchQuestions(subjectId);
    }, [subjectId, fetchQuestions])
  );

  // ============================================================
  // GROUP QUESTIONS BY DIFFICULTY
  // ============================================================

  const difficultyOrder = ['easy', 'medium', 'hard'];
  const difficultyColors = {
    easy: COLORS.easy,
    medium: COLORS.medium,
    hard: COLORS.hard,
  };
  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  };
  const difficultyIcons = {
    easy: '🌱',
    medium: '⚡',
    hard: '🔥',
  };

  const groupedQuestions = {
    easy: questions.filter((q) => q.difficulty === 'easy'),
    medium: questions.filter((q) => q.difficulty === 'medium'),
    hard: questions.filter((q) => q.difficulty === 'hard'),
  };

  // ============================================================
  // CALCULATE MASTERY
  // ============================================================

  const calculateMastery = () => {
    if (questions.length === 0) return 0;
    
    const totalCorrect = questions.reduce((sum, q) => sum + (q.correctCount || 0), 0);
    const totalAttempts = questions.reduce(
      (sum, q) => sum + (q.correctCount || 0) + (q.incorrectCount || 0),
      0
    );
    return totalAttempts === 0 ? 0 : Math.round((totalCorrect / totalAttempts) * 100);
  };

  const mastery = calculateMastery();

  // ============================================================
  // ACTION SHEET OPTIONS
  // ============================================================

  const actionSheetOptions = [
    {
      label: 'Edit Subject',
      icon: 'create-outline',
      onPress: () => {
        console.log('✏️ Edit subject:', subjectId);
        // Navigate to EditSubject screen (future feature)
      },
    },
    {
      label: 'Delete Subject',
      icon: 'trash-outline',
      onPress: () => {
        console.log('🗑️ Delete subject:', subjectId);
        Alert.alert(
          'Delete Subject',
          `Are you sure you want to delete "${subjectName}" and all its questions?`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  await deleteSubject(subjectId);
                  await fetchSubjects();
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Error', 'Failed to delete subject');
                }
              },
            },
          ]
        );
      },
    },
  ];

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      Alert.alert(
        'No Questions',
        'Add some questions first before starting a quiz.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Add Questions', onPress: handleAddQuestion },
        ]
      );
      return;
    }
    navigation.navigate('QuizQuestion', {
      subjectId,
      subjectName: subjectName || 'Subject',
    });
  };

  const handleAddQuestion = () => {
    navigation.navigate('AddQuestion', {
      subjectId,
      subjectName: subjectName || 'Subject',
    });
  };

  const handleQuestionPress = (question) => {
    console.log('📝 Question pressed:', question._id);
  };

  const handleDeleteQuestion = (questionId) => {
    Alert.alert(
      'Delete Question',
      'Are you sure you want to delete this question?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteQuestion(questionId);
              fetchQuestions(subjectId);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete question');
            }
          },
        },
      ]
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchQuestions(subjectId);
    setRefreshing(false);
  };

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

  const renderSection = (difficulty) => {
    const items = groupedQuestions[difficulty] || [];
    const label = difficultyLabels[difficulty];
    const color = difficultyColors[difficulty];
    const icon = difficultyIcons[difficulty];
    const count = items.length;

    if (count === 0) return null;

    return (
      <DifficultySection
        key={difficulty}
        title={label}
        count={count}
        color={color}
        icon={icon}
        questions={items}
        onQuestionPress={handleQuestionPress}
        onDeleteQuestion={handleDeleteQuestion}
      />
    );
  };

  const renderHeader = () => {
    const totalQuestions = questions.length;

    return (
      <View style={styles.headerContainer}>
        {/* Action Buttons Row */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleStartQuiz}
          >
            <Ionicons name="play" size={20} color={COLORS.background} />
            <Text style={styles.primaryButtonText}>Start Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            activeOpacity={0.7}
            onPress={handleAddQuestion}
          >
            <Ionicons name="add" size={20} color={COLORS.primary} />
            <Text style={styles.secondaryButtonText}>Add Q&A</Text>
          </TouchableOpacity>
        </View>

        {/* Mastery Progress */}
        <View style={styles.masteryContainer}>
          <View style={styles.masteryHeader}>
            <Text style={styles.masteryLabel}>Overall Mastery</Text>
            <Text style={styles.masteryPercentage}>{mastery}%</Text>
          </View>
          <View style={styles.masteryBar}>
            <View style={[styles.masteryFill, { width: `${mastery}%` }]} />
          </View>
          <Text style={styles.masterySubtext}>
            {totalQuestions} questions • {mastery}% mastered
          </Text>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Questions by Difficulty</Text>
          <Text style={styles.sectionCount}>{totalQuestions} total</Text>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <EmptyState
      title="No Questions Yet"
      subtitle="Start adding questions to build your knowledge base!"
      buttonText="Add Your First Question"
      onPress={handleAddQuestion}
      icon="add-circle-outline"
    />
  );

  const renderFooter = () => {
    if (questions.length === 0) return null;
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {questions.length} {questions.length === 1 ? 'question' : 'questions'} in this subject
        </Text>
      </View>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================

  if (isLoading && questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={difficultyOrder.filter((d) => (groupedQuestions[d] || []).length > 0)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderSection(item)}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || refreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Action Sheet */}
      <ActionSheet
        visible={actionSheetVisible}
        onClose={() => {
          console.log('❌ ActionSheet closed');
          setActionSheetVisible(false);
        }}
        title={subjectName || 'Subject'}
        options={actionSheetOptions}
        destructiveIndex={1}
      />
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.label,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.incorrect,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.md,
    padding: SPACING.md,
  },
  retryText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
  },
  listContent: {
    padding: SPACING.padding,
    paddingBottom: SPACING.xxxl + 80,
    flexGrow: 1,
  },

  // ============================================================
  // HEADER
  // ============================================================

  headerContainer: {
    marginBottom: SPACING.lg,
  },

  // ============================================================
  // ACTION BUTTONS
  // ============================================================

  actionContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  actionButton: {
    flex: 1,
    height: COMPONENT_SIZES.button.medium.height,
    borderRadius: BORDER_RADIUS.button,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.primary,
  },
  primaryButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.background,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // ============================================================
  // MASTERY
  // ============================================================

  masteryContainer: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
  },
  masteryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  masteryLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.headline,
  },
  masteryPercentage: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    fontWeight: '700',
  },
  masteryBar: {
    height: 8,
    backgroundColor: COLORS.divider,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  masteryFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
  },
  masterySubtext: {
    ...TYPOGRAPHY.label,
    color: COLORS.label,
    marginTop: SPACING.xs,
    textAlign: 'right',
  },

  // ============================================================
  // SECTION HEADER
  // ============================================================

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.headline,
  },
  sectionCount: {
    ...TYPOGRAPHY.label,
    color: COLORS.label,
  },

  // ============================================================
  // FOOTER
  // ============================================================

  footer: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  footerText: {
    ...TYPOGRAPHY.label,
    color: COLORS.label,
  },
});

export default SubjectDetailScreen;