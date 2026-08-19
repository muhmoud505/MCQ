import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import COLORS from '../utils/colors';
const Stack=createStackNavigator();
export default function HomeStack(){
    return(
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={
                {
                    headerTintColor:COLORS.primary
                    ,
                    headerStyle:{
                        backgroundColor:COLORS.headerBackground,
                    }

                }
            }
        >
            <Stack.Screen  options={{
          title:'MCQ'
            }}name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    )
}