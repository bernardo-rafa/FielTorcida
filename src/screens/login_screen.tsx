import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const validarEmail = (email: string) => {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    };

    const validarSenha = (senha: string) => {

        const temOitoCaracteres = senha.length >= 8;
        const temLetra = /[A-Za-z]/.test(senha);
        const temNumero = /\d/.test(senha);
        const temSimbolo = /[^A-Za-z\d]/.test(senha);

        return (
            temOitoCaracteres &&
            temLetra &&
            temNumero &&
            temSimbolo
        );
    };

    const senhaTemOitoCaracteres = password.length >= 8;

    const senhaTemLetra = /[A-Za-z]/.test(password);

    const senhaTemNumero = /\d/.test(password);

    const senhaTemSimbolo = /[^A-Za-z\d]/.test(password);

    const handleEmailChange = (text: string) => {

        // Remove espaços e transforma em letras minúsculas
        const emailFormatado = text
            .replace(/\s/g, '')
            .toLowerCase();

        setEmail(emailFormatado);

        // Limpa a mensagem de erro enquanto o usuário digita
        if (emailError !== '') {
            setEmailError('');
        }
    };

    const handlePasswordChange = (text: string) => {

        setPassword(text);

        // Limpa a mensagem de erro enquanto o usuário digita
        if (passwordError !== '') {
            setPasswordError('');
        }
    };

    const handleLogin = () => {

        let valido = true;

        // Limpa mensagens anteriores
        setEmailError('');
        setPasswordError('');

        if (email.trim() === '') {

            setEmailError('Informe seu e-mail.');

            valido = false;

        } else if (!validarEmail(email.trim())) {

            setEmailError('Informe um e-mail válido.');

            valido = false;
        }

       if (password.trim() === '') {

            setPasswordError('Informe sua senha.');

            valido = false;

        } else if (!validarSenha(password)) {

            setPasswordError(
                'A senha deve ter no mínimo 8 caracteres, contendo letras, números e pelo menos um símbolo.'
            );

            valido = false;
        }

       if (!valido) {
            return;
        }

        // Aqui será implementada a autenticação com Firebase.

        Alert.alert(
            'Login',
            'Dados preenchidos corretamente!'
        );

    };

    return (

        <View style={styles.container}>

            <StatusBar style="dark" />

            <View style={styles.topLine} />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.content}>

                      <View style={styles.header}>

                            <Text style={styles.title}>
                                Bem-vindo!
                            </Text>

                            <Text style={styles.subtitle}>
                                Acesse seu espaço de cuidado
                            </Text>

                        </View>

                        <View style={styles.form}>

                           <View style={styles.inputGroup}>

                                <Text style={styles.label}>
                                    E-MAIL
                                </Text>

                                <TextInput
                                    style={[
                                        styles.input,
                                        emailError !== '' &&
                                        styles.inputError,
                                    ]}
                                    placeholder="Digite seu e-mail"
                                    placeholderTextColor="#9A9E8A"
                                    value={email}
                                    onChangeText={handleEmailChange}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="email"
                                />

                                {emailError !== '' && (

                                    <Text style={styles.errorText}>
                                        {emailError}
                                    </Text>

                                )}

                            </View>

                          <View style={styles.inputGroup}>

                                <Text style={styles.label}>
                                    SENHA
                                </Text>

                                <View
                                    style={[
                                        styles.passwordContainer,
                                        passwordError !== '' &&
                                        styles.inputError,
                                    ]}
                                >

                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Digite sua senha"
                                        placeholderTextColor="#9A9E8A"
                                        value={password}
                                        onChangeText={
                                            handlePasswordChange
                                        }
                                        secureTextEntry={
                                            !showPassword
                                        }
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />

                                    <Pressable
                                        onPress={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        style={styles.showButton}
                                    >

                                        <Text style={styles.showText}>
                                            {showPassword
                                                ? 'OCULTAR'
                                                : 'MOSTRAR'}
                                        </Text>

                                    </Pressable>

                                </View>

                                <View style={styles.passwordRules}>

                                    <Text
                                        style={[
                                            styles.rule,
                                            senhaTemOitoCaracteres &&
                                            styles.ruleValid,
                                        ]}
                                    >
                                        {senhaTemOitoCaracteres
                                            ? '✓'
                                            : '○'}{' '}
                                        Mínimo de 8 caracteres
                                    </Text>

                                    <Text
                                        style={[
                                            styles.rule,
                                            senhaTemLetra &&
                                            styles.ruleValid,
                                        ]}
                                    >
                                        {senhaTemLetra
                                            ? '✓'
                                            : '○'}{' '}
                                        Pelo menos uma letra
                                    </Text>

                                    <Text
                                        style={[
                                            styles.rule,
                                            senhaTemNumero &&
                                            styles.ruleValid,
                                        ]}
                                    >
                                        {senhaTemNumero
                                            ? '✓'
                                            : '○'}{' '}
                                        Pelo menos um número
                                    </Text>

                                    <Text
                                        style={[
                                            styles.rule,
                                            senhaTemSimbolo &&
                                            styles.ruleValid,
                                        ]}
                                    >
                                        {senhaTemSimbolo
                                            ? '✓'
                                            : '○'}{' '}
                                        Pelo menos um símbolo
                                    </Text>

                                </View>

                                {passwordError !== '' && (

                                    <Text style={styles.errorText}>
                                        {passwordError}
                                    </Text>

                                )}

                            </View>                    
                           
                                <Text style={styles.forgotText}>
                                    Esqueci minha senha
                                </Text>                                          

                            <Pressable
                                style={({ pressed }) => [
                                    styles.loginButton,
                                    pressed &&
                                    styles.loginButtonPressed,
                                ]}
                                onPress={handleLogin}
                            >

                                <Text style={styles.loginButtonText}>
                                    ENTRAR
                                </Text>

                            </Pressable>

                            <View style={styles.registerContainer}>

                                <Text style={styles.registerText}>
                                    Ainda não possui uma conta?
                                </Text>

                                <Pressable
                                    onPress={() =>
                                        navigation.navigate(
                                            'Register'
                                        )
                                    }
                                >

                                    <Text style={styles.registerLink}>
                                        Cadastre-se
                                    </Text>

                                </Pressable>

                            </View>

                        </View>

                        <Text style={styles.footer}>
                            TERAPIA OCUPACIONAL
                        </Text>

                    </View>

                </ScrollView>

            </KeyboardAvoidingView>

        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FCF8F0',
    },

    flex: {
        flex: 1,
    },

    topLine: {
        height: 5,
        width: '100%',
        backgroundColor: '#AFC77B',
    },

    scrollContent: {
        flexGrow: 1,
    },

    content: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 55,
        paddingBottom: 30,
    },

    header: {
        alignItems: 'center',
        marginBottom: 42,
    },

    title: {
        color: '#59766D',
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    subtitle: {
        color: '#9A9E8A',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
   
    form: {
        width: '100%',
    },

    inputGroup: {
        marginBottom: 22,
    },

    label: {
        color: '#59766D',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 8,
    },

   input: {
        width: '100%',
        height: 52,
        borderWidth: 1,
        borderColor: '#D8D2C6',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        color: '#4E625C',
        fontSize: 15,
    },

    inputError: {
        borderColor: '#E98747',
    },

   passwordContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D8D2C6',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },

    passwordInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        color: '#4E625C',
        fontSize: 15,
    },

    showButton: {
        paddingHorizontal: 14,
    },

    showText: {
        color: '#59766D',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.8,
    },

    passwordRules: {
        marginTop: 8,
        marginLeft: 3,
    },

    rule: {
        color: '#B0B09F',
        fontSize: 10,
        marginBottom: 3,
    },

    ruleValid: {
        color: '#78905F',
        fontWeight: '600',
    },

    errorText: {
        color: '#D96D43',
        fontSize: 11,
        marginTop: 6,
        marginLeft: 3,
        lineHeight: 15,
    },

    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: -5,
        marginBottom: 28,
    },

    forgotText: {
        color: '#59766D',
        fontSize: 12,
        fontWeight: '600',
    },

   loginButton: {
        height: 52,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#AFC77B',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },

    loginButtonPressed: {
        opacity: 0.8,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 2,
    },

    registerContainer: {
        alignItems: 'center',
        marginTop: 28,
    },

    registerText: {
        color: '#9A9E8A',
        fontSize: 12,
    },

    registerLink: {
        color: '#59766D',
        fontSize: 13,
        fontWeight: '700',
        marginTop: 5,
    },

    footer: {
        color: '#9A9E8A',
        fontSize: 9,
        letterSpacing: 2.2,
        textAlign: 'center',
        marginTop: 45,
    },
});

