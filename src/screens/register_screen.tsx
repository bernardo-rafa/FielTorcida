import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen({ navigation }: any) {
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const [erros, setErros] = useState({
        nome: '',
        celular: '',
        email: '',
        senha: '',
    });

    // =========================
    // MÁSCARA DO CELULAR
    // =========================
    const aplicarMascaraCelular = (texto: string) => {
        let numero = texto.replace(/\D/g, '');

        if (numero.length > 11) {
            numero = numero.substring(0, 11);
        }

        if (numero.length <= 2) {
            return numero;
        }

        if (numero.length <= 7) {
            return `(${numero.substring(0, 2)}) ${numero.substring(2)}`;
        }

        return `(${numero.substring(0, 2)}) ${numero.substring(
            2,
            7
        )}-${numero.substring(7)}`;
    };

    // =========================
    // VALIDAÇÃO DO E-MAIL
    // =========================
    const validarEmail = (email: string) => {
        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    };

    // =========================
    // VALIDAÇÃO DA SENHA
    // =========================
    const validarSenha = (senha: string) => {
        // Mínimo 8 caracteres
        // Pelo menos uma letra
        // Pelo menos um número
        // Pelo menos um símbolo
        const regex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

        return regex.test(senha);
    };

    // =========================
    // VALIDAÇÃO DOS CAMPOS
    // =========================
    const validarCampos = () => {
        const novosErros = {
            nome: '',
            celular: '',
            email: '',
            senha: '',
        };

        let valido = true;

        // Nome
        if (!nome.trim()) {
            novosErros.nome = 'Informe seu nome.';
            valido = false;
        }

        // Celular
        if (!celular.trim()) {
            novosErros.celular = 'Informe seu celular.';
            valido = false;
        } else if (
            celular.replace(/\D/g, '').length !== 11
        ) {
            novosErros.celular =
                'Informe um celular válido.';
            valido = false;
        }

        // E-mail
        if (!email.trim()) {
            novosErros.email = 'Informe seu e-mail.';
            valido = false;
        } else if (!validarEmail(email.trim())) {
            novosErros.email =
                'Informe um e-mail válido.';
            valido = false;
        }

        // Senha
        if (!senha.trim()) {
            novosErros.senha = 'Informe uma senha.';
            valido = false;
        } else if (!validarSenha(senha)) {
            novosErros.senha =
                'A senha deve ter no mínimo 8 caracteres, contendo letras, números e pelo menos um símbolo.';
            valido = false;
        }

        setErros(novosErros);

        return valido;
    };

    // =========================
    // CADASTRAR USUÁRIO
    // =========================
    const cadastrarUsuario = () => {
        if (!validarCampos()) {
            return;
        }

        Alert.alert(
            'Cadastro realizado',
            'Usuário cadastrado com sucesso!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>

                    {/* TÍTULO */}
                    <Text style={styles.titulo}>
                        Criar conta
                    </Text>

                    <Text style={styles.subtitulo}>
                        Preencha os dados para criar sua conta
                    </Text>

                    {/* NOME */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                            Nome
                        </Text>

                        <TextInput
                            style={[
                                styles.input,
                                erros.nome
                                    ? styles.inputErro
                                    : null,
                            ]}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={(texto) => {
                                setNome(texto);

                                if (erros.nome) {
                                    setErros({
                                        ...erros,
                                        nome: '',
                                    });
                                }
                            }}
                            autoCapitalize="words"
                        />

                        {erros.nome ? (
                            <Text style={styles.textoErro}>
                                {erros.nome}
                            </Text>
                        ) : null}
                    </View>

                    {/* CELULAR */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                            Celular
                        </Text>

                        <TextInput
                            style={[
                                styles.input,
                                erros.celular
                                    ? styles.inputErro
                                    : null,
                            ]}
                            placeholder="(00) 00000-0000"
                            placeholderTextColor="#999"
                            value={celular}
                            onChangeText={(texto) => {
                                setCelular(
                                    aplicarMascaraCelular(
                                        texto
                                    )
                                );

                                if (erros.celular) {
                                    setErros({
                                        ...erros,
                                        celular: '',
                                    });
                                }
                            }}
                            keyboardType="phone-pad"
                            maxLength={15}
                        />

                        {erros.celular ? (
                            <Text style={styles.textoErro}>
                                {erros.celular}
                            </Text>
                        ) : null}
                    </View>

                    {/* E-MAIL */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                            E-mail
                        </Text>

                        <TextInput
                            style={[
                                styles.input,
                                erros.email
                                    ? styles.inputErro
                                    : null,
                            ]}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={(texto) => {
                                setEmail(texto.toLowerCase());

                                if (erros.email) {
                                    setErros({
                                        ...erros,
                                        email: '',
                                    });
                                }
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {erros.email ? (
                            <Text style={styles.textoErro}>
                                {erros.email}
                            </Text>
                        ) : null}
                    </View>

                    {/* SENHA */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                            Senha
                        </Text>

                        <View
                            style={[
                                styles.senhaContainer,
                                erros.senha
                                    ? styles.inputErro
                                    : null,
                            ]}
                        >
                            <TextInput
                                style={styles.inputSenha}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                value={senha}
                                onChangeText={(texto) => {
                                    setSenha(texto);

                                    if (erros.senha) {
                                        setErros({
                                            ...erros,
                                            senha: '',
                                        });
                                    }
                                }}
                                secureTextEntry={!mostrarSenha}
                                autoCapitalize="none"
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    setMostrarSenha(
                                        !mostrarSenha
                                    )
                                }
                            >
                                <Text style={styles.mostrarSenha}>
                                    {mostrarSenha
                                        ? 'Ocultar'
                                        : 'Mostrar'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {erros.senha ? (
                            <Text style={styles.textoErro}>
                                {erros.senha}
                            </Text>
                        ) : null}

                        <Text style={styles.dicaSenha}>
                            A senha deve possuir no mínimo 8
                            caracteres, incluindo letras,
                            números e pelo menos um símbolo.
                        </Text>
                    </View>

                    {/* BOTÃO CADASTRAR */}
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={cadastrarUsuario}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.textoBotao}>
                            CADASTRAR
                        </Text>
                    </TouchableOpacity>

                    {/* VOLTAR PARA LOGIN */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.textoLogin}>
                            Já possui uma conta?
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Login')
                            }
                        >
                            <Text style={styles.linkLogin}>
                                Entrar
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// =========================
// ESTILOS
// =========================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F9F6',
    },

    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 25,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.10,
        shadowRadius: 8,

        elevation: 5,
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2E7D32',
        textAlign: 'center',
        marginBottom: 8,
    },

    subtitulo: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginBottom: 28,
    },

    inputContainer: {
        marginBottom: 18,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 7,
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D5D5D5',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FAFAFA',
    },

    inputErro: {
        borderColor: '#D32F2F',
    },

    textoErro: {
        color: '#D32F2F',
        fontSize: 12,
        marginTop: 5,
        lineHeight: 17,
    },

    senhaContainer: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D5D5D5',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 12,
        backgroundColor: '#FAFAFA',
    },

    inputSenha: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },

    mostrarSenha: {
        color: '#2E7D32',
        fontWeight: '600',
        fontSize: 13,
    },

    dicaSenha: {
        fontSize: 11,
        color: '#777',
        marginTop: 7,
        lineHeight: 16,
    },

    botao: {
        height: 52,
        backgroundColor: '#2E7D32',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },

    textoBotao: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    textoLogin: {
        color: '#666',
        fontSize: 14,
        marginRight: 5,
    },

    linkLogin: {
        color: '#2E7D32',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

