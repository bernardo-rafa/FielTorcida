import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    SafeAreaView 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Atualizamos o dicionário de rotas para incluir a tela Home
type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
    // Futuras telas podem ser adicionadas aqui (ex: Noticias: undefined;)
};

// 2. Tipagem da propriedade navigation para a HomeScreen
type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        // SafeAreaView garante que o conteúdo não fique escondido sob o notch do celular
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Cabeçalho do App */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>FIEL FERNANDÓPOLIS</Text>
                </View>

                {/* Seção de Boas-vindas */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Bem-vindo, Fiel!</Text>
                    <Text style={styles.subtitleText}>O que você deseja acompanhar hoje?</Text>
                </View>

                {/* Grid de Menus (Cards) */}
                <View style={styles.grid}>
                    <TouchableOpacity 
                        style={styles.card} 
                        // Exemplo de navegação futura: onPress={() => navigation.navigate('Noticias')}
                        onPress={() => console.log('Acessar Notícias')}
                    >
                        <Text style={styles.cardIcon}>📰</Text>
                        <Text style={styles.cardTitle}>Notícias</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => console.log('Acessar Caravanas')}
                    >
                        <Text style={styles.cardIcon}>🚌</Text>
                        <Text style={styles.cardTitle}>Caravanas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => console.log('Acessar Carteirinha')}
                    >
                        <Text style={styles.cardIcon}>🪪</Text>
                        <Text style={styles.cardTitle}>Carteirinha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card} 
                        onPress={() => console.log('Acessar Loja')}
                    >
                        <Text style={styles.cardIcon}>🛒</Text>
                        <Text style={styles.cardTitle}>Loja Fiel</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão de Sair */}
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Fundo escuro padrão de apps modernos
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1.5,
    },
    welcomeSection: {
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subtitleText: {
        fontSize: 16,
        color: '#a0a0a0',
        marginTop: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#1e1e1e', // Tom um pouco mais claro que o fundo para destacar
        width: '48%', // Ocupa quase metade da tela, deixando espaço para o gap
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        // Sombra para dar profundidade (funciona no iOS e Android)
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    cardIcon: {
        fontSize: 32,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: '#cf0e0e', // Vermelho corinthiano para botões de ação destrutiva
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});