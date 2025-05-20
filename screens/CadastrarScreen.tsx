import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Tela de cadastro de usuário
export default function RegisterScreen() {
  // Hook de navegação
  const navigation = useNavigation();

  // Estados para armazenar os dados do formulário
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função chamada ao pressionar o botão de cadastro
  const handleRegister = () => {
    // Validação dos campos obrigatórios
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    // Verificação se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    // Mensagem de sucesso e retorno à tela anterior
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    navigation.goBack();
  };

  return (
    // Container principal da tela
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Cadastro</Text>

      {/* Campo para nome de usuário */}
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        placeholderTextColor="#00FF00"
        onChangeText={setUsername}
      />

      {/* Campo para email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#00FF00"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      {/* Campo para senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#00FF00"
        secureTextEntry
        onChangeText={setPassword}
      />

      {/* Campo para confirmação de senha */}
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#00FF00"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da tela de cadastro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 25,
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#00FF00',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});