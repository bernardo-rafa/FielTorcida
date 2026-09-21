import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Alert,
  Platform, // <-- Importado para detectar se estamos na Web ou no Celular
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth, database } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";
import { ref, get } from "firebase/database";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [userName, setUserName] = useState("Fiel");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userRef = ref(database, `usuarios/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            const firstName = data.nome ? data.nome.split(" ")[0] : "Fiel";
            setUserName(firstName);
          }
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    // Correção: Tratamento específico para Web vs Mobile
    if (Platform.OS === "web") {
      const confirmLogout = window.confirm(
        "Tem certeza que deseja sair do aplicativo da Fiel?",
      );
      if (confirmLogout) {
        try {
          await signOut(auth);
          navigation.replace("Login");
        } catch (error) {
          console.error(error);
          window.alert("Não foi possível sair da conta. Tente novamente.");
        }
      }
    } else {
      Alert.alert(
        "Sair da Conta",
        "Tem certeza que deseja sair do aplicativo da Fiel?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sair",
            style: "destructive",
            onPress: async () => {
              try {
                await signOut(auth);
                navigation.replace("Login");
              } catch {
                Alert.alert(
                  "Erro",
                  "Não foi possível sair da conta. Tente novamente.",
                );
              }
            },
          },
        ],
      );
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
          <View style={styles.header}>
            <Text style={styles.title}>FIEL TORCIDA</Text>
            <Text style={styles.subtitle}>Painel do Torcedor</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Bem-vindo, {userName}!</Text>
              <Text style={styles.welcomeText}>
                Acompanhe as novidades, acesse sua carteirinha e fique por
                dentro das próximas caravanas.
              </Text>
            </View>

            <View style={styles.gridContainer}>
              <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
                <Text style={styles.gridIcon}>🎫</Text>
                <Text style={styles.gridText}>Minha{"\n"}Carteirinha</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
                <Text style={styles.gridIcon}>🚌</Text>
                <Text style={styles.gridText}>Próximas{"\n"}Caravanas</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
                <Text style={styles.gridIcon}>📰</Text>
                <Text style={styles.gridText}>Notícias do{"\n"}Coringão</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem} activeOpacity={0.8}>
                <Text style={styles.gridIcon}>⚙️</Text>
                <Text style={styles.gridText}>Meus{"\n"}Dados</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>SAIR DA CONTA</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.85)" },
  container: { flex: 1 },
  header: { alignItems: "center", marginTop: 40, marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 5,
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  welcomeCard: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#444",
  },
  welcomeTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcomeText: { color: "#d0d0d0", fontSize: 15, lineHeight: 22 },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "47%",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  gridIcon: { fontSize: 32, marginBottom: 10 },
  gridText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
  },
  footer: { padding: 20, paddingBottom: 30 },
  logoutButton: {
    backgroundColor: "transparent",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ff4444",
  },
  logoutButtonText: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
