import { TYPOGRAPHY as ResponsiveTypography, SPACING as ResponsiveSpacing,responsiveWidth,responsiveHeight } from './responsive';

// ============================================================
// COLORS (unchanged)
// ============================================================

export const COLORS = {
  primary: '#00BCD4',
  secondary: '#10B981',
  tertiary: '#F19640',
  neutral: '#72787A',
  headline: '#EAEAEA',
  body: '#EAEAEA',
  label: '#8888AA',
  background: '#0F0F1A',
  card: '#1A1A2E',
  divider: '#2A2A3E',
  codeBackground: '#16162A',
  correct: '#10B981',
  incorrect: '#EF4444',
  warning: '#F19640',
  easy: '#10B981',
  medium: '#F19640',
  hard: '#EF4444',
  shadow: 'rgba(0, 0, 0, 0.3)',
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
  h1: {
    fontFamily: FONTS.inter.bold,
    ...ResponsiveTypography.h1,
    color: COLORS.headline,
  },
  h2: {
    fontFamily: FONTS.inter.bold,
    ...ResponsiveTypography.h2,
    color: COLORS.headline,
  },
  h3: {
    fontFamily: FONTS.inter.semibold,
    ...ResponsiveTypography.h3,
    color: COLORS.headline,
  },
  h4: {
    fontFamily: FONTS.inter.semibold,
    ...ResponsiveTypography.h4,
    color: COLORS.headline,
  },
  body: {
    fontFamily: FONTS.inter.regular,
    ...ResponsiveTypography.body,
    color: COLORS.body,
  },
  bodyMedium: {
    fontFamily: FONTS.inter.medium,
    ...ResponsiveTypography.body,
    color: COLORS.body,
  },
  bodySmall: {
    fontFamily: FONTS.inter.regular,
    ...ResponsiveTypography.bodySmall,
    color: COLORS.body,
  },
  label: {
    fontFamily: FONTS.inter.regular,
    ...ResponsiveTypography.label,
    color: COLORS.label,
  },
  labelBold: {
    fontFamily: FONTS.inter.semibold,
    ...ResponsiveTypography.label,
    color: COLORS.label,
  },
  question: {
    fontFamily: FONTS.inter.medium,
    ...ResponsiveTypography.question,
    color: COLORS.headline,
    textAlign: 'center',
  },
  code: {
    fontFamily: FONTS.jetbrains.regular,
    ...ResponsiveTypography.code,
    color: COLORS.primary,
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
  sm: responsiveWidth(8),
  md: responsiveWidth(12),
  lg: responsiveWidth(16),
  xl: responsiveWidth(24),
  pill: responsiveWidth(9999),
};

// ============================================================
// COMPONENT SIZES (Responsive)
// ============================================================

export const COMPONENT_SIZES = {
  buttonHeight: responsiveHeight(52),
  inputHeight: responsiveHeight(48),
  tabBarHeight: responsiveHeight(56),
  fabSize: responsiveWidth(56),
  iconSize: responsiveWidth(24),
  largeIcon: responsiveWidth(32),
  cardPadding: responsiveWidth(16),
};

export default COLORS;