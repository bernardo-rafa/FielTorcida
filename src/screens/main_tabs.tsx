import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';

// O miolo principal será o Dashboard agora
import DashboardScreen from './dashboard_screen';

// Tela temporária para as outras funções
function PlaceholderScreen({ title }: { title: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    
    // Função de Logout movida para dentro do controle das Tabs
    const handleLogout = (navigation: any) => {
        Alert.alert(
            "Sair da Conta",
            "Tem certeza que deseja sair do aplicativo da Fiel?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            // Reseta a navegação para impedir que o usuário volte com o botão do celular
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        } catch {
                            Alert.alert("Erro", "Não foi possível sair da conta.");
                        }
                    } 
                }
            ]
        );
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#121212',
                    borderTopWidth: 1,
                    borderTopColor: '#333333',
                    paddingBottom: 10,
                    paddingTop: 5,
                    height: 65,
                },
                tabBarActiveTintColor: '#ff4444', 
                tabBarInactiveTintColor: '#888888',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Início') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Carteirinha') iconName = focused ? 'card' : 'card-outline';
                    else if (route.name === 'Caravanas') iconName = focused ? 'bus' : 'bus-outline';
                    else if (route.name === 'Sair') iconName = focused ? 'log-out' : 'log-out-outline';

                    return <Ionicons name={iconName as any} size={size + 2} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Início" component={DashboardScreen} />
            
            <Tab.Screen name="Carteirinha">
                {() => <PlaceholderScreen title="Minha Carteirinha" />}
            </Tab.Screen>
            
            <Tab.Screen name="Caravanas">
                {() => <PlaceholderScreen title="Próximas Caravanas" />}
            </Tab.Screen>

            {/* A aba "Sair" não abre uma tela, ela intercepta o clique e chama o handleLogout */}
            <Tab.Screen 
                name="Sair" 
                component={View} // Componente vazio pois nunca será renderizado
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault(); // Impede a navegação padrão da aba
                        handleLogout(navigation); // Chama o alerta de Logout
                    },
                })}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' },
    text: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' }
});