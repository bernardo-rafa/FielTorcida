import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
 
import LoginScreen from './src/screens/login_screen';
import RegisterScreen from './src/screens/register_screen';
import SplashScreen from './src/screens/splash_screen';
// Importando o novo gerenciador de abas
import MainTabs from './src/screens/main_tabs'; 
 
const Stack = createNativeStackNavigator();
 
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                
                {/* A rota 'Home' agora carrega a barra de abas inferior, que contém o Dashboard */}
                <Stack.Screen name="Home" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}