
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar todas as telas do aplicativo 
// eslint-disable-next-line import/no-unresolved
import SplashScreen from './src/screens/SplashScreen';
//  import LoginScreen from './src/screens/LoginScreen';
// import CadastroScreen from './src/screens/CadastroScreen';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}