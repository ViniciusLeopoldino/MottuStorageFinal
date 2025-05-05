import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type TipoCadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TipoCadastro'
>;

export default function TipoCadastroScreen({
  navigation,
}: {
  navigation: TipoCadastroScreenNavigationProp;
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Tipo de Cadastro</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroVeiculo')}
        >
          <Text style={styles.buttonText}>Cadastro Veículo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroLocalizacao')}
        >
          <Text style={styles.buttonText}>Cadastro Localização</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

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
