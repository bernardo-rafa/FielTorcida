import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
 
import HomeScreen from './src/screens/home_screen';
import LoginScreen from './src/screens/login_screen';
import RegisterScreen from './src/screens/register_screen';
import SplashScreen from './src/screens/splash_screen';
 
const Stack = createNativeStackNavigator();
 
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                
                {/* Aqui estava "Register_screen", foi alterado para "Register" */}
                <Stack.Screen name="Register" component={RegisterScreen} />
                
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}