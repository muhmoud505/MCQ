import { TYPOGRAPHY as ResponsiveTypography, SPACING as ResponsiveSpacing,responsiveWidth,responsiveHeight, responsiveFontSize } from './responsive';

// ============================================================
// COLORS (unchanged)
// ============================================================

// ============================================================
// COMPLETE COLOR SYSTEM
// ============================================================

export const COLORS = {
  // ============================================================
  // BRAND COLORS
  // ============================================================
  primary: '#00BCD4',
  primaryLight: '#4DD0E1',
  primaryDark: '#00838F',
  
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  tertiary: '#F19640',
  tertiaryLight: '#FBBF24',
  tertiaryDark: '#D97706',
  
  // ============================================================
  // TEXT COLORS
  // ============================================================
  headline: '#EAEAEA',
  body: '#EAEAEA',
  label: '#8888AA',
  secondaryText: '#8888AA',
  placeholder: '#666688',
  disabled: '#4A4A5E',
  
  // ============================================================
  // BACKGROUND & SURFACE
  // ============================================================
  background: '#0F0F1A',
  card: '#1A1A2E',
  cardHover: '#22223A',
  divider: '#2A2A3E',
  codeBackground: '#16162A',
  overlay: 'rgba(15, 15, 26, 0.85)',
  
  // ============================================================
  // STATUS COLORS
  // ============================================================
  correct: '#10B981',
  incorrect: '#EF4444',
  warning: '#F19640',
  info: '#3B82F6',
  
  // ============================================================
  // DIFFICULTY COLORS
  // ============================================================
  easy: '#10B981',
  medium: '#F19640',
  hard: '#EF4444',
  
  // ============================================================
  // SHADOWS
  // ============================================================
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowLight: 'rgba(0, 0, 0, 0.15)',
  shadowHeavy: 'rgba(0, 0, 0, 0.5)',
  
  // ============================================================
  // GRADIENTS
  // ============================================================
  gradientPrimary: ['#00BCD4', '#00838F'],
  gradientSuccess: ['#10B981', '#059669'],
  gradientDanger: ['#EF4444', '#B91C1C'],
};


// ============================================================
// FONTS (unchanged)
// ============================================================

export const FONTS = {
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  jetbrains: {
    regular: 'JetBrainsMono_400Regular',
  },
};

// ============================================================
// TYPOGRAPHY (Now using responsive functions)
// ============================================================

export const TYPOGRAPHY = {
  // ============================================================
  // HEADINGS
  // ============================================================
  
  h1: {
    fontFamily: FONTS.inter.bold,
    fontSize: responsiveFontSize(28),
    lineHeight: responsiveFontSize(36),
    color: COLORS.headline,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: FONTS.inter.bold,
    fontSize: responsiveFontSize(24),
    lineHeight: responsiveFontSize(32),
    color: COLORS.headline,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: FONTS.inter.semibold,
    fontSize: responsiveFontSize(20),
    lineHeight: responsiveFontSize(28),
    color: COLORS.headline,
  },
  h4: {
    fontFamily: FONTS.inter.semibold,
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveFontSize(24),
    color: COLORS.headline,
  },
  h5: {
    fontFamily: FONTS.inter.semibold,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(22),
    color: COLORS.headline,
  },

  // ============================================================
  // BODY TEXT
  // ============================================================
  
  body: {
    fontFamily: FONTS.inter.regular,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(24),
    color: COLORS.body,
  },
  bodyMedium: {
    fontFamily: FONTS.inter.medium,
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(24),
    color: COLORS.body,
  },
  bodySmall: {
    fontFamily: FONTS.inter.regular,
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
    color: COLORS.body,
  },
  bodySmallMedium: {
    fontFamily: FONTS.inter.medium,
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
    color: COLORS.body,
  },

  // ============================================================
  // LABELS & METADATA
  // ============================================================
  
  label: {
    fontFamily: FONTS.inter.regular,
    fontSize: responsiveFontSize(13),
    lineHeight: responsiveFontSize(18),
    color: COLORS.label,
  },
  labelBold: {
    fontFamily: FONTS.inter.semibold,
    fontSize: responsiveFontSize(13),
    lineHeight: responsiveFontSize(18),
    color: COLORS.label,
  },
  labelSmall: {
    fontFamily: FONTS.inter.regular,
    fontSize: responsiveFontSize(11),
    lineHeight: responsiveFontSize(16),
    color: COLORS.label,
  },

  // ============================================================
  // SPECIALTY TEXT
  // ============================================================
  
  question: {
    fontFamily: FONTS.inter.medium,
    fontSize: responsiveFontSize(22),
    lineHeight: responsiveFontSize(30),
    color: COLORS.headline,
    textAlign: 'center',
  },
  code: {
    fontFamily: FONTS.jetbrains.regular,
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
    color: COLORS.primary,
  },
  codeBlock: {
    fontFamily: FONTS.jetbrains.regular,
    fontSize: responsiveFontSize(13),
    lineHeight: responsiveFontSize(19),
    color: COLORS.headline,
  },

  // ============================================================
  // STATS & NUMBERS
  // ============================================================
  
  statNumber: {
    fontFamily: FONTS.jetbrains.bold,
    fontSize: responsiveFontSize(32),
    lineHeight: responsiveFontSize(40),
    color: COLORS.headline,
  },
  statLabel: {
    fontFamily: FONTS.inter.medium,
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
    color: COLORS.label,
  },
};


// ============================================================
// SPACING (Now using responsive values)
// ============================================================

export const SPACING = ResponsiveSpacing;

// ============================================================
// BORDER RADIUS (Now using responsive values)
// ============================================================

export const BORDER_RADIUS = {
  // ============================================================
  // BASE RADIUS
  // ============================================================
  xs: responsiveWidth(4),
  sm: responsiveWidth(8),
  md: responsiveWidth(12),
  lg: responsiveWidth(16),
  xl: responsiveWidth(20),
  xxl: responsiveWidth(24),

  // ============================================================
  // SPECIALTY
  // ============================================================
  pill: responsiveWidth(9999),
  circle: 9999,
  none: 0,

  // ============================================================
  // COMPONENT SPECIFIC
  // ============================================================
  card: responsiveWidth(12),
  button: responsiveWidth(12),
  input: responsiveWidth(12),
  modal: responsiveWidth(16),
};

// ============================================================
// COMPONENT SIZES (Responsive)
// ============================================================
export const SHADOWS = {
  // ============================================================
  // ELEVATION 1 (Subtle)
  // ============================================================
  xs: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // ============================================================
  // ELEVATION 2 (Cards)
  // ============================================================
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // ============================================================
  // ELEVATION 3 (Buttons, FAB)
  // ============================================================
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  // ============================================================
  // ELEVATION 4 (Modals, Dropdowns)
  // ============================================================
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },

  // ============================================================
  // ELEVATION 5 (Heavy)
  // ============================================================
  xl: {
    shadowColor: COLORS.shadowHeavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  // ============================================================
  // COLORED SHADOWS
  // ============================================================
  primary: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  success: {
    shadowColor: COLORS.correct,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  danger: {
    shadowColor: COLORS.incorrect,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
};


export const COMPONENT_SIZES = {
  // ============================================================
  // BUTTONS
  // ============================================================
  button: {
    small: {
      height: responsiveHeight(36),
      paddingHorizontal: responsiveWidth(12),
      fontSize: 14,
    },
    medium: {
      height: responsiveHeight(44),
      paddingHorizontal: responsiveWidth(16),
      fontSize: 16,
    },
    large: {
      height: responsiveHeight(52),
      paddingHorizontal: responsiveWidth(20),
      fontSize: 16,
    },
    full: {
      height: responsiveHeight(52),
      paddingHorizontal: responsiveWidth(20),
      fontSize: 16,
    },
  },

  // ============================================================
  // INPUTS
  // ============================================================
  input: {
    small: {
      height: responsiveHeight(36),
      fontSize: 14,
    },
    medium: {
      height: responsiveHeight(44),
      fontSize: 16,
    },
    large: {
      height: responsiveHeight(52),
      fontSize: 16,
    },
    multi: {
      minHeight: responsiveHeight(100),
      fontSize: 16,
    },
  },

  // ============================================================
  // ICONS
  // ============================================================
  icon: {
    tiny: responsiveWidth(16),
    small: responsiveWidth(20),
    medium: responsiveWidth(24),
    large: responsiveWidth(32),
    xlarge: responsiveWidth(40),
  },

  // ============================================================
  // CARDS
  // ============================================================
  card: {
    minHeight: responsiveHeight(160),
    padding: responsiveWidth(16),
    borderRadius: responsiveWidth(12),
  },

  // ============================================================
  // HEADER
  // ============================================================
  header: {
    height: responsiveHeight(56),
    paddingHorizontal: responsiveWidth(16),
  },

  // ============================================================
  // TAB BAR
  // ============================================================
  tabBar: {
    height: responsiveHeight(56),
    iconSize: responsiveWidth(24),
    labelSize: 11,
  },

  // ============================================================
  // FAB
  // ============================================================
  fab: {
    size: responsiveWidth(56),
    iconSize: responsiveWidth(28),
  },

  // ============================================================
  // PROGRESS
  // ============================================================
  progress: {
    height: responsiveHeight(6),
    small: responsiveHeight(4),
    large: responsiveHeight(8),
  },
};

export default COLORS;