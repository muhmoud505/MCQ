import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from '@expo/vector-icons/Ionicons';



const Tab=createBottomTabNavigator();
export default function AppNavigator(){
    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName;
                if(route.name==="Home")iconName=focused?'home':'home-outline';
                else if(route.name==="Settings")iconName=focused?'settings':'settings-outline';
                else if(route.name==="Stats")iconName=focused?'stats-chart':'stats-chart-outline';
                else if(route.name==="Search")iconName=focused?'search':'search-outline';
                return <Ionicons name={iconName} size={size} color={'#44D8F1'}/>
            },
            tabBarStyle:{backgroundColor:'#3C494C'}
        })}
        
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
        </Tab.Navigator>
    )
}