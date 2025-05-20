import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Tela de Login principal
export default function LoginScreen({ navigation }: any) {
  // Estados para armazenar login e senha digitados pelo usuário
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  // Função chamada ao pressionar o botão de login
  const handleLogin = () => {
    if (login && senha) {
      // Se ambos os campos estiverem preenchidos, navega para a tela Home
      navigation.replace('Home');
    } else {
      // Caso contrário, exibe alerta solicitando preenchimento dos campos
      alert('Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo da aplicação */}
      <Image source={require('../assets/icon.png')} style={styles.logo} />

      {/* Campo de entrada para o login */}
      <TextInput
        style={styles.input}
        placeholder="Login"
        placeholderTextColor="#00FF00"
        value={login}
        onChangeText={setLogin}
      />

      {/* Campo de entrada para a senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#00FF00"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão de login */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      {/* Link para recuperar senha */}
      <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={styles.link}>Recuperar Senha</Text>
      </TouchableOpacity>

      {/* Link para cadastrar novo usuário */}
      <TouchableOpacity onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={styles.link}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Rodapé com informação do desenvolvedor */}
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

// Estilos da tela de login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',        // fundo preto
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderColor: '#00FF00',         // borda verde vibrante
    borderWidth: 2,
    borderRadius: 50,               // formato pill
    paddingVertical: 14,
    paddingHorizontal: 20,
    color: '#FFF',
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#00FF00',     // botão verde
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#00FF00',
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#444',
    fontSize: 12,
  },
});
