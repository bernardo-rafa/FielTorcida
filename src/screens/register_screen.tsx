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
    ImageBackground,
    ScrollView,
    Alert 
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth, database } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref, set } from 'firebase/database';

type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
    Register: undefined;
};

type RegisterScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: ''
    });

    const formatPhone = (text: string) => {
        const cleaned = text.replace(/\D/g, '').slice(0, 11);
        let formatted = cleaned;
        
        if (cleaned.length > 2) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
        }
        if (cleaned.length > 7) {
            formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        
        return formatted;
    };

    // Validações da Senha
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isPasswordStrong = hasMinLength && hasUpperCase && hasSpecialChar;

    // Nova validação em tempo real para a Confirmação de Senha
    const hasStartedConfirming = confirmPassword.length > 0;
    const doPasswordsMatch = hasStartedConfirming && password === confirmPassword;

    const getRequirementColor = (isMet: boolean) => {
        if (password.length === 0) return '#a0a0a0'; 
        return isMet ? '#4caf50' : '#ff4444'; 
    };

    const getRequirementIcon = (isMet: boolean) => {
        if (password.length === 0) return '○';
        return isMet ? '✓' : '✗';
    };

    const handleRegister = async () => {
        let currentErrors = { name: '', phone: '', email: '', password: '', confirmPassword: '', general: '' };
        let hasError = false;

        if (!name.trim()) {
            currentErrors.name = 'O nome completo é obrigatório.';
            hasError = true;
        }

        const phoneNumbersOnly = phone.replace(/\D/g, '');
        if (!phone.trim()) {
            currentErrors.phone = 'O telefone é obrigatório.';
            hasError = true;
        } else if (phoneNumbersOnly.length !== 11) {
            currentErrors.phone = 'Digite um telefone válido com DDD (11 dígitos).';
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            currentErrors.email = 'O e-mail é obrigatório.';
            hasError = true;
        } else if (!emailRegex.test(email)) {
            currentErrors.email = 'Digite um formato de e-mail válido.';
            hasError = true;
        }

        if (!isPasswordStrong) {
            currentErrors.password = 'A senha não atende a todos os requisitos.';
            hasError = true;
        }

        if (!confirmPassword.trim()) {
            currentErrors.confirmPassword = 'Você precisa confirmar a senha.';
            hasError = true;
        } else if (!doPasswordsMatch) {
            currentErrors.confirmPassword = 'As senhas não coincidem.';
            hasError = true;
        }

        if (hasError) {
            setErrors(currentErrors);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await set(ref(database, 'usuarios/' + user.uid), {
                nome: name,
                telefone: phone,
                email: email,
                dataCadastro: new Date().toISOString()
            });

            await signOut(auth);

            Alert.alert('Sucesso!', 'Cadastro realizado com sucesso. Faça o login.');
            navigation.goBack();
            
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                currentErrors.email = 'Este e-mail já possui um cadastro ativo.';
            } else if (error.code === 'auth/invalid-email') {
                currentErrors.email = 'O servidor recusou o formato do e-mail.';
            } else {
                currentErrors.general = 'Ocorreu um erro no servidor. Tente novamente.';
            }
            setErrors({ ...currentErrors });
        }
    };

    return (
        <ImageBackground 
            source={require('../../assets/images/logotipo.png')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardContainer}
                    >
                        <ScrollView 
                            contentContainerStyle={styles.scrollContent}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.header}>
                                <Text style={styles.title}>FIEL TORCIDA</Text>
                                <Text style={styles.subtitle}>Novo Cadastro</Text>
                            </View>

                            <View style={styles.formContainer}>
                                <Text style={styles.label}>Nome Completo</Text>
                                <TextInput 
                                    style={[styles.input, errors.name ? styles.inputError : null]}
                                    placeholder="Digite seu nome"
                                    placeholderTextColor="#999"
                                    value={name}
                                    onChangeText={(text) => { setName(text); setErrors({...errors, name: ''}); }}
                                />
                                {errors.name ? <Text style={styles.fieldErrorText}>{errors.name}</Text> : null}

                                <Text style={styles.label}>Telefone</Text>
                                <TextInput 
                                    style={[styles.input, errors.phone ? styles.inputError : null]}
                                    placeholder="(XX) XXXXX-XXXX"
                                    placeholderTextColor="#999"
                                    keyboardType="phone-pad"
                                    maxLength={15}
                                    value={phone}
                                    onChangeText={(text) => { 
                                        setPhone(formatPhone(text)); 
                                        setErrors({...errors, phone: ''}); 
                                    }}
                                />
                                {errors.phone ? <Text style={styles.fieldErrorText}>{errors.phone}</Text> : null}

                                <Text style={styles.label}>E-mail</Text>
                                <TextInput 
                                    style={[styles.input, errors.email ? styles.inputError : null]}
                                    placeholder="Digite seu e-mail"
                                    placeholderTextColor="#999"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={(text) => { setEmail(text); setErrors({...errors, email: ''}); }}
                                />
                                {errors.email ? <Text style={styles.fieldErrorText}>{errors.email}</Text> : null}

                                <Text style={styles.label}>Senha</Text>
                                <TextInput 
                                    style={[styles.input, { marginBottom: 5 }, errors.password ? styles.inputError : null]} 
                                    placeholder="Crie uma senha segura"
                                    placeholderTextColor="#999"
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={(text) => { setPassword(text); setErrors({...errors, password: ''}); }}
                                />
                                
                                <View style={styles.requirementsContainer}>
                                    <Text style={[styles.requirementText, { color: getRequirementColor(hasMinLength) }]}>
                                        {getRequirementIcon(hasMinLength)} Pelo menos 8 caracteres
                                    </Text>
                                    <Text style={[styles.requirementText, { color: getRequirementColor(hasUpperCase) }]}>
                                        {getRequirementIcon(hasUpperCase)} Mínimo 1 letra maiúscula
                                    </Text>
                                    <Text style={[styles.requirementText, { color: getRequirementColor(hasSpecialChar) }]}>
                                        {getRequirementIcon(hasSpecialChar)} Mínimo 1 caractere especial (!@#$...)
                                    </Text>
                                </View>
                                {errors.password ? <Text style={[styles.fieldErrorText, {marginTop: 5}]}>{errors.password}</Text> : null}

                                <Text style={styles.label}>Confirmar Senha</Text>
                                <TextInput 
                                    // Margem inferior ajustada dinamicamente dependendo se o aviso está na tela
                                    style={[styles.input, { marginBottom: hasStartedConfirming ? 5 : 15 }, errors.confirmPassword ? styles.inputError : null]}
                                    placeholder="Repita sua senha"
                                    placeholderTextColor="#999"
                                    secureTextEntry={true}
                                    value={confirmPassword}
                                    onChangeText={(text) => { setConfirmPassword(text); setErrors({...errors, confirmPassword: ''}); }}
                                />
                                
                                {/* Confirmação visual em tempo real */}
                                {hasStartedConfirming && (
                                    <Text style={[
                                        doPasswordsMatch ? styles.strongPasswordText : styles.weakPasswordText, 
                                        { marginBottom: 15 }
                                    ]}>
                                        {doPasswordsMatch ? '✓ As senhas coincidem' : '✗ As senhas não coincidem'}
                                    </Text>
                                )}
                                
                                {errors.confirmPassword && !hasStartedConfirming ? <Text style={styles.fieldErrorText}>{errors.confirmPassword}</Text> : null}

                                {errors.general ? <Text style={styles.generalErrorText}>{errors.general}</Text> : null}

                                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                                    <Text style={styles.registerButtonText}>CADASTRAR</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Já faz parte da Fiel? </Text>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text style={styles.loginText}>Entrar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, width: '100%', height: '100%' },
    overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
    container: { flex: 1 },
    keyboardContainer: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 40 },
    header: { alignItems: 'center', marginBottom: 30 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', letterSpacing: 2, textShadowColor: 'rgba(0, 0, 0, 0.9)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 10 },
    subtitle: { fontSize: 18, color: '#e0e0e0', textTransform: 'uppercase', letterSpacing: 1, marginTop: 5 },
    formContainer: { width: '100%' },
    label: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
    input: { backgroundColor: 'rgba(30, 30, 30, 0.8)', color: '#ffffff', borderRadius: 8, padding: 15, fontSize: 16, borderWidth: 1, borderColor: '#444' },
    
    inputError: { borderColor: '#ff4444', borderWidth: 1.5 },
    fieldErrorText: { color: '#ff4444', fontSize: 13, fontWeight: '600', marginLeft: 4, marginTop: -10, marginBottom: 15 },
    generalErrorText: { color: '#ff4444', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    
    requirementsContainer: { marginBottom: 20, paddingHorizontal: 5 },
    requirementText: { fontSize: 13, fontWeight: '500', marginBottom: 4 },
    
    weakPasswordText: { color: '#ff4444', fontSize: 12, marginLeft: 4, fontWeight: '500' },
    strongPasswordText: { color: '#4caf50', fontSize: 13, marginLeft: 4, fontWeight: 'bold' },
    
    registerButton: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
    registerButtonText: { color: '#121212', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
    footerText: { color: '#d0d0d0', fontSize: 15 },
    loginText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold', textDecorationLine: 'underline' },
});