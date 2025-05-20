import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Componente principal para cadastro de localização
export default function CadastroLocalizacao() {
  const navigation = useNavigation();

  // Estado para armazenar os campos da localização
  const [localizacao, setLocalizacao] = useState({
    armazem: '',
    rua: '',
    modulo: '',
    compartimento: '',
  });

  // Função para limpar todos os campos do formulário
  const limparCampos = () => {
    setLocalizacao({
      armazem: '',
      rua: '',
      modulo: '',
      compartimento: '',
    });
  };

  // Função para reutilizar a última localização salva no AsyncStorage
  const reutilizarLocalizacao = async () => {
    try {
      const salvo = await AsyncStorage.getItem('ultimaLocalizacao');
      if (salvo) {
        setLocalizacao(JSON.parse(salvo));
        Alert.alert('Sucesso', 'Última localização carregada!');
      } else {
        Alert.alert('Aviso', 'Nenhuma localização anterior encontrada.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a localização.');
      console.error(error);
    }
  };

  // Função para salvar a localização atual no AsyncStorage
  const salvarLocalizacao = async () => {
    const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;
    try {
      await AsyncStorage.setItem('ultimaLocalizacao', JSON.stringify(localizacao));
      Alert.alert('Sucesso', `Localização salva: ${nome_localizacao}`);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      Alert.alert('Erro', 'Não foi possível salvar a localização.');
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Conteúdo principal com formulário de cadastro */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Cadastro de Localização</Text>

        {/* Inputs dinâmicos para cada campo da localização */}
        {(Object.keys(localizacao) as Array<keyof typeof localizacao>).map((key) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key.toUpperCase()}
            placeholderTextColor="#aaa"
            value={localizacao[key]}
            onChangeText={(text) =>
              setLocalizacao((prev) => ({ ...prev, [key]: text }))
            }
          />
        ))}

        {/* Links para reutilizar última localização e limpar campos */}
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={reutilizarLocalizacao}>
            <Text style={styles.linkText}>Reutilizar última localização</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={limparCampos}>
            <Text style={styles.linkText}>Limpar Campos</Text>
          </TouchableOpacity>
        </View>

        {/* Botão para salvar localização */}
        <TouchableOpacity style={styles.button} onPress={salvarLocalizacao}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>

        {/* Botão para voltar para a tela anterior */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Rodapé com crédito do desenvolvedor */}
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  // Container dos links de ação
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  // Estilo dos textos dos links
  linkText: {
    color: '#00FF00',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
  },
  // Wrapper principal da tela
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  // Container do conteúdo com padding
  container: {
    padding: 20,
  },
  // Título da tela
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 30,
  },
  // Estilo dos inputs de texto
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  // Botão principal de salvar
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  // Texto do botão principal
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Botão de limpar campos (não utilizado diretamente)
  clearButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  // Texto do botão de limpar campos (não utilizado diretamente)
  clearButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Botão de voltar
  backButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  // Texto do botão de voltar
  backButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Rodapé da tela
  footer: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    paddingVertical: 10,
  },
  // Botão de reutilizar localização (não utilizado diretamente)
  reuseButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  // Texto do botão de reutilizar localização (não utilizado diretamente)
  reuseText: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
});
