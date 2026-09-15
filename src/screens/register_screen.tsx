import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, database } from "../services/firebaseConfig";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // 1. Validação de dados em branco
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha todos os campos antes de continuar.",
      );
      return; // O return impede que o código continue executando
    }

    // 2. Validação se as senhas conferem
    if (password !== confirmPassword) {
      Alert.alert("Atenção", "As senhas digitadas não coincidem.");
      return;
    }

    // 3. Validação extra: Firebase exige senhas de no mínimo 6 caracteres
    if (password.length < 6) {
      Alert.alert(
        "Senha muito curta",
        "Sua senha deve ter pelo menos 6 caracteres.",
      );
      return;
    }

    try {
      // Cria o usuário na aba Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Salva os dados extras (nome, email) no Realtime Database
      await set(ref(database, "usuarios/" + user.uid), {
        nome: name,
        email: email,
        dataCadastro: new Date().toISOString(),
      });

      // Alerta de sucesso com botão de redirecionamento para o Login
      Alert.alert(
        "Bem-vindo à Fiel!",
        "Seu cadastro foi realizado com sucesso.",
        [
          {
            text: "OK",
            onPress: () => navigation.replace("Login"), // Volta para o login após o usuário clicar em OK
          },
        ],
      );
    } catch (error: any) {
      // Tratamento visual dos erros que o Firebase retorna
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Este e-mail já possui um cadastro ativo.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Erro", "Por favor, digite um formato de e-mail válido.");
      } else {
        Alert.alert("Erro no cadastro", error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/logotipo.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                  style={styles.input}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />

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
                  placeholder="Crie uma senha (mínimo 6 caracteres)"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />

                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Repita sua senha"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
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

// ... Os estilos (StyleSheet) continuam exatamente iguais ao passo anterior!
const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.75)" },
  container: { flex: 1 },
  keyboardContainer: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  header: { alignItems: "center", marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#e0e0e0",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 5,
  },
  formContainer: { width: "100%" },
  label: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    color: "#ffffff",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  registerButtonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 40 },
  footerText: { color: "#d0d0d0", fontSize: 15 },
  loginText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
