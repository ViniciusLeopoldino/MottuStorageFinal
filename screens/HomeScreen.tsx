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

      {/* Botão para navegar para o Histórico */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Historico')}
      >
        <Text style={styles.buttonText}>HISTÓRICO</Text>
      </TouchableOpacity>

      {/* Botão para sair (voltar para tela de Login) */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backButtonText}>SAIR</Text>
      </TouchableOpacity>

      </View>

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
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingBottom: 30, // espaço pro rodapé
},

  // Container central dos botões principais
container: {
  width: '100%',
  alignItems: 'center',
},

  // Estilo do título
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Estilo dos botões
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  // Estilo do texto dos botões
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  backButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
    width: '100%',
  },

  backButtonText: { 
    color: '#00FF00',
    fontWeight: 'bold', 
    fontSize: 16, 
  },

  // Estilo do rodapé
footer: {
  position: 'absolute',
  bottom: 10,
  textAlign: 'center',
  color: '#555',
  fontSize: 12,
  width: '100%',
},

});
