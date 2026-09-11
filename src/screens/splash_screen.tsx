import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        // Tempo ajustado para 3 segundos para dar tempo de apreciar a tela
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        // O ImageBackground substitui a View principal para colocar a imagem no fundo
        <ImageBackground 
            source={require('../assets/imagens/logotipo.png')} // Verifique se o caminho está correto em relação a este arquivo
            style={styles.background}
            resizeMode="cover"
        >
            {/* Esta View cria uma leve camada escura para destacar o texto */}
            <View style={styles.overlay}>
                <Text style={styles.logo}>MEU APP</Text>
                <Text style={styles.subtitle}>Bem-vindo!</Text>
                
                {/* Um indicador de carregamento profissional */}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo translúcido (50% de opacidade)
    },
    logo: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#ffffff', // Texto branco
        textShadowColor: 'rgba(0, 0, 0, 0.9)', // Sombra no texto para destacar
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        marginTop: 10,
        fontSize: 18,
        color: '#f0f0f0',
        fontWeight: '500',
    },
    loader: {
        marginTop: 40,
    },
});