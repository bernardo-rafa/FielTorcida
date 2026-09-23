import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    ImageBackground, 
    ScrollView
} from 'react-native';
import { auth, database } from '../services/firebaseConfig';
import { ref, get } from 'firebase/database';

export default function DashboardScreen() {
    const [userName, setUserName] = useState('Fiel');

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userRef = ref(database, `usuarios/${user.uid}`);
                    const snapshot = await get(userRef);
                    
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const firstName = data.nome ? data.nome.split(' ')[0] : 'Fiel';
                        setUserName(firstName);
                    }
                } catch (error) {
                    console.error("Erro ao buscar os dados:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <ImageBackground 
            source={require('../../assets/images/logotipo.png')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>FIEL TORCIDA</Text>
                        <Text style={styles.subtitle}>Painel do Torcedor</Text>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        
                        {/* Card de Boas-Vindas */}
                        <View style={styles.welcomeCard}>
                            <Text style={styles.welcomeTitle}>Bem-vindo, {userName}!</Text>
                            <Text style={styles.welcomeText}>
                                Este é o seu painel exclusivo. Navegue pelo menu inferior para acessar sua carteirinha, caravanas e muito mais.
                            </Text>
                        </View>

                        {/* Card de Próximo Jogo (Exemplo de Dashboard) */}
                        <View style={styles.infoCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardIcon}>⚽</Text>
                                <Text style={styles.cardTitle}>Próximo Jogo</Text>
                            </View>
                            <Text style={styles.matchText}>Corinthians x Palmeiras</Text>
                            <Text style={styles.matchDetails}>Neo Química Arena - Domingo, 16h</Text>
                        </View>

                        {/* Card de Status do Sócio (Exemplo de Dashboard) */}
                        <View style={[styles.infoCard, { borderLeftWidth: 4, borderLeftColor: '#4caf50' }]}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardIcon}>⭐</Text>
                                <Text style={styles.cardTitle}>Status do Torcedor</Text>
                            </View>
                            <Text style={styles.statusText}>Sócio Ativo</Text>
                            <Text style={styles.matchDetails}>Mensalidade em dia.</Text>
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)' },
    container: { flex: 1 },
    header: { alignItems: 'center', marginTop: 40, marginBottom: 20 },
    title: { 
        fontSize: 28, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        letterSpacing: 2, 
        textShadowColor: 'rgba(0, 0, 0, 0.9)', 
        textShadowOffset: { width: 1, height: 1 }, 
        textShadowRadius: 10 
    },
    subtitle: { fontSize: 16, color: '#e0e0e0', textTransform: 'uppercase', letterSpacing: 1, marginTop: 5 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
    welcomeCard: { backgroundColor: 'rgba(30, 30, 30, 0.8)', borderRadius: 12, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#444' },
    welcomeTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    welcomeText: { color: '#d0d0d0', fontSize: 15, lineHeight: 22 },
    infoCard: { backgroundColor: 'rgba(20, 20, 20, 0.8)', borderRadius: 12, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    cardIcon: { fontSize: 20, marginRight: 10 },
    cardTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
    matchText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    matchDetails: { color: '#a0a0a0', fontSize: 14 },
    statusText: { color: '#4caf50', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});