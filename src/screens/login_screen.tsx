import React, { useState } from "react";
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
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. Novo estado para controlar a mensagem de erro na tela
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    // Limpa qualquer mensagem de erro anterior ao tentar logar novamente
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor, preencha seu e-mail e senha.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigation.replace("Home");
    } catch (error: any) {
      // 2. Substituímos os Alerts por setErrorMessage
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Por favor, digite um formato de e-mail válido.");
      } else {
        setErrorMessage("Ocorreu um erro ao tentar fazer o login.");
        console.log(error.message);
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
                <Text style={styles.forgotPasswordText}>
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>

              {/* 3. Renderização condicional do erro: só aparece se houver texto */}
              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>ENTRAR</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Não faz parte da Fiel? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.75)" },
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", paddingHorizontal: 30 },
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
  forgotPassword: { alignSelf: "flex-end", marginBottom: 20 }, // Margem reduzida para dar espaço ao erro
  forgotPasswordText: { color: "#d0d0d0", fontSize: 14 },
  // 4. Estilo novo para a mensagem de erro
  errorText: {
    color: "#ff4444", // Vermelho bem visível no fundo escuro
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  loginButtonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 40 },
  footerText: { color: "#d0d0d0", fontSize: 15 },
  registerText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
