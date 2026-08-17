import Svg, { Rect, Path } from "react-native-svg";

export const DataStruc = ({color}) => {
  return (
    <Svg width="38" height="42" fill="none" viewBox="0 0 38 42" >
      <Rect width="37" height="41" x=".5" y=".5" fill="#16162A" rx="7.5" />
      <Rect width="37" height="41" x=".5" y=".5" stroke="#2A2A3E" rx="7.5" />
      <Path
        fill={color}
        d="M22 27v-3h-4V14h-2v3H9V9h7v3h6V9h7v8h-7v-3h-2v8h2v-3h7v8zM11 11v4zm13 10v4zm0-10v4zm0 4h3v-4h-3zm0 10h3v-4h-3zM11 15h3v-4h-3z"
      />
    </Svg>
  );
};
