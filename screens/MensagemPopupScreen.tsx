import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

// Define o tipo das props de rota esperadas para esta tela
type MensagemScreenRouteProp = RouteProp<
  { params: { tipo: string; texto: string } },
  'params'
>;

// Componente principal da tela de mensagem popup
export default function MensagemScreen({
  route,
}: {
  route: MensagemScreenRouteProp;
}) {
  // Extrai os parâmetros recebidos pela rota
  const { tipo, texto } = route.params || {};

  // Define a cor de fundo baseada no tipo de mensagem
  const corMensagem = tipo === 'erro' ? '#ff4d4d' : '#4BB543';

  return (
    // Container principal com cor de fundo dinâmica
    <View style={[styles.container, { backgroundColor: corMensagem }]}>
      {/* Exibe o texto da mensagem ou um padrão */}
      <Text style={styles.texto}>{texto || 'Mensagem'}</Text>
    </View>
  );
}

// Estilos utilizados na tela de mensagem popup
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
