import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Define o tipo de navegação para esta tela
type TipoCadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TipoCadastro'
>;

// Componente principal da tela de Tipo de Cadastro
export default function TipoCadastroScreen({
  navigation,
}: {
  navigation: TipoCadastroScreenNavigationProp;
}) {
  return (
    <View style={styles.wrapper}>
      {/* Container central com título e botões de cadastro */}
      <View style={styles.container}>
        <Text style={styles.title}>TIPO DE CADASTRO</Text>

        {/* Botão para navegar para a tela de Cadastro de Veículo */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroVeiculo')}
        >
          <Text style={styles.buttonText}>CADASTRO DE VEÍCULO</Text>
        </TouchableOpacity>

        {/* Botão para navegar para a tela de Cadastro de Localização */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroLocalizacao')}
        >
          <Text style={styles.buttonText}>CADASTRO DE LOCALIZAÇÃO</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar para a tela Home */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>VOLTAR</Text>
      </TouchableOpacity>

      {/* Rodapé com informação do desenvolvedor */}
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
wrapper: {
  flex: 1,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingBottom: 30, // espaço pro rodapé
},

container: {
  width: '100%',
  alignItems: 'center',
},

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
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
  footer: {
  position: 'absolute',
  bottom: 10,
  textAlign: 'center',
  color: '#555',
  fontSize: 12,
  width: '100%',
  },
});
