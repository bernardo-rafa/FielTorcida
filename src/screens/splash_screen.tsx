import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
// Importação do tipo de navegação (assumindo que você usa o React Navigation)
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Definimos os nomes das telas que existem no seu App para o TypeScript
type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    // Você pode adicionar outras telas aqui futuramente, como:
    // Home: undefined;
    // Register: undefined;
};

// 2. Tipamos a propriedade 'navigation' específica para esta tela
type SplashScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: SplashScreenProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <ImageBackground 
            // Caminho relativo saindo de src/screens/ e indo para assets/images/
            source={require('../../assets/images/logotipo.png')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Textos ajustados para o tema do seu projeto */}
                <Text style={styles.logo}>FIEL TORCIDA</Text>
                <Text style={styles.subtitle}>Fernandópolis - SP</Text>
                
                <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // 60% escuro para destacar bem o texto
    },
    logo: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 5,
        fontSize: 18,
        color: '#f0f0f0',
        fontWeight: '500',
        textAlign: 'center',
    },
    loader: {
        marginTop: 40,
    },
});