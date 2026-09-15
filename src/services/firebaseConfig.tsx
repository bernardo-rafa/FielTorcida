//inicializa conexão com o firebase
import { initializeApp } from "firebase/app";
//incializa conexão com o banco de dados
import { getDatabase } from "firebase/database";
//iniciliaza com a autenticação do firebase
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeSEVXG4iirwvPmuAxJvKViR9dg21USlo",
  authDomain: "fieltorcida-b5195.firebaseapp.com",
  databaseURL: "https://fieltorcida-b5195-default-rtdb.firebaseio.com",
  projectId: "fieltorcida-b5195",
  storageBucket: "fieltorcida-b5195.firebasestorage.app",
  messagingSenderId: "420621096277",
  appId: "1:420621096277:web:f67e047bc1b0dcf2518bdc",
  measurementId: "G-SB9GKZC5WM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;
