import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Tela principal do aplicativo
export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.wrapper}>
      {/* Container central com os botões principais */}
      <View style={styles.container}>
        {/* Título da tela */}
        <Text style={styles.title}>HOME</Text>

        {/* Botão para navegar para a tela de Cadastro */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TipoCadastro')}
        >
          <Text style={styles.buttonText}>CADASTRO</Text>
        </TouchableOpacity>

        {/* Botão para navegar para a tela de Recebimento */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Recebimento')}
        >
          <Text style={styles.buttonText}>RECEBIMENTO</Text>
        </TouchableOpacity>

        {/* Botão para navegar para a tela de Consulta */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Consulta')}
        >
          <Text style={styles.buttonText}>CONSULTA</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para navegar para o Histórico */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Historico')}
      >
        <Text style={styles.buttonText}>HISTÓRICO</Text>
      </TouchableOpacity>

      {/* Botão para sair (voltar para tela de Login) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>SAIR</Text>
      </TouchableOpacity>

      {/* Rodapé com informação do desenvolvedor */}
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

// Estilos da tela HomeScreen
const styles = StyleSheet.create({
  // Wrapper geral da tela
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    padding: 20,
  },
  // Container central dos botões principais
  container: {
    flex: 1,
    backgroundColor: '#000', // fundo preto
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  // Estilo do título
  title: {
    color: '#00FF00', // texto verde
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  // Estilo dos botões
  button: {
    width: '100%',
    backgroundColor: '#00FF00', // botão verde
    borderRadius: 50, // pill
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 10,
  },
  // Estilo do texto dos botões
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo do rodapé
  footer: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    paddingVertical: 10,
  },
});
