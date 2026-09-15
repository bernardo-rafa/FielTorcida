import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, database } from "../services/firebaseConfig";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// 1. Tipagem das rotas
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

// 2. Tipagem da propriedade navigation para a RegisterScreen
type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        try {
          // 1. Cria o usuário no Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userCredential.user;

          // 2. Salva os dados do usuário no Realtime Database
          // Criamos uma "pasta" chamada 'usuarios' e usamos o ID único do usuário (uid)
          await set(ref(database, "usuarios/" + user.uid), {
            nome: name,
            email: email,
            dataCadastro: new Date().toISOString(),
          });

          console.log("Cadastro realizado com sucesso no Firebase!");
          // Após o sucesso, navega para a Home
          navigation.replace("Home");
        } catch (error: any) {
          // O Firebase retorna códigos de erro úteis
          if (error.code === "auth/email-already-in-use") {
            console.log("Este e-mail já está cadastrado!");
          } else if (error.code === "auth/weak-password") {
            console.log("A senha deve ter pelo menos 6 caracteres!");
          } else {
            console.log("Erro ao cadastrar: ", error.message);
          }
        }
      } else {
        console.log("As senhas não coincidem!");
      }
    } else {
      console.log("Preencha todos os campos!");
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
            {/* Usamos ScrollView para permitir rolagem caso a tela do celular seja pequena */}
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
                  placeholder="Crie uma senha"
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
                {/* Botão para voltar para a tela de login */}
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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
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
  formContainer: {
    width: "100%",
  },
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    color: "#d0d0d0",
    fontSize: 15,
  },
  loginText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
