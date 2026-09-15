import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    KeyboardAvoidingView, 
    Platform,
    SafeAreaView,
    ImageBackground
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
    Register: undefined;
};

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email !== '' && password !== '') {
            navigation.replace('Home'); 
        } else {
            console.log('Preencha todos os campos!');
        }
    };

    return (
        // ImageBackground substitui a View de fundo padrão
        <ImageBackground 
            source={require('../../assets/images/logotipo.png')} 
            style={styles.background}
            resizeMode="cover"
        >
            {/* Camada escura para garantir a leitura do formulário */}
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >
                        <View style={styles.header}>
                            <Text style={styles.title}>FIEL TORCIDA</Text>
                            <Text style={styles.subtitle}>Fernandópolis</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Digite seu e-mail"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />

                            <Text style={styles.label}>Senha</Text>
                            <TextInput 
                                style={styles.input}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <Text style={styles.loginButtonText}>ENTRAR</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Não faz parte da Fiel? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.registerText}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
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
        // Uma opacidade de 75% escurece bem o fundo para o formulário saltar aos olhos
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#e0e0e0',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 5,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        // Fundo dos inputs levemente translúcido para dar um efeito de vidro (glassmorphism) elegante
        backgroundColor: 'rgba(30, 30, 30, 0.8)', 
        color: '#ffffff',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#444',
        marginBottom: 20,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#d0d0d0',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#ffffff', 
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    loginButtonText: {
        color: '#121212',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    footerText: {
        color: '#d0d0d0',
        fontSize: 15,
    },
    registerText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});