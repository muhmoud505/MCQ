import {Dimensions,Platform,PixelRatio,StatusBar} from 'react-native';

const {width:SCREEN_WIDTH,height:SCREEN_HEIGHT}=Dimensions.get('window');
const refernceWidth=393;
const refernceHeight=852;                
const widthScale=SCREEN_WIDTH/refernceWidth;
const heightScale=SCREEN_HEIGHT/refernceHeight;   

export const responsiveWidth=(size)=>{
    return Math.round(size * widthScale);
}

export const responsiveHeight=(size)=>{
    return Math.round(size * heightScale);
}

export const responsiveFontSize=(size)=>{
    const avgScale=(widthScale + heightScale)/2;
    const newSize=size * avgScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const responsiveSize=(size)=>{
    const scale=Math.min(widthScale,heightScale);
    return Math.round(size * scale);
}

export const getResponsiveValue=(phone,tablet)=>{
    const istablet=Platform.isPad || screenWidth >= 768;
    return isTablet ? tablet :phone;
}

export const SPACING = {
  xs: responsiveWidth(4),
  sm: responsiveWidth(8),
  md: responsiveWidth(12),
  lg: responsiveWidth(16),
  xl: responsiveWidth(24),
  xxl: responsiveWidth(32),
  padding: responsiveWidth(16),
  gap: responsiveWidth(12),
};


export const BORDER_RADIUS = {
  sm: responsiveWidth(8),
  md: responsiveWidth(12),
  lg: responsiveWidth(16),
  xl: responsiveWidth(24),
  pill: responsiveWidth(9999),
};


export const TYPOGRAPHY = {
  h1: {
    fontSize: responsiveFontSize(24),
    lineHeight: responsiveFontSize(32),
  },
  h2: {
    fontSize: responsiveFontSize(20),
    lineHeight: responsiveFontSize(28),
  },
  h3: {
    fontSize: responsiveFontSize(18),
    lineHeight: responsiveFontSize(24),
  },
  h4: {
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(22),
  },
  body: {
    fontSize: responsiveFontSize(16),
    lineHeight: responsiveFontSize(24),
  },
   bodySmall: {
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
  },
  label: {
    fontSize: responsiveFontSize(13),
    lineHeight: responsiveFontSize(18),
  },
  question: {
    fontSize: responsiveFontSize(22),
    lineHeight: responsiveFontSize(30),
  },
  code: {
    fontSize: responsiveFontSize(14),
    lineHeight: responsiveFontSize(20),
  },
};

export const getInsets = () => {
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;
  const bottomInset = Platform.OS === 'ios' ? 34 : 0;
  return { top: statusBarHeight, bottom: bottomInset };
};
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;
export const isTablet = SCREEN_WIDTH >= 768;
export const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;



export const responsiveStyle = (styles) => {
  if (isSmallDevice) return styles.small || styles.default;
  if (isMediumDevice) return styles.medium || styles.default;
  if (isLargeDevice) return styles.large || styles.default;
  return styles.default;
};

export const COMPONENT_SIZES = {
  buttonHeight: responsiveHeight(52),
  inputHeight: responsiveHeight(48),
  tabBarHeight: responsiveHeight(56),
  fabSize: responsiveWidth(56),
  iconSize: responsiveWidth(24),
  largeIcon: responsiveWidth(32),
  cardPadding: responsiveWidth(16),
};

export default {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
  responsiveSize,
  getResponsiveValue,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
  COMPONENT_SIZES,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet,
  isLandscape,
  getInsets,
};