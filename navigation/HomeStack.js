import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SubjectDetailScreen from '../screens/SubjectDetailScreen';
import COLORS, { SPACING, TYPOGRAPHY } from '../utils/colors';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from '../utils/responsive';
import React from 'react';

const Stack = createStackNavigator();

// ============================================================
// CUSTOM HEADER
// ============================================================

const CustomHeader = ({ navigation, route, options }) => {
  const title = options?.title || route?.name || 'DevCS Revision';
  const canGoBack = navigation.canGoBack();
  const isHomeScreen = route?.name === 'HomeScreen';
  
  // ✅ Get the callback from route params
  const openActionSheet = route?.params?.openActionSheet;

  // Debug log
  console.log('🔍 Header rendering - openActionSheet:', openActionSheet ? '✅ Exists' : '❌ Missing');

  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      {canGoBack ? (
        <TouchableOpacity 
          style={styles.leftButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" color={COLORS.headline} size={24} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButton} />
      )}

      {/* Title */}
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>

      {/* Right Button - Only on Subject Detail */}
      {!isHomeScreen ? (
        <TouchableOpacity 
          onPress={() => {
            console.log('⋮ Menu pressed in header');
            if (openActionSheet) {
              // ✅ Call the function from the screen
              openActionSheet();
            } else {
              // Fallback Alert if no function is set
              Alert.alert(
                'Subject Options',
                'What would you like to do?',
                [
                  { text: 'Edit Subject', onPress: () => console.log('Edit Subject') },
                  { text: 'Delete Subject', onPress: () => console.log('Delete Subject'), style: 'destructive' },
                  { text: 'Cancel', style: 'cancel' },
                ]
              );
            }
          }}
          style={styles.rightButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.headline} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} />
      )}
    </View>
  );
};

// ============================================================
// STACK NAVIGATOR
// ============================================================

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.card,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'DevCS Revision',
        }}
      />
      
      <Stack.Screen
        name="SubjectDetail"
        component={SubjectDetailScreen}
        options={({ route }) => ({
          title: route.params?.subjectName || 'Subject',
        })}
      />
    </Stack.Navigator>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.padding,
    height: responsiveHeight(56),
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  leftButton: {
    width: responsiveWidth(40),
    height: responsiveHeight(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightButton: {
    width: responsiveWidth(40),
    height: responsiveHeight(40),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.headline,
    textAlign: 'center',
    flex: 1,
  },
});