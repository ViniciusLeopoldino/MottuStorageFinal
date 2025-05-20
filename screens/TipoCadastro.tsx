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
        <Text style={styles.title}>Tipo de Cadastro</Text>

        {/* Botão para navegar para a tela de Cadastro de Veículo */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroVeiculo')}
        >
          <Text style={styles.buttonText}>Cadastro Veículo</Text>
        </TouchableOpacity>

        {/* Botão para navegar para a tela de Cadastro de Localização */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroLocalizacao')}
        >
          <Text style={styles.buttonText}>Cadastro Localização</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar para a tela Home */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>VOLTAR</Text>
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
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    paddingVertical: 10,
  },
});
